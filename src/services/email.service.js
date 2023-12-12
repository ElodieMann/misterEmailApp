//email.service.js

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { predefinedEmails } from "./email-models.js";
import * as keys from "../config/keys.js";

async function initEmails() {
  try {
    const emails = await storageService.query(keys.STORAGE_KEY);
    if (!emails || emails.length === 0) {
      utilService.saveToStorage(keys.STORAGE_KEY, predefinedEmails);
      return predefinedEmails;
    }
    return emails;
  } catch (error) {
    console.error("Error initializing emails:", error);
  }
}

const initialUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

async function getAllEmail(filterBy) {
  const data = await initEmails();
  const emailsReceived = data?.filter(
    (email) => email.to === initialUser.email
  );
  const emailsSent = data?.filter((email) => email.to !== initialUser.email);

  if (!filterBy) return null;

  const { status = "inbox", txt, isRead = null } = filterBy;

  let dataDisplay;

  switch (status) {
    case keys.INBOX_FILTER:
      dataDisplay = emailsReceived.filter((email) => !email.removedAt);
      break;
    case keys.STARRED_FILTER:
      dataDisplay = data.filter(
        (email) => email.isStarred && !email.removedAt
      );
      break;
    case keys.TRASH_FILTER:
      dataDisplay = data.filter((email) => email.removedAt);
      break;
    case keys.SENT_FILTER:
      dataDisplay = emailsSent.filter(
        (email) => !email.isDraft && !email.removedAt
      );
      break;
    case keys.DRAFT_FILTER:
      dataDisplay = emailsSent.filter(
        (email) => email.isDraft && !email.removedAt
      );
      break;
    default:
      break;
  }

  if (txt && txt.trim() !== "") {
    const searchTerm = txt.toLowerCase();
    dataDisplay = dataDisplay.filter(
      (email) =>
        email.subject.toLowerCase().includes(searchTerm) ||
        email.body.toLowerCase().includes(searchTerm)
    );
  }

  if (isRead !== null) {
    dataDisplay = dataDisplay.filter((email) => email.isRead === isRead);
  }

  return dataDisplay;
}

function getDefaultFilter() {
  return {
    status: "inbox",
    txt: "",
    isRead: null,
  };
}

function getById(emailId) {
  return storageService.get(keys.STORAGE_KEY, emailId);
}

function newEmail(newEmail) {
  return storageService.post(keys.STORAGE_KEY, newEmail);
}

function updateEmail(updateEmail) {
  return storageService.put(keys.STORAGE_KEY, updateEmail);
}
function removeEmail(emailId) {
  return storageService.remove(keys.STORAGE_KEY, emailId);
}
function removeFromLocalStorage(emailId) {
  return storageService.removeFromLocalStorage(keys.STORAGE_KEY, emailId);
}

export const emailService = {
  getAllEmail,
  getDefaultFilter,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
  removeFromLocalStorage,
};
