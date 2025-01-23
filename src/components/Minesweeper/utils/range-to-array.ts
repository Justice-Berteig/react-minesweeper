export function rangeToArray(
    minValue: number,
    maxValue: number,
    increment: number
): number[] {
    const array: number[] = [];

    for (let i = minValue; i <= maxValue; i += increment) {
        array.push(i);
    }

    return array;
}
