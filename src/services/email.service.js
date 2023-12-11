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
  let emails = data?.filter((email) => email.to === initialUser.email);

  if (filterBy) {
    const { status = "inbox", txt, isRead = null } = filterBy;

    if (status === "inbox") {
      emails = emails.filter((email) => email.removedAt === null);
    } else if (status === "starred") {
      emails = emails.filter((email) => email.isStarred);
    } else if (status === "trash") {
      emails = emails.filter((email) => email.removedAt !== null);
    }

    if (txt && txt.trim() !== "") {
      const searchTerm = txt.toLowerCase();
      emails = emails.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchTerm) ||
          email.body.toLowerCase().includes(searchTerm)
      );
    }

    if (isRead !== null) {
      emails = emails.filter((email) => email.isRead === isRead);
    }
  }

  return emails;
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

export const emailService = {
  initEmails,
  getAllEmail,
  getDefaultFilter,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
};
