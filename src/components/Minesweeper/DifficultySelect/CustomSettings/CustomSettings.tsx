import { MinesweeperDifficulty } from "../../utils/minesweeper-difficulty";

// Stylesheet imports
import "./CustomSettings.css";

type TProps = {
    isVisible: boolean;
    setCustomDifficulty: (newCustomDifficulty: MinesweeperDifficulty) => void;
};

function CustomSettings(props: TProps) {
    return (
        <div className={"custom-settings" + (props.isVisible ? "" : " hidden")}>
            <input></input>
            <input></input>
            <input></input>
        </div>
    );
}

export default CustomSettings;
