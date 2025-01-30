import { Dispatch, SetStateAction } from "react";

import "./Dropdown.css";

type TProps = {
    iconPath: string | null;
    name: string;
    options: number[] | string[];
    setValue: Dispatch<SetStateAction<string>>;
    value: string;
};

function Dropdown(props: TProps) {
    return (
        <select
            className={props.name}
            onChange={(e) => {
                props.setValue(e.target.value);
            }}
            value={props.value}
        >
            {props.options.map((option) => {
                return (
                    <option key={props.name + "-" + option} value={option}>
                        {option}
                    </option>
                );
            })}
        </select>
    );
}

export default Dropdown;
