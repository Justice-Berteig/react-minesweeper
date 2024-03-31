import { MinesweeperDifficulty } from "./minesweeper-difficulty.ts";
import { TileIndex } from "./tile-index.ts";

export enum ActionType {
    RESET = 0,
    LCLICK = 1,
    RCLICK = 2,
}

export type MinesweeperAction = {
    type: ActionType;
    newDifficulty?: MinesweeperDifficulty | null;
    index?: TileIndex | null;
};
