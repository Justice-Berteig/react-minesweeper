import { handleEmptyTile } from "./handleEmptyTile.ts";
import { MinesweeperDifficulty } from "./minesweeper-difficulty.ts";
import { MinesweeperTile } from "./minesweeper-tile.ts";
import { StateUpdate, updateState } from "./state-update.ts";
import { TileIndex } from "./tile-index.ts";

export class MinesweeperState {
    public difficulty: MinesweeperDifficulty;
    public isEnded: boolean;
    public isStarted: boolean;
    public isWon: boolean;
    public remainingFlags: number;
    public revealedTiles: number;
    public tiles: MinesweeperTile[][];

    public constructor(
        difficulty: MinesweeperDifficulty,
        isEnded?: boolean,
        isStarted?: boolean,
        isWon?: boolean,
        remainingFlags?: number,
        revealedTiles?: number,
        tiles?: MinesweeperTile[][]
    ) {
        this.difficulty = difficulty;
        this.isEnded = isEnded ? isEnded : false;
        this.isStarted = isStarted ? isStarted : false;
        this.isWon = isWon ? isWon : false;
        if (remainingFlags != undefined) {
            this.remainingFlags = remainingFlags;
        } else {
            this.remainingFlags = difficulty.startingMines;
        }
        if (revealedTiles != undefined) {
            this.revealedTiles = revealedTiles;
        } else {
            this.revealedTiles = 0;
        }
        this.tiles = tiles ? tiles : [];

        if (!tiles) {
            // If no tiles were given
            // Initialize the tiles
            this.initializeTiles(
                difficulty.width,
                difficulty.height,
                difficulty.startingMines
            );
        }
    }

    /*
    Function takes the index of a tile on the board
    if the tile has not been revealed the tile is revealed
    if the tile is revealed and the tile is satisfied it also activates all adjacent non-flagged tiles
    if the tile has no adjacent mines it also activates all adjacent tiles
    if the activated tile has a mine the game is ended
    */
    public activateTile(index: TileIndex): MinesweeperState {
        // If the game is over or the tile is flagged do nothing
        if (this.isEnded) return this;
        if (this.tiles[index.x][index.y].isFlagged) return this;

        // If the tile can be activated
        // Get the tile that is being activated
        const tile = this.tiles[index.x][index.y];
        // Initialize state update object
        const update: StateUpdate = new StateUpdate();

        // Release the tile
        update.updateTile({
            index: index,
            isPressed: false,
        });

        if (this.tiles[index.x][index.y].isRevealed) {
            // If the tile is already revealed
            // Cover all adjacent non-flagged tiles aswell
            const adjacentTiles = this.getAdjacentTilesFor(index);
            for (const adjacentTile of adjacentTiles) {
                // If the adjacent tile is flagged do not cover it
                if (adjacentTile.isFlagged) continue;

                update.updateTile({
                    index: adjacentTile.index,
                    isCovered: true,
                });
            }
        }

        if (!tile.isRevealed) {
            // If the tile has not been revealed yet
            // Reaveal the tile
            update.updateTile({
                index: tile.index,
                isRevealed: true,
            });

            if (tile.hasMine) {
                // If the tile has a mine
                // Show that the user made an error
                update.updateTile({
                    index: tile.index,
                    userError: true,
                });
            } else if (tile.adjacentMines === 0) {
                // If the tile is empty
                // Handle the empty tile
                handleEmptyTile(tile, this, update, [tile.index]);
            }
        } else if (tile.adjacentMines > 0 && this.isSatisfied(index)) {
            // If the tile is already revealed
            // and the tile has the same number of adjacent flags as adjacent mines
            // Activate all adjacent non-flagged tiles
            const adjacentTiles: MinesweeperTile[] =
                this.getAdjacentTilesFor(index);
            for (const adjacentTile of adjacentTiles) {
                if (adjacentTile.isFlagged && !adjacentTile.hasMine) {
                    // If the tile was incorrectly flagged
                    // Display that the user made an error
                    update.updateTile({
                        index: adjacentTile.index,
                        userError: true,
                    });
                } else if (
                    !adjacentTile.isFlagged &&
                    !adjacentTile.isRevealed
                ) {
                    // If the tile is not flagged and not revealed
                    // Reveal the tile
                    update.updateTile({
                        index: adjacentTile.index,
                        isRevealed: true,
                    });

                    if (adjacentTile.hasMine) {
                        // If the adjacent tile has a mine
                        // Display that the user made an error
                        update.updateTile({
                            index: adjacentTile.index,
                            userError: true,
                        });
                    } else if (adjacentTile.adjacentMines === 0) {
                        // If the adjacent tile is an empty tile
                        // Handle the empty tile
                        handleEmptyTile(adjacentTile, this, update, [
                            adjacentTile.index,
                        ]);
                    }
                }
            }
        }

        return updateState(this, update);
    }

