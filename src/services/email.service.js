//email.service.js

import { storageService } from "./async-storage.service.js";
import { predefinedEmails } from "./email-models.js";

const STORAGE_KEY = "emails";
export const USER_STORAGE_KEY = "user";

async function initEmails() {
  try {
    // Clear the local storage for the storage key
    localStorage.removeItem(STORAGE_KEY);

    // Replace the local storage with the predefined emails
    await storageService.post(STORAGE_KEY, predefinedEmails);

    // Return the predefined emails
    return predefinedEmails;
  } catch (error) {
    console.error("Error initializing emails:", error);
    return [];
  }
}


async function initLoggedInUser() {
  try {
    const existingUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

    if (!existingUser || !existingUser.email) {
      const initialUser = {
        email: "user@appsus.com",
        fullname: "Mahatma Appsus",
      };

      const users = await storageService.query(USER_STORAGE_KEY);

      const userExists = users.some((user) => user.email === initialUser.email);

      if (!userExists) {
        await storageService.post(USER_STORAGE_KEY, initialUser);
      }
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
