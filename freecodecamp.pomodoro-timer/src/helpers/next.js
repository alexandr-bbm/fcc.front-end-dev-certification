/**
 * Returns the object from db, following the object with key.
 * @param db object {KEY1: {}, KEY2: {}, ...}
 * @param key string
 * @returns {*}
 */
export default function next (db, key) {
    const keys = Object.keys(db),
          i = keys.indexOf(key);
    if (! keys[i + 1]) return db[keys[0]];
    return i !== -1 && keys[i + 1] && db[keys[i + 1]];
};