//email.service.js

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = "emails";
export const USER_STORAGE_KEY = "user";

async function initEmails() {
  try {
    const emails = await storageService.query(STORAGE_KEY);
    if (!emails || emails.length === 0) {
      const initialEmails = Array.from({ length: 40 }, (_, index) => ({
        id: utilService.makeId(),
        subject: `Subject ${index + 1}`,
        body: `Dear [Name],

I trust this message finds you well. We are delighted to extend an invitation to our annual event, scheduled for [date] at [venue]. This year, we have curated an exceptional program featuring renowned speakers, interactive workshops, and, of course, excellent networking opportunities.

Here's a quick overview of what you can expect at the event:

Inspiring Keynotes: Industry experts will share innovative ideas and enriching experiences during our keynote sessions.

Interactive Workshops: Engage in hands-on workshops designed to provide practical insights and skills.

Networking Opportunities: Connect with professionals and peers, fostering valuable connections within our community.

We believe this event will be a unique and enriching experience for you. Your presence will undoubtedly contribute to the success of the occasion.

Please RSVP by [RSVP deadline] to secure your spot. We look forward to welcoming you and sharing an enriching experience together.

Best regards,

`,
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
    const existingUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

    if (!existingUser || !existingUser.email) {
      const initialUser = {
        email: "user@appsus.com",
        fullname: "Mahatma Appsus",
      };

      const users = await storageService.query(USER_STORAGE_KEY);

      const userExists = users.some(user => user.email === initialUser.email);

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
