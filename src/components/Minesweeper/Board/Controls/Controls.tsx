import RemainingMines from "./RemainingMines";
import Restart from "./Restart";
import Timer from "./Timer";
import "./Controls.css";

type TProps = {
    remainingMines: number;
    restartGame: () => void;
    isEnded: boolean;
    isStarted: boolean;
    isWon: boolean;
};

function Controls(props: TProps) {
    return (
        <div className="controls">
            <RemainingMines remainingMines={props.remainingMines} />
            <Restart
                restartGame={props.restartGame}
                isEnded={props.isEnded}
                isStarted={props.isStarted}
                isWon={props.isWon}
            />
            <Timer isEnded={props.isEnded} isStarted={props.isStarted} />
        </div>
    );
}

export default Controls;
