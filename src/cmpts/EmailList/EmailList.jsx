import React, { useState } from "react";

import EmailPreview from "../EmailPreview/EmailPreview.jsx";

import styles from "./EmailList.module.scss";
import EmailSort from "../EmailSort/EmailSort.jsx";

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
  setIsChange
}) => {
  const [selectedEmails, setSelectedEmails] = useState([]);

  const toggleSelect = (emailId) => {
    setSelectedEmails((prevSelected) =>
      prevSelected.includes(emailId)
        ? prevSelected.filter((id) => id !== emailId)
        : [...prevSelected, emailId]
    );
  };

  return (
    <div>
      <EmailSort
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        emailData={emailData}
        setIsRead={setIsRead}
        setIsDelete={setIsDelete}
        setIsChange={setIsChange}
      />

      <div className={styles.emailList}>
        {emailData?.length > 0 || isComposeOpen.status ? (
          emailData.map((email) => (
            <EmailPreview
              key={email.id}
              email={email}
              setIsEmailClick={setIsEmailClick}
              setIsComposeOpen={setIsComposeOpen}
              filter={filter}
              setIsChange={setIsChange}
              setSelectedEmails={setSelectedEmails}
              toggleSelect={toggleSelect}
              isSelected={selectedEmails.includes(email.id)}
            />
          ))
        ) : (
          <p>No Email</p>
        )}
      </div>
    </div>
  );
};

export default EmailList;
