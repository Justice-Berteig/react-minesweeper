import Controls from "./Controls";
import Tile from "./Tile";
import { Action, MinesweeperAction, MinesweeperState } from "../utils/types.ts";
import "./Board.css";

type TProps = {
    state: MinesweeperState;
    dispatch: (object: MinesweeperAction) => void;
};

function Board(props: TProps) {
    return (
        <div className="board">
            <Controls
                remainingMines={props.state.remainingMines}
                restartGame={() => {
                    props.dispatch({
                        type: Action.RESET,
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
                                        key={"tile-" + xIndex + "-" + yIndex}
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
    );
}

export default Board;
