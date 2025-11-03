// Type imports
import { ActionType, MinesweeperAction } from "../../utils/minesweeper-action";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "../../utils/minesweeper-difficulty";

// Stylesheet imports
import "./DifficultyButton.css";

type TProps = {
    difficulty: MinesweeperDifficulty;
    dispatch: (action: MinesweeperAction) => void;
    name: string;
    setCurrentDifficulty: (
        value: React.SetStateAction<DifficultyLevel>
    ) => void;
};

function DifficultyButton(props: TProps) {
    return (
        <button
            className="difficulty-button"
            onClick={() => {
                props.setCurrentDifficulty(props.difficulty.level);
                props.dispatch({
                    type: ActionType.RESET,
                    newDifficulty: props.difficulty,
                    index: null,
                });
            }}
        >
            {props.name}
        </button>
    );
}

export default DifficultyButton;
