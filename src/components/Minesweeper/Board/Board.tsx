import { MutableRefObject } from "react";
import Row from "./Row/Row.tsx";
import MinesweeperClass from "../utils/minesweeperClass.ts";
import TileClass from "../utils/tileClass.ts";
import "./Board.css";

type TProps = {
    minesweeperRef: MutableRefObject<MinesweeperClass>;
};

function Board(props: TProps) {
    const tiles: TileClass[][] = props.minesweeperRef.current.tiles;

    return (
        <div className="board">
            {tiles.map((row, index) => {
                return <Row key={"row-" + index} tiles={row} />;
            })}
        </div>
    );
}

export default Board;
