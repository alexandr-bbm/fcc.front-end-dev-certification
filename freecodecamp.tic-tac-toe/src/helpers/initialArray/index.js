/**
 *
 * @param length Length of the resulting array.
 * @param value Value to be inserted in each array element.
 *
 * @returns Array
 */
export default function initialArray (length, value) {
    return [...Array(length)].map((x) => value)
}