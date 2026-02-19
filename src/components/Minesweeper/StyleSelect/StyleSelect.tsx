import { Dispatch, SetStateAction } from "react";

// Component imports
import Dropdown from "./Dropdown";

// Utility imports
import { rangeToArray } from "./utils/range-to-array";

// Stylesheet imports
import "./StyleSelect.css";

type TProps = {
    boardScale: string;
    setBoardScale: (newScale: string) => void;
    boardBrightness: string;
    setBoardBrightness: (newBrightness: string) => void;
};

function StyleSelect(props: TProps) {
    // Values to define the range of the scale
    const minScale = 50;
    const maxScale = 150;
    const incScale = 5;
    const scaleOptions: string[] = rangeToArray(
        minScale,
        maxScale,
        incScale
    ).map((option: number) => {
        return option + "%";
    });

    // Values to define the range of the brightness
    const minBrightness = 25;
    const maxBrightness = 100;
    const incBrightness = 5;
    const brightnessOptions: string[] = rangeToArray(
        minBrightness,
        maxBrightness,
        incBrightness
    ).map((option: number) => {
        return option + "%";
    });

    return (
        <div className="style-select">
            <Dropdown
                iconPath={null}
                name="scale-select"
                options={scaleOptions}
                setValue={props.setBoardScale}
                value={props.boardScale}
            />
            <Dropdown
                iconPath={null}
                name="brightness-select"
                options={brightnessOptions}
                setValue={props.setBoardBrightness}
                value={props.boardBrightness}
            />
        </div>
    );
}

export default StyleSelect;
