/**
 * Promisified setTimeout
 * @param time
 * @returns {Promise}
 */
export default function timeout (time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}