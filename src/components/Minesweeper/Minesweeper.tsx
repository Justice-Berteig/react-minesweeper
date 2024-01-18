import { MutableRefObject, useRef, useState } from "react";
import Board from "./Board";
import Controls from "./Controls";
import MinesweeperClass from "./utils/minesweeperClass.ts";
import MinesweeperState from "./utils/minesweeperStateEnum.ts";
import "./Minesweeper.css";

type TProps = {
    width: number;
    height: number;
    startingMines: number;
};

function Minesweeper(props: TProps) {
    const [state, setState] = useState(MinesweeperState.BEFORE_START);

    const tileRefs: MutableRefObject<HTMLDivElement | null>[][] = [];

    for (let x = 0; x < props.width; x++) {
        const row: MutableRefObject<HTMLDivElement | null>[] = [];
        for (let y = 0; y < props.height; y++) {
            const tile: MutableRefObject<HTMLDivElement | null> = useRef(null);
            row.push(tile);
        }
        tileRefs.push(row);
    }

    const minesweeperRef = useRef<MinesweeperClass>(
        new MinesweeperClass(
            props.width,
            props.height,
            props.startingMines,
            tileRefs
        )
    );

    function printRefs() {
        for (let x = 0; x < props.width; x++) {
            for (let y = 0; y < props.height; y++) {
                console.log(
                    minesweeperRef.current.tiles[x][y].ref.current?.innerHTML
                );
            }
        }
    }

    return (
        <div className="minesweeper">
            <Controls />
            <Board minesweeperRef={minesweeperRef} />
            <button onClick={printRefs}>TEST</button>
        </div>
    );
}

export default Minesweeper;
