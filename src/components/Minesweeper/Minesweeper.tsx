import { useReducer } from "react";
import Board from "./Board";
import DifficultySelect from "./DifficultySelect";
import { ActionType, MinesweeperAction } from "./utils/minesweeper-action.ts";
import {
    DifficultyLevel,
    MinesweeperDifficulty,
} from "./utils/minesweeper-difficulty.ts";
import { MinesweeperState } from "./utils/minesweeper-state.ts";
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
        case ActionType.LCLICK:
            if (action.index) {
                // If an index for the click was passed
                // Activate the tile that was clicked
                return prevState.activateTile(action.index);
            } else {
                return prevState;
            }
        case ActionType.RCLICK:
            if (action.index) {
                // If an index for the click was passed
                // Flag the tile that was clicked
                return prevState.flagTile(action.index);
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
        <div className="minesweeper">
            <DifficultySelect dispatch={dispatch} />
            <Board state={state} dispatch={dispatch} />
        </div>
    );
}

export default Minesweeper;
