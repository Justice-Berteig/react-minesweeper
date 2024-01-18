import { forwardRef, ForwardedRef } from "react";
import TileClass from "../../../utils/tileClass.ts";
import "./Tile.css";

type TProps = {
    tile: TileClass;
};

const Row = forwardRef(
    (props: TProps, ref: ForwardedRef<HTMLDivElement | null>) => {
        return (
            <div className="tile" ref={ref}>
                <p>{props.tile.contents}</p>
            </div>
        );
    }
);

export default Row;
