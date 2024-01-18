import Tile from "./Tile/index.ts";
import TileClass from "../../utils/tileClass.ts";
import "./Row.css";

type TProps = {
    tiles: TileClass[];
};

function Row(props: TProps) {
    const tiles: TileClass[] = props.tiles;

    return (
        <div className="row">
            {tiles.map((tile, index) => {
                return (
                    <Tile key={"tile-" + index} tile={tile} ref={tile.ref} />
                );
            })}
        </div>
    );
}

export default Row;
