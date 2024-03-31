import { MinesweeperTile } from "./minesweeper-tile.ts";
import { TileIndex } from "./tile-index.ts";

export type TileUpdate = {
    index: TileIndex;
    isFlagged?: boolean;
    isRevealed?: boolean;
    userError?: boolean;
};

/*
Function takes a tile and an update for that tile
then returns a new tile with the update applied.
Does not make any changes to the original tile object.
*/
export function updateTile(
    oldTile: MinesweeperTile,
    update: TileUpdate
): MinesweeperTile {
    // Deep copy the old tile
    const newTile = oldTile.createCopy();

    // Check which attributes should be updated and update them
    if (update.isFlagged !== undefined) newTile.isFlagged = update.isFlagged;
    if (update.isRevealed !== undefined) newTile.isRevealed = update.isRevealed;
    if (update.userError !== undefined) newTile.userError = update.userError;

    return newTile;
}
