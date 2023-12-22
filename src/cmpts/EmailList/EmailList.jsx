import React, { useState } from "react";
import { emailService } from "../../services/email.service";

import EmailPreview from "../EmailPreview/EmailPreview.jsx";

import styles from "./EmailList.module.scss";

const EmailList = ({
  setIsEmailClick,
  filter,
  isComposeOpen,
  setIsComposeOpen,
  emailData,
  favorites,
  setFavorites,
  setIsDelete,
  setIsRead,
}) => {
  const [selectedEmails, setSelectedEmails] = useState([]);


  const toggleSelectAllEmails = () => {
    const allSelected = selectedEmails.length === emailData.length;

    if (allSelected) {
      setSelectedEmails([]);
    } else {
      const allEmailIds = emailData.map((email) => email.id);
      setSelectedEmails(allEmailIds);
    }
  };

  const toggleSelect = (emailId) => {
    setSelectedEmails((prevSelected) =>
      prevSelected.includes(emailId)
        ? prevSelected.filter((id) => id !== emailId)
        : [...prevSelected, emailId]
    );
  };

  const handleDelete = async () => {
    try {
      for (let emailId of selectedEmails) {
        await emailService.removeEmail(emailId);
        setIsDelete(emailId);
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
      setIsRead(email.id);
  
      if (action === "star") {
        setFavorites((prevFavorites) => {
          if (!prevFavorites.includes(email.id)) {
            return [...prevFavorites, email.id];
          }
          return prevFavorites;
        });
      }
  
      if (action === "unstar") {
        setFavorites((prevFavorites) => prevFavorites.filter(id => id !== email.id));
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
    <>
      <div className={styles.btnFilter}>
        <input
          type="checkbox"
          onChange={() => toggleSelectAllEmails()}
          checked={
            selectedEmails.length === emailData.length && emailData.length > 0
          }
        />{" "}
        <button onClick={() => handleMarkEmails("star")}>Mark as favorite</button>
        <button onClick={() => handleMarkEmails("unstar")}>Mark as unfavorite</button>
        <button onClick={() => handleMarkEmails("read")}>Mark as read</button>
        <button onClick={() => handleMarkEmails("unread")}>
          Mark as unread
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {emailData?.length > 0 || isComposeOpen ? (
        emailData.map((email) => (
          <EmailPreview
            key={email.id}
            email={email}
            setIsEmailClick={setIsEmailClick}
            setIsDelete={setIsDelete}
            setIsComposeOpen={setIsComposeOpen}
            filter={filter}
            setFavorites={setFavorites}
            favorites={favorites}
            setSelectedEmails={setSelectedEmails}
            toggleSelect={toggleSelect}
            isSelected={selectedEmails.includes(email.id)}
          />
        ))
      ) : (
        <p>No Email</p>
      )}
    </>
  );
};

export default EmailList;
