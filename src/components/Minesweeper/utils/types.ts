export enum Action {
    RESET = 0,
    LCLICK = 1,
    RCLICK = 2,
}

export enum DifficultyLevel {
    CUSTOM = 0,
    BEGINNER = 1,
    INTERMEDIATE = 2,
    EXPERT = 3,
}

export class Difficulty {
    level: DifficultyLevel;
    width: number;
    height: number;
    startingMines: number;

    constructor(
        level: DifficultyLevel,
        width?: number,
        height?: number,
        startingMines?: number
    ) {
        this.level = level;
        switch (level) {
            case DifficultyLevel.BEGINNER:
                this.width = 9;
                this.height = 9;
                this.startingMines = 10;
                break;
            case DifficultyLevel.INTERMEDIATE:
                this.width = 16;
                this.height = 16;
                this.startingMines = 40;
                break;
            case DifficultyLevel.EXPERT:
                this.width = 30;
                this.height = 16;
                this.startingMines = 99;
                break;
            case DifficultyLevel.CUSTOM:
                if (width && height && startingMines) {
                    this.width = width;
                    this.height = height;
                    this.startingMines = startingMines;
                } else {
                    this.width = 9;
                    this.height = 9;
                    this.startingMines = 10;
                }
                break;
            default:
                this.width = 9;
                this.height = 9;
                this.startingMines = 10;
                break;
        }
    }
}

export type MinesweeperAction = {
    type: Action;
    newDifficulty?: Difficulty | null;
    index?: TileIndex | null;
};

// export type MinesweeperState = {
//     difficulty: Difficulty;
//     isEnded: boolean;
//     isStarted: boolean;
//     isWon: boolean;
//     remainingMines: number;
//     tiles: MinesweeperTile[][];
// };

export class MinesweeperState {
    difficulty: Difficulty;
    isEnded: boolean;
    isStarted: boolean;
    isWon: boolean;
    remainingMines: number;
    tiles: MinesweeperTile[][];

    constructor(
        difficulty: Difficulty,
        isEnded?: boolean,
        isStarted?: boolean,
        isWon?: boolean,
        remainingMines?: number,
        tiles?: MinesweeperTile[][]
    ) {
        this.difficulty = difficulty;
        this.isEnded = isEnded ? isEnded : false;
        this.isStarted = isStarted ? isStarted : false;
        this.isWon = isWon ? isWon : false;
        this.remainingMines = remainingMines
            ? remainingMines
            : difficulty.startingMines;
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
    Function takes a width, height, and number of starting mines and creates
    a two dimensional array of MinesweeperTiles with the given width and height,
    then distributes the given number of starting mines randomly among the MinesweeperTiles
    */
    initializeTiles(
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

        // Add mines
        this.addMinesToTiles(startingMines);
        // Get adjacent mine count for each tile
        this.setAdjacentMines();
    }

    /*
    Function takes some number of mines and distributes those mines
    randomly across the board
    */
    addMinesToTiles(mines: number): void {
        // Create array holding all the indeces for empty tiles
        // (all tiles are empty at first so array will hold indeces for all tiles)
        const emptyTileIndeces: TileIndex[] = [];
        // For each tile in the array
        for (let x = 0; x < this.tiles.length; x++) {
            const tileColumn: MinesweeperTile[] = this.tiles[x];
            for (let y = 0; y < tileColumn.length; y++) {
                const tile = tileColumn[y];
                emptyTileIndeces.push(tile.index);
            }
        }

        // While there are still mines left to place
        while (mines > 0) {
            // Get a random tile index and remove it from the list of empty tile indeces
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
    setAdjacentMines(): void {
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
    getAdjacentTilesFor(index: TileIndex): MinesweeperTile[] {
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
    getAdjacentMinesFor(index: TileIndex): number {
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
    getAdjacentFlagsFor(index: TileIndex): number {
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
    if the tile is revealed and the tile is satisfied it also activates all adjacent non-flagged tiles
    if the tile has no adjacent mines it also activates all adjacent tiles
    if the activated tile has a mine the game is ended
    */
    activateTile(index: TileIndex): void {
        if (this.isEnded) return;
        if (!this.isStarted) this.isStarted = true;

        // Get the tile that is being activated
        const tile = this.tiles[index.x][index.y];

        if (tile.isFlagged) return;

        if (!tile.isRevealed) {
            // If the tile has not been revealed yet
            // Reaveal it
            tile.isRevealed = true;

            if (tile.hasMine) {
                // If the tile has a mine
                // Explode the mine
                tile.mineExploded = true;
                // End the game
                this.isEnded = true;
            } else if (tile.adjacentMines === 0) {
                // If the tile has no adjacent mines
                // Activate all adjacent tiles
            }
        } else if (tile.adjacentMines > 0 && this.isSatisfied(index)) {
            // If the tile is already revealed
            // and the tile has the same number of adjacent flags as adjacent mines
            // Activate all adjacent non-flagged tiles
        }
    }

    /*
    Function takes the index of a tile on the board and checks if it has an equal ammount
    of adjacent flagged tiles as adjacent mines
    */
    isSatisfied(index: TileIndex): boolean {
        return (
            this.getAdjacentMinesFor(index) == this.getAdjacentFlagsFor(index)
        );
    }

    /*
    Function takes the index of a tile on the board
    if the tile is already flagged it gets un-flagged
    if the tile is revealed, it does not get flagged
    */
    flagTile(index: TileIndex): void {
        if (this.isEnded) return;

        // Get the tile that is being activated
        const tile = this.tiles[index.x][index.y];

        if (tile.isRevealed) return;

        tile.isFlagged = !tile.isFlagged;
    }

    /*
    Function just creates a new object with the exact same values so that the damn state will update
    */
    cloneState(): MinesweeperState {
        return new MinesweeperState(
            this.difficulty,
            this.isEnded,
            this.isStarted,
            this.isWon,
            this.remainingMines,
            this.tiles
        );
    }
}

export class TileIndex {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class MinesweeperTile {
    adjacentMines: number;
    hasMine: boolean;
    index: TileIndex;
    isFlagged: boolean;
    isRevealed: boolean;
    mineExploded: boolean;

    constructor(x: number, y: number) {
        this.adjacentMines = 0;
        this.hasMine = false;
        this.index = new TileIndex(x, y);
        this.isFlagged = false;
        this.isRevealed = false;
        this.mineExploded = false;
    }
}
