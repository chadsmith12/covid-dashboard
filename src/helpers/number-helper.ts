/**
 * gets the number of digits that are in this positive number
 * @param number The number to get the digits for. This must be a positive number
 */
export function getNumberDigits(number: number) {
    const length = Math.log(number) * Math.LOG10E + 1 | 0;

    return length;
}

export function getFirstDigit(number: number) {
    // remove the last digit from the number till only one digit is left
    while (number > 10) {
        number /= 10;
    }

    return number;
}