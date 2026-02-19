import React from "react";

// Stylesheet imports
import "./SettingInput.css";

type TProps = {
    label: string;
    value: number;
    maxValue: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function SettingInput(props: TProps) {
    return (
        <div className="setting-input">
            <label htmlFor={props.label.toLowerCase()}>
                {props.label}
            </label>
            <input
                name={props.label.toLowerCase()}
                value={props.value}
                onChange={e => props.setValue(
                    Math.max(
                        1,
                        Math.min(
                            parseInt(e.target.value) || 1,
                            props.maxValue
                        )
                    )
                )}
            />
        </div>
    );
}
