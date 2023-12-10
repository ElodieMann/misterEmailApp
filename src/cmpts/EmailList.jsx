import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";
import * as keys from '../config/keys.js'

const EmailList = ({ setIsEmailClick, filter, showEmailUnread, inputSearch }) => {
  const [initialEmailData, setInitialEmailData] = useState([]);
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    getAllEmail();
  }, [filter, showEmailUnread, inputSearch]);

  const filterByStarred = (data) => data.filter((email) => email.isStarred);
  const filterByInbox = (data) => data.filter((email) => !Boolean(email.removedAt));
  const filterByTrash = (data) => data.filter((email) => Boolean(email.removedAt));
  const filterByUnread = (data) => data.filter((email) => !email.isRead);
  const filterByRead = (data) => data.filter((email) => email.isRead);

  const getAllEmail = async () => {
    try {
      await emailService.initEmails();
      await emailService.initLoggedInUser();
      const data = await emailService.getAllEmail();

      let filteredData = data;

      switch (filter) {
        case keys.STARRED_FILTER:
          filteredData = filterByStarred(data);
          break;
        case keys.INBOX_FILTER:
          filteredData = filterByInbox(data);
          break;
        case keys.TRASH_FILTER:
          filteredData = filterByTrash(data);
          break;
        default:
          filteredData = filterByInbox(data);
      }

      switch (showEmailUnread) {
        case keys.UNREAD_FILTER:
          filteredData = filterByUnread(filteredData);
          break;
        case keys.READ_FILTER:
          filteredData = filterByRead(filteredData);
          break;
        default:
      }

      if (inputSearch) {
        filteredData = filteredData.filter((email) =>
          email.subject.toLowerCase().includes(inputSearch.toLowerCase()) ||
          email.body.toLowerCase().includes(inputSearch.toLowerCase()) ||
          email.from.toLowerCase().includes(inputSearch.toLowerCase())
        );
      }

      // Stocker la version initiale des e-mails
      setInitialEmailData(data);
      setEmailData(filteredData);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  const resetSearch = () => {
    setEmailData(initialEmailData);
  };

  const sortByDate = () => {
    const flattenedData = emailData.flat();
    const sortedData = flattenedData.sort((a, b) => b.sentAt - a.sentAt);
    setEmailData(sortedData);
  };

  const sortByTitle = () => {
    const flattenedData = emailData.flat();
    const sortedData = flattenedData.sort((a, b) =>
      a.subject.localeCompare(b.subject)
    );
    setEmailData(sortedData);
  };

  return (
    <section>
      <button onClick={sortByDate}>Date</button>
      <button onClick={sortByTitle}>Title</button>
      <button onClick={resetSearch}>Reset Search</button>

      {emailData?.length > 0 ? (
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
        <p>No Email</p>
      )}
    </section>
  );
};

export default EmailList;
