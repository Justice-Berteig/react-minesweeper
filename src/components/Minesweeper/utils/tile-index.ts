export class TileIndex {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /*
    Function checks for equality between this tile index and another tile index
    */
    public equals(other: TileIndex): boolean {
        return this.x === other.x && this.y === other.y;
    }
}
