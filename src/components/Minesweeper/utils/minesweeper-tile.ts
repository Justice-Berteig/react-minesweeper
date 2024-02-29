export class TileIndex {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class TileUpdate {
    index: TileIndex;
    isFlagged: boolean | null;
    isRevealed: boolean | null;
    mineExploded: boolean | null;

    constructor(index: TileIndex) {
        this.index = index;
        this.isFlagged = null;
        this.isRevealed = null;
        this.mineExploded = null;
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

    /*
    Function takes a tile update object and returns a deep copy of this tile
    with the updates applied
    */
    public updateTile(update: TileUpdate): MinesweeperTile {
        // Create deep copy of tile
        const newTile = this.createDeepCopy();

        // Update any properties that need to be updated
        if (update.isFlagged != null) {
            newTile.isFlagged = update.isFlagged;
        }
        if (update.isRevealed != null) {
            newTile.isRevealed = update.isRevealed;
        }
        if (update.mineExploded != null) {
            newTile.mineExploded = update.mineExploded;
        }

        // Return the updated tile
        return newTile;
    }

    /*
    Function creates and returns a deep copy of the tile
    */
    public createDeepCopy(): MinesweeperTile {
        const newTile = new MinesweeperTile(this.index.x, this.index.y);

        newTile.adjacentMines = this.adjacentMines;
        newTile.hasMine = this.hasMine;
        newTile.isFlagged = this.isFlagged;
        newTile.isRevealed = this.isRevealed;
        newTile.mineExploded = this.mineExploded;

        return newTile;
    }
}
