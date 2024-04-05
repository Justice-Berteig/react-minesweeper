import { ReactElement } from "react";
import { numberToString } from "./util/number-to-string.ts";
import {
    ActionType,
    MinesweeperAction,
} from "../../utils/minesweeper-action.ts";
import { MinesweeperTile } from "../../utils/minesweeper-tile.ts";
import "./Tile.css";

type TProps = {
    tile: MinesweeperTile;
    dispatch: (object: MinesweeperAction) => void;
};

function Tile(props: TProps) {
    // Create list of classes to give the element
    const classes: string[] = ["tile"];
    if (
        props.tile.isRevealed &&
        props.tile.adjacentMines > 0 &&
        props.tile.adjacentMines < 9
    ) {
        // If the tile is revealed and has between 1 and 8 adjacent mines
        classes.push(numberToString(props.tile.adjacentMines));
    }

    // Create element for the contents of the tile
    let tileContents: ReactElement;
    if (props.tile.isRevealed && props.tile.hasMine) {
        // If the tile is revealed and has a mine
        tileContents = <img src="mine.svg"></img>;
    } else if (
        props.tile.isRevealed &&
        props.tile.adjacentMines > 0 &&
        props.tile.adjacentMines < 9
    ) {
        // If the tile is revealed and has between 1 and 8 adjacent mines
        tileContents = <span>{props.tile.adjacentMines}</span>;
    } else {
        // Otherwise
        tileContents = <span></span>;
    }

    return (
        <button
            className={classes.join(" ")}
            onClick={() => {
                // When the tile is left clicked
                props.dispatch({
                    type: ActionType.LCLICK,
                    index: props.tile.index,
                });
            }}
            onContextMenu={(e) => {
                // When the tile is right clicked
                // Prevent context menu from popping up
                e.preventDefault();
                props.dispatch({
                    type: ActionType.RCLICK,
                    index: props.tile.index,
                });
            }}
            data-is-flagged={props.tile.isFlagged}
            data-is-revealed={props.tile.isRevealed}
            data-user-error={props.tile.userError}
        >
            {tileContents}
        </button>
    );
}

export default Tile;
