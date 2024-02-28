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

    /*
    Function creates and returns a deep copy of the tile
    */
    createDeepCopy(): MinesweeperTile {
        const newTile = new MinesweeperTile(this.index.x, this.index.y);

        newTile.adjacentMines = this.adjacentMines;
        newTile.hasMine = this.hasMine;
        newTile.isFlagged = this.isFlagged;
        newTile.isRevealed = this.isRevealed;
        newTile.mineExploded = this.mineExploded;

        return newTile;
    }
}
