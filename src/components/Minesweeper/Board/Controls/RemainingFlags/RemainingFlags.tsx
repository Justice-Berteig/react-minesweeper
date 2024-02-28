type TProps = {
    remainingFlags: number;
};

function RemainingFlags(props: TProps) {
    return <div className="remaining-flags">{props.remainingFlags}</div>;
}

export default RemainingFlags;
