import RemainingMines from "./RemainingMines/RemainingMines.tsx";
import Timer from "./Timer/Timer.tsx";
import "./Controls.css";
import Restart from "./Restart/Restart.tsx";

function Controls() {
    return (
        <div className="controls">
            <RemainingMines />
            <Restart />
            <Timer />
        </div>
    );
}

export default Controls;
