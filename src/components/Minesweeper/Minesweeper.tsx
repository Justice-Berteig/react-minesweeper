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

let incremenetMS: number = 0;

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
                // Activate the tile that was clicked
                prevState.activateTile(action.index);
                return prevState.cloneState();
            } else {
                return prevState;
            }
        case Action.RCLICK:
            if (action.index) {
                incremenetMS++;
                // If an index for the click was passed
                // Flag the tile that was clicked
                prevState.flagTile(action.index);
                return prevState.cloneState();
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
            <p>{"" + state.tiles[0][0].isFlagged}</p>
            <DifficultySelect dispatch={dispatch} />
            <Board state={state} dispatch={dispatch} />
        </div>
    );
}

export default Minesweeper;
