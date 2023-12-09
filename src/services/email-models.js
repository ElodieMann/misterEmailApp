// email-models.js

import { utilService } from "./util.service.js";

export const predefinedEmails = [
  {
    id: utilService.makeId(),
    subject: "Meeting Invitation",
    body: `Dear John,

I hope this email finds you well. We would like to invite you to a meeting on ${new Date().toLocaleDateString()} at 10:00 AM. Please let us know if you can attend.

Best regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1555200,
    removedAt: null,
    from: "sender1@gmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Project Update",
    body: `Hello Alice,

I wanted to provide you with an update on the project. We've made significant progress, and I'd like to discuss the next steps with you. Please let me know when you're available for a meeting.

Thank you,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 86400000,
    removedAt: null,
    from: "fefe@hotmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Job Interview Invitation",
    body: `Dear Bob,

We are pleased to invite you for a job interview on ${new Date().toLocaleDateString()} at 2:30 PM. Please come prepared with your resume and any relevant documents.

Best regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 172800000,
    removedAt: null,
    from: "dedef@gmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Holiday Greetings",
    body: `Dear Emily,

Wishing you a joyous holiday season and a happy New Year! May the coming year bring you success and happiness.

Warm regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 259200000,
    removedAt: null,
    from: "elodie@hot.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Conference Invitation",
    body: `Dear Alex,

You are invited to speak at our upcoming conference on ${new Date().toLocaleDateString()} at 3:00 PM. Please confirm your availability.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 345600000,
    removedAt: null,
    from: "sender@yahoo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Product Launch Announcement",
    body: `Hi Olivia,

We are excited to announce the launch of our new product on ${new Date().toLocaleDateString()}. Join us for the launch event at 6:00 PM.

Best,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 432000000,
    removedAt: null,
    from: "lisa566@gmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Feedback Request",
    body: `Hello Michael,

We value your opinion! Could you please provide feedback on our recent service? Your input is important to us.

Thank you,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 518400000,
    removedAt: null,
    from: "ueiu@hotmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Webinar Invitation",
    body: `Dear Sophia,

You are invited to our upcoming webinar on ${new Date().toLocaleDateString()} at 11:00 AM. Register now to secure your spot.

Regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 604800000,
    removedAt: null,
    from: "sender8@yahoo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Networking Event",
    body: `Hi Daniel,

Join us for a networking event on ${new Date().toLocaleDateString()} at 7:00 PM. This is a great opportunity to connect with industry professionals.

Best regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 691200000,
    removedAt: null,
    from: "der@dede.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Birthday Wishes",
    body: `Dear Chloe,

Happy Birthday! Wishing you a fantastic day filled with joy and laughter.

Warm wishes,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 777600000,
    removedAt: null,
    from: "qwert@gmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Job Offer",
    body: `Hello Ethan,

We are pleased to offer you the position of [Job Title] at our company. Please let us know your decision by [Offer Deadline].

Best,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 864000000,
    removedAt: null,
    from: "lop98@aol.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Product Demo Request",
    body: `Hi Madison,

We received your inquiry about our product. Would you be interested in a live demo? Let us know your availability.

Thank you,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 950400000,
    removedAt: null,
    from: "hfuehfeuh@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Team Building Event",
    body: `Dear Mason,

Get ready for our team building event on ${new Date().toLocaleDateString()} at 4:30 PM. It promises to be a fun and collaborative experience.

Regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1036800000,
    removedAt: null,
    from: "fegrghyhjyt@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "New Project Kickoff",
    body: `Hello Aria,

We're excited to kick off the new project on ${new Date().toLocaleDateString()} at 9:00 AM. Your participation is crucial to its success.

Best,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1123200000,
    removedAt: null,
    from: "fe@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Volunteer Opportunity",
    body: `Hi Samuel,

We have a volunteering opportunity on ${new Date().toLocaleDateString()}. Join us in making a positive impact in the community.

Regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1209600000,
    removedAt: null,
    from: "sender15@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Seminar Registration Confirmation",
    body: `Dear Grace,

Thank you for registering for our seminar on ${new Date().toLocaleDateString()} at 1:00 PM. We look forward to your participation.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1296000000,
    removedAt: null,
    from: "sender16@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Book Club Meeting Reminder",
    body: `Hello Leo,

This is a reminder for our book club meeting on ${new Date().toLocaleDateString()} at 6:30 PM. Don't forget to bring your book!

Best regards,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1382400000,
    removedAt: null,
    from: "sender17@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Customer Appreciation Day",
    body: `Dear Lily,

Join us for Customer Appreciation Day on ${new Date().toLocaleDateString()} at 12:00 PM. We want to express our gratitude for your continued support.

Thank you,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1468800000,
    removedAt: null,
    from: "sender18@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Special Offer Inside!",
    body: `Hi Christopher,

We have a special offer waiting for you! Check it out now and enjoy exclusive discounts.

Best,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1555200000,
    removedAt: null,
    from: "sender19@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Thank You for Your Feedback",
    body: `Dear Isabella,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1641600000,
    removedAt: null,
    from: "sender20@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Latest",
    body: `Dear Isabella,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1555200000,
    removedAt: null,
    from: "cdsjhbvsdj@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Latest2",
    body: `Dear Isabella,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now(),
    removedAt: null,
    from: "cdsjhbvsdj@example.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Hi",
    body: `Dear Isabella,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 15552000,
    removedAt: null,
    from: "hey@gm.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Hi you",
    body: `Dear Isabella,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1555200005,
    removedAt: null,
    from: "hey@gm.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Hi how are you ?",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1555200,
    removedAt: null,
    from: "gtrgrtgtr@gm.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Hi how are you, Are you going ?",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now(),
    removedAt: null,
    from: "cv@gmail.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Oh no! ?",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 3 * 60 * 60 * 1000,
    removedAt: null,
    from: "cfrrfv@yo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Heu John",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 1 * 60 * 60 * 1000,
    removedAt: null,
    from: "cfrrfv@yo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Heu Sarah",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() - 2 * 60 * 60 * 1000,
    removedAt: null,
    from: "cfrrfv@yo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Heu Ariel & Ilay",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() ,
    removedAt: null,
    from: "cfrrfv@yo.com",
    to: "user@appsus.com",
  },
  {
    id: utilService.makeId(),
    subject: "Heu Ariel & Ilay",
    body: `Dear u,

Thank you for providing feedback on our recent service. Your input is invaluable and helps us improve.

Sincerely,
Sender`,
    isRead: false,
    isStarred: false,
    sentAt: Date.now() ,
    removedAt: null,
    from: "cfrrfv@yo.com",
    to: "user@appsus.com",
  },
];
