export const localStorageSetItem = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
};

export const localStorageSetToken = (key, value) => {
    return localStorage.setItem(key, value)
}

export const localStorageGetItem = (key) => {
    if (key !== null) {
        if (key === "token") {
            return localStorage.getItem(key)
        } else {
            return JSON.parse(localStorage.getItem(key))
        }
    } else {
        return null
    }
};
