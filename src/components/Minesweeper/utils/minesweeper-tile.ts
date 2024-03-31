import { TileIndex } from "./tile-index.ts";

export class MinesweeperTile {
    adjacentMines: number;
    hasMine: boolean;
    index: TileIndex;
    isFlagged: boolean;
    isRevealed: boolean;
    userError: boolean;

    constructor(x: number, y: number) {
        this.adjacentMines = 0;
        this.hasMine = false;
        this.index = new TileIndex(x, y);
        this.isFlagged = false;
        this.isRevealed = false;
        this.userError = false;
    }

    /*
    Function creates and returns a copy of the tile
    */
    public createCopy(): MinesweeperTile {
        const newTile = new MinesweeperTile(this.index.x, this.index.y);

        newTile.adjacentMines = this.adjacentMines;
        newTile.hasMine = this.hasMine;
        newTile.isFlagged = this.isFlagged;
        newTile.isRevealed = this.isRevealed;
        newTile.userError = this.userError;

        return newTile;
    }
}