    /*
    Function takes the index of a tile on the board
    if the tile is already flagged it gets un-flagged
    if the tile is revealed, it does not get flagged
    */
    public flagTile(index: TileIndex): MinesweeperState {
        // If the game is over or the tile is already revealed do nothing
        if (this.isEnded) return this;
        if (this.tiles[index.x][index.y].isRevealed) return this;

        // If the tile can be flagged
        // Get the tile that is being flagged
        const tile = this.tiles[index.x][index.y];
        // Initialize state update object
        const update: StateUpdate = new StateUpdate();

        // Invert the tile's flagged attribute
        update.updateTile({
            index: tile.index,
            isFlagged: !tile.isFlagged,
        });

        return updateState(this, update);
    }

    /*
    Function takes the index of a tile on the board
    if the tile is flagged do nothing
    if the tile is not flagged, hide the cover for the tile
    if the tile is already revealed, hide the cover for all
    non-flagged adjacent tiles
    */
    public pressTile(index: TileIndex): MinesweeperState {
        // If the game is over or the tile is flagged do nothing
        if (this.isEnded) return this;
        if (this.tiles[index.x][index.y].isFlagged) return this;

        // If the tile can be pressed
        // Initialize state update object
        const update: StateUpdate = new StateUpdate();

        // Press the tile
        update.updateTile({
            index: index,
            isPressed: true,
        });

        if (this.tiles[index.x][index.y].isRevealed) {
            // If the tile is already revealed
            // Remove cover from all adjacent non-flagged tiles aswell
            const adjacentTiles = this.getAdjacentTilesFor(index);
            for (const adjacentTile of adjacentTiles) {
                // If the adjacent tile is flagged do not uncover it
                if (adjacentTile.isFlagged) continue;

                update.updateTile({
                    index: adjacentTile.index,
                    isCovered: false,
                });
            }
        }

        return updateState(this, update);
    }

    /*
    Function takes the index of a tile on the board
    if the tile is not pressed do nothing
    if the tile is pressed, release it
    if the tile is already revealed, also release all adjacent tiles
    */
    public releaseTile(index: TileIndex): MinesweeperState {
        // If the game is over or the tile is flagged or the tile is not pressed do nothing
        if (this.isEnded) return this;
        if (this.tiles[index.x][index.y].isFlagged) return this;
        if (!this.tiles[index.x][index.y].isPressed) return this;

        // If the tile can be released
        // Initialize state update object
        const update: StateUpdate = new StateUpdate();

        // Release the tile
        update.updateTile({
            index: index,
            isPressed: false,
        });

        if (this.tiles[index.x][index.y].isRevealed) {
            // If the tile is already revealed
            // Cover all adjacent non-flagged tiles aswell
            const adjacentTiles = this.getAdjacentTilesFor(index);
            for (const adjacentTile of adjacentTiles) {
                // If the adjacent tile is flagged do not cover it
                if (adjacentTile.isFlagged) continue;

                update.updateTile({
                    index: adjacentTile.index,
                    isCovered: true,
                });
            }
        }

        return updateState(this, update);
    }

    /*
    Function takes a width, height, and number of starting mines and creates
    a two dimensional array of MinesweeperTiles with the given width and height,
    then distributes the given number of starting mines randomly among the MinesweeperTiles
    */
    private initializeTiles(
        width: number,
        height: number,
        startingMines: number
    ): void {
        // Fill tile array with empty tiles
        for (let x = 0; x < width; x++) {
            const tileColumn: MinesweeperTile[] = [];
            for (let y = 0; y < height; y++) {
                tileColumn.push(new MinesweeperTile(x, y));
            }
            this.tiles.push(tileColumn);
        }

        // Randomly distribute mines
        this.addMinesToTiles(startingMines);
        // Get adjacent mine count for each tile
        this.setAdjacentMines();
    }

