import { MinesweeperDifficulty } from "./minesweeper-difficulty.ts";
import { TileIndex } from "./tile-index.ts";

export enum ActionType {
    RESET = 0,
    REVEAL_TILE = 1,
    FLAG_TILE = 2,
    PRESS_TILE = 3,
    RELEASE_TILE = 4,
}

export type MinesweeperAction = {
    type: ActionType;
    newDifficulty?: MinesweeperDifficulty | null;
    index?: TileIndex | null;
};
