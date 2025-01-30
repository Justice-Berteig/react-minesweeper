import { useReducer, useState } from "react";

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
import StyleSelect from "./StyleSelect/StyleSelect.tsx";

/*
Reducer function takes the previous MinesweeperState and a MinesweeperAction
then returns a new updated MinesweeperState based on the action that was passed
*/
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

/*
Minesweeper component contains the Minesweeper board
as well as any additional settings for the game
*/
function Minesweeper() {
    // Setup initial state with default difficulty of beginner
    const [state, dispatch] = useReducer(
        reducer,
        DifficultyLevel.BEGINNER,
        reducerInit
    );

    // State for the scale and brightness of the minesweeper board
    const [boardScale, setBoardScale] = useState<string>("100%");
    const [boardBrightness, setBoardBrightness] = useState<string>("100%");

    return (
        <div className="minesweeper" onContextMenu={(e) => e.preventDefault()}>
            <div className="settings">
                <DifficultySelect dispatch={dispatch} />
                <StyleSelect
                    boardScale={boardScale}
                    setBoardScale={setBoardScale}
                    boardBrightness={boardBrightness}
                    setBoardBrightness={setBoardBrightness}
                />
            </div>
            <Board
                brightness={boardBrightness}
                scale={boardScale}
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
}

export default Minesweeper;
