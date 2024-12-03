export enum DifficultyLevel {
    BEGINNER = 0,
    INTERMEDIATE = 1,
    EXPERT = 2,
    CUSTOM = 3,
}

export class MinesweeperDifficulty {
    level: DifficultyLevel;
    width: number;
    height: number;
    startingMines: number;

    constructor(
        level: DifficultyLevel,
        width?: number,
        height?: number,
        startingMines?: number
    ) {
        this.level = level;
        // Set the difficulty's width, height, and starting mines based on difficulty level
        switch (level) {
            case DifficultyLevel.BEGINNER:
                this.width = 9;
                this.height = 9;
                this.startingMines = 10;
                break;
            case DifficultyLevel.INTERMEDIATE:
                this.width = 16;
                this.height = 16;
                this.startingMines = 40;
                break;
            case DifficultyLevel.EXPERT:
                this.width = 30;
                this.height = 16;
                this.startingMines = 99;
                break;
            case DifficultyLevel.CUSTOM:
                if (width && height && startingMines) {
                    this.width = width;
                    this.height = height;
                    this.startingMines = startingMines;
                } else {
                    this.width = 9;
                    this.height = 9;
                    this.startingMines = 10;
                }
                break;
            default:
                this.width = 9;
                this.height = 9;
                this.startingMines = 10;
                break;
        }
    }
}
