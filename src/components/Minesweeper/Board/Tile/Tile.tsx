import { ReactElement } from "react";
import { numberToString } from "./util/number-to-string.ts";
import {
    Action,
    MinesweeperAction,
    MinesweeperTile,
} from "../../utils/types.ts";
import "./Tile.css";

type TProps = {
    tile: MinesweeperTile;
    dispatch: (object: MinesweeperAction) => void;
};

function Tile(props: TProps) {
    let tileContents: ReactElement;
    if (props.tile.hasMine) {
        tileContents = <img src="mine.svg" className="tile-contents"></img>;
    } else if (props.tile.adjacentMines > 0 && props.tile.adjacentMines < 9) {
        tileContents = (
            <span className="tile-contents">{props.tile.adjacentMines}</span>
        );
    } else {
        tileContents = <span className="tile-contents"></span>;
    }

    return (
        <button
            className={
                "tile" +
                (numberToString(props.tile.adjacentMines)
                    ? " " + numberToString(props.tile.adjacentMines)
                    : "")
            }
            onClick={() => {
                // When the tile is left clicked
                props.dispatch({
                    type: Action.LCLICK,
                    index: props.tile.index,
                });
            }}
            onContextMenu={(e) => {
                // When the tile is right clicked
                // Prevent context menu from popping up
                e.preventDefault();
                props.dispatch({
                    type: Action.RCLICK,
                    index: props.tile.index,
                });
            }}
            data-mine-exploded={props.tile.mineExploded}
            data-is-flagged={props.tile.isFlagged}
            data-is-revealed={props.tile.isRevealed}
        >
            {tileContents}
        </button>
    );
}

export default Tile;
