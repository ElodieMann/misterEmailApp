import React from "react";
import { emailService } from "../../services/email.service";

import styles from "./EmailSort.module.scss";

const EmailSort = ({
  selectedEmails,
  setSelectedEmails,
  emailData,
  setIsChange,
}) => {
  const toggleSelectAllEmails = () => {
    setSelectedEmails(selectedEmails.length === emailData.length ? [] : emailData.map(email => email.id));
  };

  const handleDelete = async () => {
    try {
      for (let emailId of selectedEmails) {
        await emailService.removeEmail(emailId);
        setIsChange(new Date());
      }

      setSelectedEmails([]);
    } catch (e) {
      console.log("Failed to delete emails:", e);
    }
  };

  const updateEmail = async (email, action) => {
    try {
      switch (action) {
        case "read":
          email.isRead = true;
          break;
        case "unread":
          email.isRead = false;
          break;
        case "star":
          email.isStarred = true;
          break;
        case "unstar":
          email.isStarred = false;
          break;
        default:
          break;
      }

      await emailService.updateEmail(email);
      setIsChange(new Date());

      if (action === "star") {
        setFavorites((prevFavorites) => {
          if (!prevFavorites.includes(email.id)) {
            return [...prevFavorites, email.id];
          }
          return prevFavorites;
        });
      }

      if (action === "unstar") {
        setIsChange(new Date());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkEmails = async (action) => {
    for (let emailId of selectedEmails) {
      const email = await emailService.getById(emailId);
      await updateEmail(email, action);
    }
    setSelectedEmails([]);
  };
  return (
    <div className={styles.btnFilter}>
      <input
        type="checkbox"
        onChange={() => toggleSelectAllEmails()}
        checked={
          selectedEmails.length === emailData.length && emailData.length > 0
        }
      />{" "}
      <button onClick={() => handleMarkEmails("star")}>Mark as favorite</button>
      <button onClick={() => handleMarkEmails("unstar")}>
        Mark as unfavorite
      </button>
      <button onClick={() => handleMarkEmails("read")}>Mark as read</button>
      <button onClick={() => handleMarkEmails("unread")}>Mark as unread</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmailSort;
