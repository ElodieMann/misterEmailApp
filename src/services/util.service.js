// util.service.js
function makeId(length = 5) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (daysDiff === 1) {
    return "Yesterday";
  } else {
    const date = new Date(timestamp);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
}

export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
};
