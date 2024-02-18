// import {
//     Difficulty,
//     MinesweeperState,
//     MinesweeperTile,
//     TileIndex,
// } from "./types.ts";

// export function createMinesweeperState(
//     difficulty: Difficulty
// ): MinesweeperState {
//     const state: MinesweeperState = {
//         difficulty: difficulty,
//         isEnded: false,
//         isStarted: false,
//         isWon: false,
//         remainingMines: difficulty.startingMines,
//         tiles: initializeTiles(
//             difficulty.width,
//             difficulty.height,
//             difficulty.startingMines
//         ),
//     };

//     return state;
// }

// export function cloneState(oldState: MinesweeperState): MinesweeperState {
//     const state: MinesweeperState = {
//         difficulty: oldState.difficulty,
//         isEnded: oldState.isEnded,
//         isStarted: oldState.isStarted,
//         isWon: oldState.isWon,
//         remainingMines: oldState.remainingMines,
//         tiles: oldState.tiles,
//     };

//     return state;
// }

// /*
// Function takes a width, height, and number of starting mines and creates
// a two dimensional array of MinesweeperTiles with the given width and height,
// then distributes the given number of starting mines randomly among the MinesweeperTiles
// */
// function initializeTiles(
//     width: number,
//     height: number,
//     startingMines: number
// ): MinesweeperTile[][] {
//     //Initialize tile array
//     let tiles: MinesweeperTile[][] = [];

//     // Fill tile array with empty tiles
//     for (let x = 0; x < width; x++) {
//         const tileColumn: MinesweeperTile[] = [];
//         for (let y = 0; y < height; y++) {
//             tileColumn.push(new MinesweeperTile(x, y));
//         }
//         tiles.push(tileColumn);
//     }

//     // Add mines
//     addMinesToTiles(startingMines, tiles);
//     // Get adjacent mine count for each tile
//     setAdjacentMinesFor(tiles);

//     return tiles;
// }

// /*
// Function takes some number of mines, and a two dimensional array of MinesweeperTiles
// and randomly distributes that number of mines in the array of MinesweeperTiles
// */
// function addMinesToTiles(mines: number, tiles: MinesweeperTile[][]): void {
//     // Create array holding all the indeces for empty tiles
//     // (all tiles are empty at first so array will hold indeces for all tiles)
//     const emptyTileIndeces: TileIndex[] = [];
//     // For each tile in the array
//     for (let x = 0; x < tiles.length; x++) {
//         const tileColumn: MinesweeperTile[] = tiles[x];
//         for (let y = 0; y < tileColumn.length; y++) {
//             const tile = tileColumn[y];
//             emptyTileIndeces.push(tile.index);
//         }
//     }

//     // While there are still mines left to place
//     while (mines > 0) {
//         // Get a random tile index and remove it from the list of empty tile indeces
//         const index: TileIndex = emptyTileIndeces.splice(
//             Math.floor(Math.random() * emptyTileIndeces.length),
//             1
//         )[0];
//         // Add a mine to that tile
//         tiles[index.x][index.y].hasMine = true;
//         // Remove a mine
//         mines--;
//     }
// }

// /*
// Function takes a two dimensional array of MinesweeperTiles and sets the number of adjacent mines
// for each of those tiles equal to the number of mines adjacent to that tile
// */
// function setAdjacentMinesFor(tiles: MinesweeperTile[][]): void {
//     // For each tile in the array
//     for (let x = 0; x < tiles.length; x++) {
//         const tileColumn: MinesweeperTile[] = tiles[x];
//         for (let y = 0; y < tileColumn.length; y++) {
//             const tile = tileColumn[y];
//             // Set the number of adjacent mines;
//             tile.adjacentMines = getAdjacentMinesFor(tile.index, tiles);
//         }
//     }
// }

// /*
// Function takes a two dimensional array of MinesweeperTiles and an index for a tile in that array
// and returns the number of mines adjacent to that tile
// */
// function getAdjacentMinesFor(
//     index: TileIndex,
//     tiles: MinesweeperTile[][]
// ): number {
//     let adjacentMines: number = 0;

//     // For each adjacent tile
//     for (let x = index.x - 1; x <= index.x + 1; x++) {
//         for (let y = index.y - 1; y <= index.y + 1; y++) {
//             if (x === index.x && y === index.y) {
//                 // If the tile we are getting mines for is being checked
//                 // Skip it
//                 continue;
//             }
//             if (x >= 0 && x < tiles.length && y >= 0 && y < tiles[x].length) {
//                 // If the x and y are within bounds of the array and the x and y indeces are not the same as the original tile's
//                 if (tiles[x][y].hasMine) {
//                     // If the tile has a mine
//                     // Increment number of adjacent mines
//                     adjacentMines++;
//                 }
//             }
//         }
//     }

//     return adjacentMines;
// }

// /*
// Function takes the index of a MinesweeperTile and a two dimensional array of MinesweeperTiles
// then activates the tile at the given index
// If the tile has not been revealed the tile is revealed
// If the tile is revealed and the tile is satisfied it also activates all adjacent non-flagged tiles
// If the tile has no adjacent mines it also activates all adjacent tiles
// If the activated tile has a mine the game is ended
// */
// export function activateTile(
//     index: TileIndex,
//     tiles: MinesweeperTile[][]
// ): void {}

// /*
// Function takes the index of a MinesweeperTile and a two dimensional array of MinesweeperTiles
// then flags the tile at the given index
// If the tile is already flagged it gets un-flagged
// If the tile is revealed, it does not get flagged
// */
// export function flagTile(index: TileIndex, tiles: MinesweeperTile[][]): void {}
