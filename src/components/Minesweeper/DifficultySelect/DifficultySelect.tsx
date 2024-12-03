import { useState } from "react";
import { ActionType, MinesweeperAction } from "../utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "../utils/minesweeper-difficulty.ts";
import "./DifficultySelect.css";
import CustomSettings from "./CustomSettings/CustomSettings.tsx";

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
            <button
                onClick={() => {
                    setCurrentDifficulty(DifficultyLevel.BEGINNER);
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
                    setCurrentDifficulty(DifficultyLevel.INTERMEDIATE);
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
                    setCurrentDifficulty(DifficultyLevel.EXPERT);
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
            <button
                onClick={() => {
                    setCurrentDifficulty(DifficultyLevel.CUSTOM);
                    props.dispatch({
                        type: ActionType.RESET,
                        newDifficulty: customDifficulty,
                        index: null,
                    });
                }}
            >
                Custom
            </button>
            <CustomSettings setCustomDifficulty={setCustomDifficulty} />
        </div>
    );
}

export default DifficultySelect;
