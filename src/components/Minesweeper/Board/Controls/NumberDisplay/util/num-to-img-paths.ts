/*
Function takes a number and an amount of digits. The number is converted
into a set of image paths that will display that number. The number of
image paths will be the same as the given number of digits.
*/
export function numToImgPaths(number: number, digits: number): string[] {
    const imgPaths: string[] = [];

    // Find min and max values based on number of allowed digits
    const minValue: number = (Math.pow(10, digits - 1) - 1) * -1; // Use digits - 1 to account for negative symbol
    const maxValue: number = Math.pow(10, digits) - 1;

    // Clamp the number between the min and max
    number = Math.min(Math.max(number, minValue), maxValue);

    // Convert number to a string
    const stringNumber = number.toString();
    for (const char of stringNumber) {
        // For each character in the string
        // Get the path to the image representing that character and add it to the list of image paths
        imgPaths.push(charToImgPath(char));
    }

    while (imgPaths.length < digits) {
        // While there are less image paths than there should be digits
        // Add the path for an inactive digit to the start of the array
        imgPaths.unshift("/number-display-inactive.svg");
    }

    return imgPaths;
}

/*
Function takes a single character and returns the image path
for the image displaying that character. If there is no image
to display the character, the path to an image for an inactive
number display is provided instead.
*/
function charToImgPath(char: string): string {
    if (char === "0") {
        return "/number-display-zero.svg";
    } else if (char === "1") {
        return "/number-display-one.svg";
    } else if (char === "2") {
        return "/number-display-two.svg";
    } else if (char === "3") {
        return "/number-display-three.svg";
    } else if (char === "4") {
        return "/number-display-four.svg";
    } else if (char === "5") {
        return "/number-display-five.svg";
    } else if (char === "6") {
        return "/number-display-six.svg";
    } else if (char === "7") {
        return "/number-display-seven.svg";
    } else if (char === "8") {
        return "/number-display-eight.svg";
    } else if (char === "9") {
        return "/number-display-nine.svg";
    } else if (char === "-") {
        return "/number-display-negative.svg";
    } else {
        return "/number-display-inactive.svg";
    }
}
