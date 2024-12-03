import { useState } from "react";

// Component imports
import CustomSettings from "./CustomSettings";
import DifficultyButton from "./DifficultyButton";

// Type imports
import { MinesweeperAction } from "../utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "../utils/minesweeper-difficulty.ts";

// Stylesheet imports
import "./DifficultySelect.css";

type TProps = {
    dispatch: (action: MinesweeperAction) => void;
};

function DifficultySelect(props: TProps) {
    const [currentDifficulty, setCurrentDifficulty] = useState(
        DifficultyLevel.BEGINNER
    );
    const [customDifficulty, setCustomDifficulty] = useState(
        new MinesweeperDifficulty(DifficultyLevel.CUSTOM)
    );

    return (
        <div className="difficulty-select">
            <div className="difficulty-buttons">
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.BEGINNER)
                    }
                    dispatch={props.dispatch}
                    name="Beginner"
                    setCurrentDifficulty={setCurrentDifficulty}
                />
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.INTERMEDIATE)
                    }
                    dispatch={props.dispatch}
                    name="Intermediate"
                    setCurrentDifficulty={setCurrentDifficulty}
                />
                <DifficultyButton
                    difficulty={
                        new MinesweeperDifficulty(DifficultyLevel.EXPERT)
                    }
                    dispatch={props.dispatch}
                    name="Expert"
                    setCurrentDifficulty={setCurrentDifficulty}
                />
                <DifficultyButton
                    difficulty={customDifficulty}
                    dispatch={props.dispatch}
                    name="Custom"
                    setCurrentDifficulty={setCurrentDifficulty}
                />
            </div>
            <CustomSettings
                isVisible={
                    currentDifficulty === DifficultyLevel.CUSTOM ? true : false
                }
                setCustomDifficulty={setCustomDifficulty}
            />
        </div>
    );
}

export default DifficultySelect;
