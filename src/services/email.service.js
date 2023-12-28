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
  const emails = await initEmails();

  if (!filterBy) return emails;


  let filteredEmails = emails;

  switch (filterBy.status) {
    case keys.INBOX_FILTER:
      filteredEmails = emails.filter(
        (email) => email.to === initialUser.email && !email.removedAt
      );
      break;
    case keys.STARRED_FILTER:
      filteredEmails = emails.filter((email) => email.isStarred && !email.removedAt);
      break;
    case keys.TRASH_FILTER:
      filteredEmails = emails.filter((email) => email.removedAt);
      break;
    case keys.SENT_FILTER:
      filteredEmails = emails.filter(
        (email) =>
          email.to !== initialUser.email && !email.isDraft && !email.removedAt
      );

      break;
    case keys.DRAFT_FILTER:
      filteredEmails = emails.filter(
        (email) =>
          email.to !== initialUser.email && email.isDraft && !email.removedAt
      );
      break;
    default:
      break;
  }

  if (filterBy.sortByDate) {
    let sortedData = [...filteredEmails]
      .flat()
      .sort((a, b) => b.sentAt - a.sentAt);
      filteredEmails = sortedData;
  } else if (filterBy.sortBySubject) {
    let sortedData = [...filteredEmails]
      .flat()
      .sort((a, b) => a.subject.localeCompare(b.subject));
      filteredEmails = sortedData;
  }

  console.log(filterBy);
  if (filterBy.txt && filterBy.txt.trim() !== "") {
    const searchTerm = new RegExp(
      filterBy.txt
        .trim()
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    filteredEmails = filteredEmails.filter(
      (email) =>
        searchTerm.test(email.subject.toLowerCase()) ||
        searchTerm.test(email.body.toLowerCase()) ||
        searchTerm.test(email.from.toLowerCase())
    );
  }


  if (filterBy.isRead !== null) {
    filteredEmails = filteredEmails.filter(email => email.isRead === filterBy.isRead);
  }

  return filteredEmails;
}

function getDefaultFilter() {
  return {
    status: "",
    txt: "",
    isRead: null,

  };
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};

  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];
  }

  return filterBy;
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
  getFilterFromSearchParams,
  newEmail,
  getById,
  updateEmail,
  removeEmail,
  removeFromLocalStorage,
};
