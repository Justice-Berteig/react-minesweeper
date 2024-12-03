import { ReactElement } from "react";

// Type imports
import {
    ActionType,
    MinesweeperAction,
} from "../../utils/minesweeper-action.ts";
import { MinesweeperTile } from "../../utils/minesweeper-tile.ts";

// Utility imports
import { numberToString } from "./util/number-to-string.ts";

// Stylesheet imports
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
        tileContents = <img src="mine.svg" draggable="false"></img>;
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
            onMouseOver={(event) => {
                if (event.buttons === 1) {
                    // When moused over with the left mouse button pressed down
                    // Dispatch pressed action
                    props.dispatch({
                        type: ActionType.PRESS_TILE,
                        index: props.tile.index,
                    });
                }
            }}
            onMouseOut={(event) => {
                if (event.buttons === 1) {
                    // When moused out with the left mouse button pressed down
                    // Dispatch lifted action
                    props.dispatch({
                        type: ActionType.RELEASE_TILE,
                        index: props.tile.index,
                    });
                }
            }}
            onMouseDown={(event) => {
                if (event.button === 0) {
                    // When the left mouse button is pressed down
                    // Dispatch pressed action
                    props.dispatch({
                        type: ActionType.PRESS_TILE,
                        index: props.tile.index,
                    });
                } else if (event.button === 2) {
                    // When the right mouse button is pressed down
                    // Dispatch flag action
                    props.dispatch({
                        type: ActionType.FLAG_TILE,
                        index: props.tile.index,
                    });
                }
            }}
            onMouseUp={(event) => {
                if (event.button === 0) {
                    // When the left mouse button is lifted up
                    // Dispatch reveal action
                    props.dispatch({
                        type: ActionType.REVEAL_TILE,
                        index: props.tile.index,
                    });
                }
            }}
            onContextMenu={(e) => {
                // When the tile is right clicked
                // Prevent context menu from popping up
                e.preventDefault();
            }}
            data-is-covered={props.tile.isCovered && !props.tile.isPressed}
            data-is-flagged={props.tile.isFlagged}
            data-is-revealed={props.tile.isRevealed}
            data-user-error={props.tile.userError}
        >
            {tileContents}
        </button>
    );
}

export default Tile;
