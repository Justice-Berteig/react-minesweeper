import { useEffect, useRef, useState } from "react";

// Component imports
import NumberDisplay from "../NumberDisplay";

type TProps = {
    isEnded: boolean;
    isStarted: boolean;
};

function Timer(props: TProps) {
    const [time, setTime] = useState(0);

    const intervalID = useRef<number>(0);
    const startTime = useRef<number>(0);

    useEffect(() => {
        if (!props.isStarted && !props.isEnded) {
            // If the game just restarted
            // Reset the time
            setTime(0);
        } else if (props.isStarted && !props.isEnded) {
            // If the game just started
            // Set the start time
            startTime.current = Date.now();
            // Start the timer
            intervalID.current = setInterval(() => {
                setTime(Date.now() - startTime.current);
            }, 50);
        } else if (props.isStarted && props.isEnded) {
            // If the game just ended
            // Stop the timer
            console.log("GAME ENDED! FINAL TIME:");
            console.log(timeToSeconds(time, 5) + "s");
            clearInterval(intervalID.current);
        }

        return function cleanup() {
            clearInterval(intervalID.current);
        };
    }, [props.isEnded, props.isStarted]);

    // return <div className="timer">{Math.floor(time / 1000)}</div>;
    return (
        <NumberDisplay
            digits={3}
            name="timer"
            number={Math.floor(time / 1000)}
        />
    );
}

function timeToSeconds(time: number, precision: number): string {
    return (Math.floor((time / 1000) * 100) / 100).toFixed(precision);
}

export default Timer;
