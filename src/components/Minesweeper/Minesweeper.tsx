import { useReducer } from "react";
import Board from "./Board";
import DifficultySelect from "./DifficultySelect";
import {
    Action,
    Difficulty,
    MinesweeperState,
    MinesweeperAction,
    DifficultyLevel,
} from "./utils/types.ts";
import "./Minesweeper.css";

function reducer(
    prevState: MinesweeperState,
    action: MinesweeperAction
): MinesweeperState {
    switch (action.type) {
        case Action.RESET:
            if (action.newDifficulty) {
                // If a new difficulty was passed
                // Create a new state object with the new board settings
                return new MinesweeperState(action.newDifficulty);
            } else {
                return prevState;
            }
        case Action.LCLICK:
            if (action.index) {
                // If an index for the click was passed
                // Deep copy the previous state
                const newState = prevState.createDeepCopy();
                // Activate the tile that was clicked
                newState.activateTile(action.index);
                return newState;
            } else {
                return prevState;
            }
        case Action.RCLICK:
            if (action.index) {
                // If an index for the click was passed
                // Deep copy the previous state
                const newState = prevState.createDeepCopy();
                // Flag the tile that was clicked
                newState.flagTile(action.index);
                return newState;
            } else {
                return prevState;
            }
        default:
            return prevState;
    }
}

// Function to create intitial state for reducer
function reducerInit(difficulty: DifficultyLevel): MinesweeperState {
    return new MinesweeperState(new Difficulty(difficulty));
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
