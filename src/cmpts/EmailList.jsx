import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";

const EmailList = ({ setIsEmailClick, filter, showEmailUnread }) => {
  const [emailData, setEmailData] = useState([]);

  console.log(emailData);
  useEffect(() => {
    getAllEmail();
  }, [filter, showEmailUnread]);

  const getAllEmail = async () => {
    try {
      await emailService.initEmails();
      await emailService.initLoggedInUser();
      const data = await emailService.getAllEmail();

      if (filter === "starred") {
        const starredEmail = data.filter((email) => email.isStarred);
        setEmailData(starredEmail);
      } else if (filter === "inbox") {
        const inboxEmails = data.filter((email) => !Boolean(email.removedAt));
        setEmailData(inboxEmails);
      } else if (filter === "trash") {
        const inboxEmails = data.filter((email) => Boolean(email.removedAt));
        setEmailData(inboxEmails);
      }

      if (showEmailUnread === 'unread') {
        const unReadEmail = data.filter((email) => Boolean(!email.isRead));
        setEmailData(unReadEmail);
      } else if (showEmailUnread === 'read'){
        const readEmail = data.filter((email) => Boolean(email.isRead));
        setEmailData(readEmail);
      }
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  const sortByDate = () => {
    const flattenedData = emailData.flat();
    const sortedData = flattenedData.sort((a, b) => b.sentAt - a.sentAt);
    setEmailData(sortedData);
  };

  const sortByTitle = () => {
    const flattenedData = emailData.flat();
    const sortedData = [...flattenedData].sort((a, b) =>
      a.subject.localeCompare(b.subject)
    );
    setEmailData(sortedData);
  };

  return (
    <section>
      <button onClick={sortByDate}>Date</button>
      <button onClick={sortByTitle}>Title</button>

      {emailData.length > 0 ? (
        emailData.map((email) => (
          <div key={email.id}>
            <EmailPreview
              key={email.id}
              email={email}
              setIsEmailClick={setIsEmailClick}
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default EmailList;
