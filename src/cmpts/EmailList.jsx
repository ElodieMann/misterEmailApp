import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";

const EmailList = ({ setIsEmailClick, filter, emailData, setEmailData }) => {

  useEffect(() => {
    getAllEmail();
  }, [filter]);

  const getAllEmail = async () => {
    try {
      await emailService.initEmails();
      await emailService.initLoggedInUser();
      const data = await emailService.getAllEmail();

      const flattenedData = data.flat();

      const sortedData = flattenedData.sort((a, b) => b.sentAt - a.sentAt);

      if (filter === "starred") {
        const starredEmail = sortedData.filter((email) => email.isStarred);
        setEmailData(starredEmail);
      } else if (filter === "inbox") {
        const inboxEmails = sortedData.filter(
          (email) => !Boolean(email.removedAt)
        );
        setEmailData(inboxEmails);
      } else if (filter === "trash") {
        const inboxEmails = sortedData.filter((email) =>
          Boolean(email.removedAt)
        );
        setEmailData(inboxEmails);
      }
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  return (
    <section>
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
