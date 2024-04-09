import { MinesweeperTile } from "./minesweeper-tile.ts";
import { TileIndex } from "./tile-index.ts";

export type TileUpdate = {
    index: TileIndex;
    isCovered?: boolean;
    isFlagged?: boolean;
    isPressed?: boolean;
    isRevealed?: boolean;
    userError?: boolean;
};

/*
Function takes two tile updates and overrides the attributes of the first
with any attributes present in the second
*/
export function mergeTileUpdates(
    firstUpdate: TileUpdate,
    secondUpdate: TileUpdate
): void {
    // For each possible attribute a TileUpdate can have
    // Check if the second update has that attribute
    // If it does, override the first update's value for that attribute with the new one
    if (secondUpdate.isCovered !== undefined)
        firstUpdate.isCovered = secondUpdate.isCovered;
    if (secondUpdate.isFlagged !== undefined)
        firstUpdate.isFlagged = secondUpdate.isFlagged;
    if (secondUpdate.isPressed !== undefined)
        firstUpdate.isPressed = secondUpdate.isPressed;
    if (secondUpdate.isRevealed !== undefined)
        firstUpdate.isRevealed = secondUpdate.isRevealed;
    if (secondUpdate.userError !== undefined)
        firstUpdate.userError = secondUpdate.userError;
}

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
    if (update.isCovered !== undefined) newTile.isCovered = update.isCovered;
    if (update.isFlagged !== undefined) newTile.isFlagged = update.isFlagged;
    if (update.isPressed !== undefined) newTile.isPressed = update.isPressed;
    if (update.isRevealed !== undefined) newTile.isRevealed = update.isRevealed;
    if (update.userError !== undefined) newTile.userError = update.userError;

    return newTile;
}
