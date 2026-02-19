// Component imports
import CustomSettings from "./CustomSettings";
import DifficultyButton from "./DifficultyButton";

// Type imports
import { MinesweeperAction } from "../utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "../utils/minesweeper-difficulty.ts";
import { MinesweeperState } from "../utils/minesweeper-state.ts";

// Stylesheet imports
import "./DifficultySelect.css";

type TProps = {
    state: MinesweeperState;
    dispatch: (action: MinesweeperAction) => void;
};

function DifficultySelect(props: TProps) {
    return (
        <div className="difficulty-select">
            <div className="difficulty-buttons">
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.BEGINNER)
                    }
                    dispatch={props.dispatch}
                    name="Beginner"
                />
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.INTERMEDIATE)
                    }
                    dispatch={props.dispatch}
                    name="Intermediate"
                />
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.EXPERT)
                    }
                    dispatch={props.dispatch}
                    name="Expert"
                />
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.CUSTOM)
                    }
                    dispatch={props.dispatch}
                    name="Custom"
                />
            </div>
            <CustomSettings
                dispatch={props.dispatch}
                isVisible={
                    props.state.difficulty.level === DifficultyLevel.CUSTOM ? true : false
                }
            />
        </div>
    );
}

export default DifficultySelect;
