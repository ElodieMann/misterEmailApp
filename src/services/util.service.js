// util.service.js
function makeId(length = 5) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

}

function loadFromStorage(key, defaultValue = null) {
    const value = localStorage.getItem(key) || JSON.stringify(defaultValue);
    return JSON.parse(value);
}


export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage
}
