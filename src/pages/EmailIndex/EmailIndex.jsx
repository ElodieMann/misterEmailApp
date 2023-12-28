import React, { useEffect, useState } from "react";
import EmailList from "../../cmpts/EmailList/EmailList.jsx";
import EmailDetails from "../../cmpts/EmailDetails/EmailDetails.jsx";
import { emailService } from "../../services/email.service";
import styles from "./EmailIndex.module.scss";
import EmailFolderList from "../../cmpts/EmailFolderList/EmailFolderList.jsx";
import EmailCompose from "../../cmpts/EmailCompose/EmailCompose.jsx";

const EmailIndex = ({ filter, setFilter, canceledSent, setCancelSent }) => {
  const [isEmailClick, setIsEmailClick] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState({
    status: false,
    info: {},
  });

  const [isChange, setIsChange] = useState('')

  useEffect(() => {
    getAllEmail();
    setCancelSent(false);
  }, [filter, isComposeOpen, canceledSent, isChange]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const updatedFilter = emailService.getFilterFromSearchParams(searchParams);
    setFilter(updatedFilter);
  }, [window.location.search]);
  
  

  const getAllEmail = async () => {
    try {
      const data = await emailService.getAllEmail(filter);
      if (data) setEmailData([...data]);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };


  return (
    <section className={styles.emailIndex}>
      <EmailFolderList
        setFilter={setFilter}
        setIsComposeOpen={setIsComposeOpen}
        emailData={emailData}
      />

      <div className={styles.listContainer}>
        {isEmailClick ? (
          <EmailDetails setIsEmailClick={setIsEmailClick} isEmailClick={isEmailClick}/>
          // <p>hey</p>
        ) : (
          <EmailList
            setIsEmailClick={setIsEmailClick}
            filter={filter}
            isComposeOpen={isComposeOpen}
            setIsComposeOpen={setIsComposeOpen}
            emailData={emailData}
            setIsChange={setIsChange}
          />
        )}
      </div>

      <EmailCompose
        isComposeOpen={isComposeOpen}
        setIsComposeOpen={setIsComposeOpen}
        filter={filter}
        display={isComposeOpen.status}
      />
    </section>
  );
};

export default EmailIndex;
