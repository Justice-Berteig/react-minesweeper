import { useReducer } from "react";

// Component imports
import Board from "./Board";
import DifficultySelect from "./DifficultySelect";

// Type imports
import { ActionType, MinesweeperAction } from "./utils/minesweeper-action.ts";
import { MinesweeperState } from "./utils/minesweeper-state.ts";

// Utility imports
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "./utils/minesweeper-difficulty.ts";

// Stylesheet imports
import "./Minesweeper.css";

function reducer(
    prevState: MinesweeperState,
    action: MinesweeperAction
): MinesweeperState {
    switch (action.type) {
        case ActionType.RESET:
            if (action.newDifficulty) {
                // If a new difficulty was passed
                // Create a new state object with the new board settings
                return new MinesweeperState(action.newDifficulty);
            } else {
                return prevState;
            }
        case ActionType.REVEAL_TILE:
            if (action.index) {
                // If an index for the click was passed
                // REveal the tile that was clicked
                return prevState.revealTile(action.index);
            } else {
                return prevState;
            }
        case ActionType.FLAG_TILE:
            if (action.index) {
                // If an index for the click was passed
                // Flag the tile that was clicked
                return prevState.flagTile(action.index);
            } else {
                return prevState;
            }
        case ActionType.PRESS_TILE:
            if (action.index) {
                // If an index for the press was passed
                // Press the tile that was pressed
                return prevState.pressTile(action.index);
            } else {
                return prevState;
            }
        case ActionType.RELEASE_TILE:
            if (action.index) {
                // If an index for the release was passed
                // Release the tile that was release
                return prevState.releaseTile(action.index);
            } else {
                return prevState;
            }
        default:
            return prevState;
    }
}

// Function to create intitial state for reducer
function reducerInit(difficulty: DifficultyLevel): MinesweeperState {
    return new MinesweeperState(new MinesweeperDifficulty(difficulty));
}

function Minesweeper() {
    const [state, dispatch] = useReducer(
        reducer,
        DifficultyLevel.BEGINNER,
        reducerInit
    );

    return (
        <div className="minesweeper" onContextMenu={(e) => e.preventDefault()}>
            <DifficultySelect dispatch={dispatch} />
            <Board state={state} dispatch={dispatch} />
        </div>
    );
}

export default Minesweeper;
