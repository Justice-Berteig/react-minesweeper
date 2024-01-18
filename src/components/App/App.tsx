import Minesweeper from "../Minesweeper/";

function App() {
    return (
        <div className="app">
            <Minesweeper width={4} height={4} startingMines={4} />
        </div>
    );
}

export default App;
