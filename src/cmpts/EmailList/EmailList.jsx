import React, { useState } from "react";
import EmailPreview from "../EmailPreview/EmailPreview.jsx";
import EmailSort from "../EmailSort/EmailSort.jsx";
import styles from "./EmailList.module.scss";

const EmailList = ({ setIsEmailClick, filter, setIsComposeOpen, emailData, setIsChange }) => {
  const [selectedEmails, setSelectedEmails] = useState([]);

  const toggleSelect = (emailId) => {
    setSelectedEmails(prevSelected =>
      prevSelected.includes(emailId) ? prevSelected.filter(id => id !== emailId) : [...prevSelected, emailId]
    );
  };

  return (
    <div>
      <EmailSort
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        emailData={emailData}
        setIsChange={setIsChange}
      />

      <section className={styles.emailList}>
        {emailData ? (
          emailData.length > 0 ? (
            emailData.map(email => (
              <EmailPreview
                key={email.id}
                email={email}
                setIsEmailClick={setIsEmailClick}
                setIsComposeOpen={setIsComposeOpen}
                filter={filter}
                setIsChange={setIsChange}
                toggleSelect={toggleSelect}
                isSelected={selectedEmails.includes(email.id)}
              />
            ))
          ) : (
            <p>No emails available.</p>
          )
        ) : (
          <p>Loading emails...</p>
        )}
      </section>
    </div>
  );
};

export default EmailList;
