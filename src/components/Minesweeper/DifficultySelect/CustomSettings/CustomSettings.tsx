import { MinesweeperDifficulty } from "../../utils/minesweeper-difficulty";

type TProps = {
    setCustomDifficulty: (newCustomDifficulty: MinesweeperDifficulty) => void;
};

function CustomSettings(props: TProps) {
    return (
        <div className="custom-settings">
            <input></input>
            <input></input>
        </div>
    );
}

export default CustomSettings;
