import { MinesweeperDifficulty } from "./minesweeper-difficulty.ts";
import { MinesweeperTile, TileIndex } from "./minesweeper-tile.ts";

class StateUpdate {
    difficulty: MinesweeperDifficulty | null;
    isEnded: boolean | null;
    isStarted: boolean | null;
    isWon: boolean | null;
    remainingFlags: number | null;
    revealedTiles: number | null;
    tiles: MinesweeperTile[];

    constructor() {
        this.difficulty = null;
        this.isEnded = null;
        this.isStarted = null;
        this.isWon = null;
        this.remainingFlags = null;
        this.revealedTiles = null;
        this.tiles = [];
    }

    createDeepCopy() {
        const newUpdate = new StateUpdate();

        newUpdate.difficulty = this.difficulty;
        newUpdate.isEnded = this.isEnded;
        newUpdate.isStarted = this.isStarted;
        newUpdate.isWon = this.isWon;
        newUpdate.remainingFlags = this.remainingFlags;

        for (const tile of this.tiles) {
            newUpdate.tiles.push(tile.createDeepCopy());
        }

        return newUpdate;
    }
}

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
        this.remainingFlags = remainingFlags
            ? remainingFlags
            : difficulty.startingMines;
        this.revealedTiles = revealedTiles ? revealedTiles : 0;
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

        if (!this.isStarted) update.isStarted = true;

        if (!tile.isRevealed) {
            // If the tile has not been revealed yet
            // Deep copy the tile and add it to the update
            const newTile = tile.createDeepCopy();
            update.tiles.push(newTile);
            // Reaveal the tile
            newTile.isRevealed = true;

            if (tile.hasMine) {
                // If the tile has a mine
                // Explode the mine
                newTile.mineExploded = true;
                // End the game
                update.isEnded = true;
            } else if (tile.adjacentMines === 0) {
                // If the tile has no adjacent mines
                // Reveal all adjacent tiles
                // const adjacentTiles = this.getAdjacentTilesFor(index);
                // for (const adjacentTile of adjacentTiles) {
                //     this.revealTile(adjacentTile.index);
                // }
            }
        } else if (tile.adjacentMines > 0 && this.isSatisfied(index)) {
            // If the tile is already revealed
            // and the tile has the same number of adjacent flags as adjacent mines
            // Activate all adjacent non-flagged tiles
            // const adjacentTiles = this.getAdjacentTilesFor(index);
            // for (const adjacentTile of adjacentTiles) {
            //     this.activateTile(adjacentTile.index);
            // }
        }

        return this.updateState(update);
    }

    /*
    Function takes the index of a tile on the board
    if the tile is already flagged it gets un-flagged
    if the tile is revealed, it does not get flagged
    */
    public flagTile(index: TileIndex): MinesweeperState {
        // If the game is over or the tile is flagged do nothing
        if (this.isEnded) return this;
        if (this.tiles[index.x][index.y].isRevealed) return this;

        // If the tile can be flagged
        // Get the tile that is being flagged
        const tile = this.tiles[index.x][index.y];
        // Initialize state update object
        const update: StateUpdate = new StateUpdate();

        // Create a deep copy of the tile and add it to the update
        const newTile = tile.createDeepCopy();
        update.tiles.push(newTile);
        // Invert the isFlagged property for the tile
        newTile.isFlagged = !tile.isFlagged;

        // Update number of remaining flags
        let remainingFlags = this.remainingFlags;
        if (newTile.isFlagged) {
            remainingFlags--;
        } else {
            remainingFlags++;
        }
        update.remainingFlags = remainingFlags;

        return this.updateState(update);
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
    private getAdjacentTilesFor(index: TileIndex): MinesweeperTile[] {
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
    Function takes the index of a tile on the board
    if the tile has not been revealed the tile is revealed
    if the tile has been flagged it is still revealed
    if the tile has no adjacent mines it also reveals all adjacent tiles
    */
    // private revealTile(index: TileIndex): void {
    //     if (this.isEnded) return;

    //     // Get the tile that is being revealed
    //     const tile = this.tiles[index.x][index.y];

    //     if (!tile.isRevealed) {
    //         // If the tile has not been revealed yet
    //         // Reaveal it
    //         tile.isRevealed = true;

    //         if (tile.adjacentMines === 0) {
    //             // If the tile has no adjacent mines
    //             // Reveal all adjacent tiles
    //             const adjacentTiles = this.getAdjacentTilesFor(index);
    //             for (const adjacentTile of adjacentTiles) {
    //                 this.revealTile(adjacentTile.index);
    //             }
    //         }
    //     }
    // }

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
    Function takes a list of changes to the state, and returns a new state object with those changes
    without making any changes to the original state object
    */
    private updateState(update: StateUpdate): MinesweeperState {
        // Create shallow copy of current state
        const newState = this.createShallowCopy();

        // Update any of the primitives if a new primitive was passed
        if (update.difficulty != null) newState.difficulty = update.difficulty;
        if (update.isEnded != null) newState.isEnded = update.isEnded;
        if (update.isStarted != null) newState.isStarted = update.isStarted;
        if (update.isWon != null) newState.isWon = update.isWon;
        if (update.remainingFlags != null)
            newState.remainingFlags = update.remainingFlags;
        if (update.revealedTiles != null)
            newState.revealedTiles = update.revealedTiles;

        if (update.tiles.length > 0) {
            // If some new tiles were passed
            // Sort the updated tiles into columns
            const updatedTiles: MinesweeperTile[][] = [];
            for (let x = 0; x < newState.tiles.length; x++) {
                // For each column of the state's tiles
                const column: MinesweeperTile[] = [];

                for (const updatedTile of update.tiles) {
                    // For each of the updated tiles
                    if (updatedTile.index.x == x) {
                        // If this updated tile is part of the current column
                        // Add the tile to the current column
                        column.push(updatedTile);
                        // Remove the tile from the array of the update tiles
                        update.tiles.splice(
                            update.tiles.indexOf(updatedTile),
                            1
                        );
                    }
                }

                updatedTiles.push(column);
            }

            // Update the tiles
            for (let x = 0; x < newState.tiles.length; x++) {
                // For each column of tiles in the state
                if (updatedTiles[x].length > 0) {
                    // If the column has any tiles to update
                    // Replace the column with a shallow copy
                    newState.tiles[x] = [...newState.tiles[x]];

                    for (const updatedTile of updatedTiles[x]) {
                        // For each updated tile in the column
                        // Replace the old tile with the new one in the new state object
                        newState.tiles[x].splice(
                            updatedTile.index.y,
                            1,
                            updatedTile
                        );
                    }
                }
            }
        }

        return newState;
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
                tileColumn.push(this.tiles[x][y].createDeepCopy());
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
