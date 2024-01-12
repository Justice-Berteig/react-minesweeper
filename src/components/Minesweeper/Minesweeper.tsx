import Board from "./Board/index.ts";
import Controls from "./Controls/Controls.tsx";
import "./Minesweeper.css";

function Minesweeper() {
    return (
        <div className="minesweeper">
            <Controls />
            <Board />
        </div>
    );
}

export default Minesweeper;
