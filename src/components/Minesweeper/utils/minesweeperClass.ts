import { MutableRefObject } from "react";
import TileClass from "./tileClass.ts";

export default class MinesweeperClass {
    private width: number;
    private height: number;
    private startingMines: number;

    public currentMines: number;
    public tiles: TileClass[][];

    constructor(
        width: number,
        height: number,
        startingMines: number,
        tileRefs: MutableRefObject<HTMLDivElement | null>[][]
    ) {
        this.width = width;
        this.height = height;
        this.startingMines = startingMines;

        this.currentMines = startingMines;

        this.tiles = [];
        for (let x = 0; x < width; x++) {
            const row: TileClass[] = [];
            this.tiles.push(row);
            for (let y = 0; y < height; y++) {
                row.push(new TileClass(x, y, tileRefs[x][y]));
            }
        }
    }
}
