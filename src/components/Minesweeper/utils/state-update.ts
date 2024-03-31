import { MinesweeperState } from "./minesweeper-state.ts";
import { revealMines } from "./reveal-mines.ts";
import { TileIndex } from "./tile-index.ts";
import { TileUpdate, updateTile } from "./tile-update.ts";

export class StateUpdate {
    private tileUpdates: TileUpdate[];

    constructor() {
        this.tileUpdates = [];
    }

    /*
    Function takes a tile index and returns any existing tile update for that tile.
    If no tile update exists for that tile, returns null instead;
    */
    public getUpdateFor(index: TileIndex): TileUpdate | null {
        for (const tileUpdate of this.tileUpdates) {
            // For each existing tile update
            if (
                tileUpdate.index.x === index.x &&
                tileUpdate.index.y === index.y
            ) {
                // If the existing tile update is for the tile at the given index
                // Return that tile update
                return tileUpdate;
            }
        }

        // If none of the existing tile updates are for the tile at the given index
        // Return null
        return null;
    }

    /*
    Function takes a tile update object and adds it to the list of tile updates.
    If a tile update object already exists in the list, the given update is merged with the existing one.
    */
    public updateTile(tileUpdate: TileUpdate): void {
        // console.log("BEFORE:");
        // console.log([...this.tileUpdates]);
        // Try to get existing tile update with same index
        const existingTileUpdate = this.getUpdateFor(tileUpdate.index);

        if (existingTileUpdate !== null) {
            // If an existing update was found
            // Merge given update with existing update
            if (tileUpdate.isFlagged !== undefined)
                existingTileUpdate.isFlagged = tileUpdate.isFlagged;
            if (tileUpdate.isRevealed !== undefined)
                existingTileUpdate.isRevealed = tileUpdate.isRevealed;
            if (tileUpdate.userError !== undefined)
                existingTileUpdate.userError = tileUpdate.userError;
        } else {
            // Else add the tile update to the list
            this.tileUpdates.push(tileUpdate);
        }
        // console.log("AFTER:");
        // console.log([...this.tileUpdates]);
    }

    /*
    Function to get the list of tile update objects
    */
    public getTileUpdates(): TileUpdate[] {
        return this.tileUpdates;
    }
}

/*
Function takes a state object and a state update object
and returns a new state object with the changes from the update object applied.
Does not make any changes to the original state object.
*/
export function updateState(
    prevState: MinesweeperState,
    update: StateUpdate
): MinesweeperState {
    // Create shallow copy of current state
    const newState = prevState.createShallowCopy();

    // Create list to store indeces of columns that contain updated tiles
    const updatedColumns: number[] = [];
    // Doing some weird stuff here so that updates added to the list of
    // tile updates will actually be updated this is weird and bad I don't like it
    const tileUpdates = update.getTileUpdates();
    let i = 0;
    while (i < tileUpdates.length) {
        const tileUpdate = tileUpdates[i];
        // for (const tileUpdate of update.getTileUpdates()) {
        // For each of the tile updates
        // Get the column index of the current tile update
        const colIndex = tileUpdate.index.x;
        if (!updatedColumns.includes(colIndex)) {
            // If the current tile update is in a column that has not yet been updated
            // Add the column index to the list of updated columns
            updatedColumns.push(colIndex);
            // Shallow copy the column
            newState.tiles[colIndex] = [...newState.tiles[colIndex]];
        }

        // Now that the column has been shallow copied
        // Copy and update the tile
        const updatedTile = updateTile(
            newState.tiles[tileUpdate.index.x][tileUpdate.index.y],
            tileUpdate
        );
        // Replace old tile with updated tile
        newState.tiles[colIndex].splice(tileUpdate.index.y, 1, updatedTile);

        // Update number of remaining flags
        if (tileUpdate.isFlagged === true) {
            newState.remainingFlags--;
        } else if (tileUpdate.isFlagged === false) {
            newState.remainingFlags++;
        }

        // Update number of revealed tiles
        if (tileUpdate.isRevealed === true) {
            newState.revealedTiles++;
        }

        if (!newState.isStarted) {
            // If the game has not started yet
            if (updatedTile.isRevealed) {
                // If the game should start
                // Start the game
                newState.isStarted = true;
            }
        }

        if (!newState.isEnded) {
            // If the game has not ended yet
            if (updatedTile.isRevealed && updatedTile.hasMine) {
                // If a mine was exploded
                // End the game
                newState.isEnded = true;
                // Reveal all the mines
                revealMines(newState, update);
            } else if (
                newState.difficulty.startingMines ===
                newState.difficulty.width * newState.difficulty.height -
                    newState.revealedTiles
            ) {
                // If all tiles without mines have been revealed
                // End the game as a win
                newState.isEnded = true;
                newState.isWon = true;
            }
        }

        i++;
    }

    return newState;
}
