//email.service.js

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = "emails";
const USER_STORAGE_KEY = "user";

function initEmails() {
  const emails = storageService.query(STORAGE_KEY, utilService);
  if (!emails || emails.length === 0) {
    const initialEmails = [
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
    ];

    storageService.post(STORAGE_KEY, initialEmails, utilService);
  }
}

function initLoggedInUser() {
  const loggedInUser = storageService.get(USER_STORAGE_KEY, utilService);
  if (!loggedInUser) {
    const initialUser = {
      email: "user@appsus.com",
      fullname: "Mahatma Appsus",
    };

    storageService.post(USER_STORAGE_KEY, initialUser, utilService);
  }
}

function getAllEmails() {
  const user = storageService.get(USER_STORAGE_KEY, utilService);
  const emails = storageService.query(STORAGE_KEY, utilService);
  return emails.filter((email) => email.to === user.email);
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

export const emailService = {
  initEmails,
  initLoggedInUser,
  getAllEmails,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
};
