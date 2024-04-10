import { numToImgPaths } from "./util/num-to-img-paths";
import "./NumberDisplay.css";

type TProps = {
    digits: number;
    name: string;
    number: number;
};

function NumberDisplay(props: TProps) {
    return (
        <div className="number-display">
            {numToImgPaths(props.number, props.digits).map((imgPath, index) => {
                return (
                    <img
                        src={imgPath}
                        key={props.name + "-" + index}
                        draggable="false"
                    ></img>
                );
            })}
        </div>
    );
}

export default NumberDisplay;
