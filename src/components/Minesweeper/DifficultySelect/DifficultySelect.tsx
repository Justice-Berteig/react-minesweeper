import {
    Action,
    Difficulty,
    DifficultyLevel,
    MinesweeperAction,
} from "../utils/types.ts";
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
                        type: Action.RESET,
                        newDifficulty: new Difficulty(DifficultyLevel.BEGINNER),
                        index: null,
                    });
                }}
            >
                Beginner
            </button>
            <button
                onClick={() => {
                    props.dispatch({
                        type: Action.RESET,
                        newDifficulty: new Difficulty(
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
                        type: Action.RESET,
                        newDifficulty: new Difficulty(DifficultyLevel.EXPERT),
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
