import { MinesweeperState } from "./minesweeper-state.ts";
import { MinesweeperTile } from "./minesweeper-tile.ts";
import { StateUpdate } from "./state-update.ts";
import { TileIndex } from "./tile-index.ts";

/*
Function takes an index for an empty tile, a state object, an update object,
and an array of previously revealed tiles. Then revealse all adjacent tiles.
If some of the adjacent tiles are also empty, use recursion to reveal the tiles
around them as well.
*/
export function handleEmptyTile(
    emptyTile: MinesweeperTile,
    state: MinesweeperState,
    update: StateUpdate,
    revealedTiles: TileIndex[]
): void {
    // If the tile has adjacent mines do nothing
    if (emptyTile.adjacentMines !== 0) return;

    // Get adjacent tiles
    const adjacentTiles = state.getAdjacentTilesFor(emptyTile.index);

    for (const adjacentTile of adjacentTiles) {
        // For each adjacent tile
        if (
            !revealedTiles.some((index) => {
                return index.equals(adjacentTile.index);
            }) &&
            !adjacentTile.isRevealed
        ) {
            // If the tile has not been revealed
            // Reveal the tile
            update.updateTile({
                index: adjacentTile.index,
                isFlagged: adjacentTile.isFlagged ? false : undefined,
                isRevealed: true,
            });

            // Add the tile to the list of revealed tiles
            revealedTiles.push(adjacentTile.index);
            // Recursively call this function with the tile
            handleEmptyTile(adjacentTile, state, update, revealedTiles);
        }
    }
}
