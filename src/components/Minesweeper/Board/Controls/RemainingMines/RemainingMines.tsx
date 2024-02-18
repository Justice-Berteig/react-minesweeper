type TProps = {
    remainingMines: number;
};

function RemainingMines(props: TProps) {
    return <div className="remaining-mines">{props.remainingMines}</div>;
}

export default RemainingMines;
