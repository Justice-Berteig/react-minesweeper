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
            !hasBeenRevealed(adjacentTile.index, revealedTiles) &&
            !adjacentTile.isRevealed
        ) {
            // If the tile has not been revealed
            // Reveal the tile
            update.updateTile({ index: adjacentTile.index, isRevealed: true });
            // Add the tile to the list of revealed tiles
            revealedTiles.push(adjacentTile.index);
            // Recursively call this function with the tile
            handleEmptyTile(adjacentTile, state, update, revealedTiles);
        }
    }
}

/*
Function takes the index of a tile and a list of indeces for previously revealed tiles
*/
function hasBeenRevealed(
    index: TileIndex,
    revealedTiles: TileIndex[]
): boolean {
    for (const revealedIndex of revealedTiles) {
        // For each of the previously revealed tiles
        if (revealedIndex.x === index.x && revealedIndex.y === index.y) {
            // If this tile has already been previously revealed
            // Return true
            return true;
        }
    }

    // If the tile at the given index has not been revealed yet
    // Return false
    return false;
}
