// Component imports
import NumberDisplay from "../NumberDisplay";

type TProps = {
    remainingFlags: number;
};

function RemainingFlags(props: TProps) {
    // return <div className="remaining-flags">{props.remainingFlags}</div>;
    return (
        <NumberDisplay
            digits={3}
            name="remaining-flags"
            number={props.remainingFlags}
        />
    );
}

export default RemainingFlags;
