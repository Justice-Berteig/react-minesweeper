// Component imports
import Controls from "./Controls";
import Tile from "./Tile";

// Type imports
import { ActionType, MinesweeperAction } from "../utils/minesweeper-action.ts";
import { MinesweeperState } from "../utils/minesweeper-state.ts";

// Stylesheet imports
import "./Board.css";

type TProps = {
    brightness: string;
    scale: string;
    state: MinesweeperState;
    dispatch: (object: MinesweeperAction) => void;
};

function Board(props: TProps) {
    return (
        <div
            className="board"
            data-scale={props.scale}
            data-brightness={props.brightness}
        >
            <div className="board-contents">
                <Controls
                    remainingFlags={props.state.remainingFlags}
                    restartGame={() => {
                        props.dispatch({
                            type: ActionType.RESET,
                            newDifficulty: props.state.difficulty,
                        });
                    }}
                    isEnded={props.state.isEnded}
                    isStarted={props.state.isStarted}
                    isWon={props.state.isWon}
                />
                <div className="tiles">
                    {/* For each row of tiles */}
                    {props.state.tiles.map((column, xIndex) => {
                        return (
                            <div className="column" key={"column-" + xIndex}>
                                {/* For each tile in the row */}
                                {column.map((tile, yIndex) => {
                                    return (
                                        <Tile
                                            key={
                                                "tile-" + xIndex + "-" + yIndex
                                            }
                                            tile={tile}
                                            dispatch={props.dispatch}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Board;
