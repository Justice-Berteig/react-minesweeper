import { useState } from "react";

// Component imports
import SettingInput from "./SettingInput/SettingInput.tsx";

// Type imports
import { ActionType, MinesweeperAction } from "../../utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
    defaults
} from "../../utils/minesweeper-difficulty";

// Stylesheet imports
import "./CustomSettings.css";

type TProps = {
    dispatch: (action: MinesweeperAction) => void;
    isVisible: boolean;
};

function CustomSettings(props: TProps) {
    const [width, setWidth] = useState<number>(defaults.width);
    const [height, setHeight] = useState<number>(defaults.height);
    const [startingMines, setStartingMines] = useState<number>(defaults.startingMines);

    return (
        <div className={"custom-settings" + (props.isVisible ? "" : " hidden")}>
            <SettingInput
                label="Width:"
                value={width}
                maxValue={40}
                setValue={setWidth}
            />
            <SettingInput
                label="Height:"
                value={height}
                maxValue={40}
                setValue={setHeight}
            />
            <SettingInput
                label="Mines:"
                value={startingMines}
                maxValue={width * height}
                setValue={setStartingMines}
            />
            <button
                className="update-button"
                onClick={() => props.dispatch({
                    type: ActionType.RESET,
                    newDifficulty: new MinesweeperDifficulty(
                        DifficultyLevel.CUSTOM,
                        width,
                        height,
                        startingMines
                    ),
                    index: null
                })}
            >Update</button>
        </div>
    );
}

export default CustomSettings;
