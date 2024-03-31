import { MinesweeperState } from "./minesweeper-state.ts";
import { StateUpdate } from "./state-update.ts";

/*
Function takes a Minesweeper state object and a Minesweeper state update object
then reveals all tiles that have mines
*/
export function revealMines(state: MinesweeperState, update: StateUpdate) {
    for (const column of state.tiles) {
        for (const tile of column) {
            // For each tile
            if (tile.hasMine && tile.isRevealed === false) {
                // If the tile has a mine and has not been revealed yet
                // Reveal it
                update.updateTile({
                    index: tile.index,
                    isRevealed: true,
                });
            }
        }
    }
}
