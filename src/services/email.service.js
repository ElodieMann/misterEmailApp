//email.service.js

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = "emails";
const USER_STORAGE_KEY = "user";

async function initEmails() {
  try {
    const emails = await storageService.query(STORAGE_KEY);
    if (!emails || emails.length === 0) {
      const initialEmails = Array.from({ length: 40 }, (_, index) => ({
        id: utilService.makeId(),
        subject: `Subject ${index + 1}`,
        body: `Body text for email ${index + 1}`,
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from: `sender${index + 1}@example.com`,  
        to: "user@appsus.com",
      }));

      await storageService.post(STORAGE_KEY, initialEmails);
    }
  } catch (error) {
    console.error("Error initializing emails:", error);
  }
}


async function initLoggedInUser() {
  try {
    const loggedInUser = await storageService.get(USER_STORAGE_KEY);

    if (!loggedInUser || !loggedInUser.email) {
      const initialUser = {
        email: "user@appsus.com",
        fullname: "Mahatma Appsus",
      };

      await storageService.post(USER_STORAGE_KEY, initialUser);
    }
  } catch (error) {
    console.error("Error initializing logged-in user:", error);
  }
}

async function getAllEmail() {
  const user = await storageService.get(USER_STORAGE_KEY);
  const emails = await storageService.query(STORAGE_KEY);

  if (user && user.email) {
    return emails.filter((email) => email[0].to === user.email);
  } else {
    console.error("User is not defined or does not have an email property.");
    return [];
  }
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
  getAllEmail,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
};
