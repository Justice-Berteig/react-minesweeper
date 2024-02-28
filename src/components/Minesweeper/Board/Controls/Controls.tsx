import RemainingMines from "./RemainingFlags";
import Restart from "./Restart";
import Timer from "./Timer";
import "./Controls.css";

type TProps = {
    remainingFlags: number;
    restartGame: () => void;
    isEnded: boolean;
    isStarted: boolean;
    isWon: boolean;
};

function Controls(props: TProps) {
    return (
        <div className="controls">
            <RemainingMines remainingFlags={props.remainingFlags} />
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
