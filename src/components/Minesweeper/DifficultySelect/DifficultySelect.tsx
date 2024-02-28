import { ActionType, MinesweeperAction } from "../utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "../utils/minesweeper-difficulty.ts";
import "./DifficultySelect.css";

type TProps = {
    dispatch: (action: MinesweeperAction) => void;
};

function DifficultySelect(props: TProps) {
    return (
        <div className="difficulty-select">
            <button
                onClick={() => {
                    props.dispatch({
                        type: ActionType.RESET,
                        newDifficulty: new MinesweeperDifficulty(
                            DifficultyLevel.BEGINNER
                        ),
                        index: null,
                    });
                }}
            >
                Beginner
            </button>
            <button
                onClick={() => {
                    props.dispatch({
                        type: ActionType.RESET,
                        newDifficulty: new MinesweeperDifficulty(
                            DifficultyLevel.INTERMEDIATE
                        ),
                        index: null,
                    });
                }}
            >
                Intermediate
            </button>
            <button
                onClick={() => {
                    props.dispatch({
                        type: ActionType.RESET,
                        newDifficulty: new MinesweeperDifficulty(
                            DifficultyLevel.EXPERT
                        ),
                        index: null,
                    });
                }}
            >
                Expert
            </button>
        </div>
    );
}

export default DifficultySelect;
