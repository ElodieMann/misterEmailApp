//email.service.js

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = "emails";

function getAllEmails() {
  return storageService.query(STORAGE_KEY);
}

function getById(emailId) {
  return storageService.get(STORAGE_KEY, emailId);
}

function newEmail(newEmail) {
  return storageService.post(STORAGE_KEY, newEmail);
}

function updateEmail(updateEmail) {
  return storageService.put(STORAGE_KEY, updateEmail);
}
function removeEmail(emailId) {
  return storageService.remove(STORAGE_KEY, emailId);
}

export const robotService = {
  getAllEmails,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
};
