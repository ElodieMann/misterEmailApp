//email.service.js

import { storageService } from "./async-storage.service.js";
import { predefinedEmails } from "./email-models.js";

export const STORAGE_KEY = "emails";
export const USER_STORAGE_KEY = "user";
export const SENT_EMAILS_STORAGE_KEY = "sentEmails";
export const DRAFTS_STORAGE_KEY = "drafts";

async function initEmails() {
  try {
    const emails = await storageService.query(STORAGE_KEY);
    if (!emails || emails.length === 0) {
      await storageService.post(STORAGE_KEY, predefinedEmails);
    }
  } catch (error) {
    console.error("Error initializing emails:", error);
  }
}

async function initLoggedInUser() {
  try {
    const existingUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    if (existingUser) return;

    const initialUser = {
      email: "user@appsus.com",
      fullname: "Mahatma Appsus",
    };

    const users = await storageService.query(USER_STORAGE_KEY);

    const userExists = users?.some((user) => user.email === initialUser.email);

    if (!userExists) {
      await storageService.post(USER_STORAGE_KEY, initialUser);
    }
  } catch (error) {
    console.error("Error initializing logged-in user:", error);
  }
}

async function getAllEmail() {
  const user = await storageService.query(USER_STORAGE_KEY);
  const emails = await storageService.findUserEmails(STORAGE_KEY, user?.email);

  return emails?.filter((email) => email.to === user.email);
}
async function getEmailByFilter(filter) {
  const emails = await getAllEmail()
emails.filter
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


async function saveSentEmail(sentEmail) {
  return storageService.post(SENT_EMAILS_STORAGE_KEY, sentEmail);
}

async function getSentEmail(sentEmailId) {
  return storageService.get(SENT_EMAILS_STORAGE_KEY, sentEmailId);
}

async function saveDraft(draft) {
  return storageService.post(DRAFTS_STORAGE_KEY, draft);
}

async function getDraft(draftId) {
  return storageService.get(DRAFTS_STORAGE_KEY, draftId);
}

async function updateDraft(draft) {
  return storageService.put(DRAFTS_STORAGE_KEY, draft);
}


export const emailService = {
  initEmails,
  initLoggedInUser,
  getAllEmail,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
  saveSentEmail,
  getSentEmail,
  saveDraft,
  getDraft,
  updateDraft,
};
