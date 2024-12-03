// Stylesheet imports
import "./Restart.css";

type TProps = {
    restartGame: () => void;
    isEnded: boolean;
    isStarted: boolean;
    isWon: boolean;
};

function Restart(props: TProps) {
    let imagePath: string;
    if (props.isEnded) {
        if (props.isWon) {
            imagePath = "face-sunglasses.svg";
        } else {
            imagePath = "face-dead.svg";
        }
    } else {
        imagePath = "face-happy.svg";
    }

    return (
        <button
            className="restart"
            onClick={() => {
                props.restartGame();
            }}
            draggable="false"
        >
            <img src={imagePath} draggable="false"></img>
        </button>
    );
}

export default Restart;