    /*
    Function takes some number of mines and distributes those mines
    randomly across the board
    */
    private addMinesToTiles(mines: number): void {
        // Create array of indeces for all the empty tiles
        // (all tiles are empty at first)
        const emptyTileIndeces: TileIndex[] = [];
        // For each tile in the array
        for (let x = 0; x < this.tiles.length; x++) {
            const tileColumn: MinesweeperTile[] = this.tiles[x];
            for (let y = 0; y < tileColumn.length; y++) {
                const tile = tileColumn[y];
                // Add the tile index to the list of empty tiles
                emptyTileIndeces.push(tile.index);
            }
        }

        // While there are still mines left to place
        while (mines > 0) {
            // Get a random tile index and remove it from the list of empty tiles
            const index: TileIndex = emptyTileIndeces.splice(
                Math.floor(Math.random() * emptyTileIndeces.length),
                1
            )[0];
            // Add a mine to that tile
            this.tiles[index.x][index.y].hasMine = true;
            // Remove a mine
            mines--;
        }
    }

    /*
    Function loops through each tile on the board, and sets the number of adjacent
    mines for that tile
    */
    private setAdjacentMines(): void {
        // For each tile in the array
        for (let x = 0; x < this.tiles.length; x++) {
            const tileColumn: MinesweeperTile[] = this.tiles[x];
            for (let y = 0; y < tileColumn.length; y++) {
                const tile = tileColumn[y];
                // Set the number of adjacent mines;
                tile.adjacentMines = this.getAdjacentMinesFor(tile.index);
            }
        }
    }

    /*
    Function takes the index of a tile on the board
    and returns all adjacent tiles
    */
    public getAdjacentTilesFor(index: TileIndex): MinesweeperTile[] {
        const adjacentTiles: MinesweeperTile[] = [];

        // For each tile in a 3x3 grid centered on the target tile
        for (let x = index.x - 1; x <= index.x + 1; x++) {
            for (let y = index.y - 1; y <= index.y + 1; y++) {
                if (x === index.x && y === index.y) {
                    // If this is the center tile
                    // Skip it
                    continue;
                }
                if (
                    x >= 0 &&
                    x < this.tiles.length &&
                    y >= 0 &&
                    y < this.tiles[x].length
                ) {
                    // If the x and y are within bounds of the array
                    // Add the tile to the array
                    adjacentTiles.push(this.tiles[x][y]);
                }
            }
        }

        return adjacentTiles;
    }

    /*
    Function takes the index of a tile on the board
    and returns the number of mines adjacent to that tile
    */
    private getAdjacentMinesFor(index: TileIndex): number {
        // Get list of adjacent tiles
        const adjacentTiles = this.getAdjacentTilesFor(index);

        let adjacentMines: number = 0;
        // For each adjacent tile
        for (const tile of adjacentTiles) {
            if (tile.hasMine) {
                // If the adjacent tile has a mine
                adjacentMines++;
            }
        }

        return adjacentMines;
    }

    /*
    Function takes the index of a tile on the board
    and returns the number of flagged tiles adjacent to that tile
    */
    private getAdjacentFlagsFor(index: TileIndex): number {
        // Get list of adjacent tiles
        const adjacentTiles = this.getAdjacentTilesFor(index);

        let adjacentFlags: number = 0;
        // For each adjacent tile
        for (const tile of adjacentTiles) {
            if (tile.isFlagged) {
                // If the adjacent tile has a mine
                adjacentFlags++;
            }
        }

        return adjacentFlags;
    }

    /*
    Function takes the index of a tile on the board and checks if it has an equal ammount
    of adjacent flagged tiles as adjacent mines
    */
    private isSatisfied(index: TileIndex): boolean {
        return (
            this.getAdjacentMinesFor(index) == this.getAdjacentFlagsFor(index)
        );
    }

    /*
    Function creates and returns a shallow copy of the state object
    */
    public createShallowCopy(): MinesweeperState {
        return new MinesweeperState(
            this.difficulty,
            this.isEnded,
            this.isStarted,
            this.isWon,
            this.remainingFlags,
            this.revealedTiles,
            [...this.tiles]
        );
    }

    /*
    Function creates and returns a deep copy of the state object
    */
    public createDeepCopy(): MinesweeperState {
        const deepCopiedTiles: MinesweeperTile[][] = [];

        for (let x = 0; x < this.tiles.length; x++) {
            // For each column of tiles
            // Create a new tile column
            const tileColumn: MinesweeperTile[] = [];
            for (let y = 0; y < this.tiles[0].length; y++) {
                // For each tile in the column
                // Deep copy the tile
                tileColumn.push(this.tiles[x][y].createCopy());
            }
            deepCopiedTiles.push(tileColumn);
        }

        return new MinesweeperState(
            this.difficulty,
            this.isEnded,
            this.isStarted,
            this.isWon,
            this.remainingFlags,
            this.revealedTiles,
            deepCopiedTiles
        );
    }
}
