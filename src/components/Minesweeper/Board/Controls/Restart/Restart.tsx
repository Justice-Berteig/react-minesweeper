type TProps = {
    restartGame: () => void;
    isEnded: boolean;
    isStarted: boolean;
    isWon: boolean;
};

function Restart(props: TProps) {
    let imageName: string;
    if (props.isEnded) {
        if (props.isWon) {
            imageName = "sunglasses";
        } else {
            imageName = "dead";
        }
    } else {
        imageName = "smile";
    }

    return (
        <button
            className="restart"
            data-image-name={imageName}
            onClick={() => {
                props.restartGame();
            }}
        >
            {imageName}
        </button>
    );
}

export default Restart;
