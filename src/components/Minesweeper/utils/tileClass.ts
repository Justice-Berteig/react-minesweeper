import { MutableRefObject } from "react";
import TileIndex from "./tileIndexClass.ts";

export default class TileClass {
    public index: TileIndex;
    public contents: string;
    public ref: MutableRefObject<HTMLDivElement | null>;

    constructor(
        xIndex: number,
        yIndex: number,
        ref: MutableRefObject<HTMLDivElement | null>
    ) {
        this.index = new TileIndex(xIndex, yIndex);
        this.contents = xIndex + " " + yIndex;
        this.ref = ref;
    }
}
