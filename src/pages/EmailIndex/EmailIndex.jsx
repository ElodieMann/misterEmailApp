import React, { useEffect, useState } from "react";
import EmailList from "../../cmpts/EmailList/EmailList.jsx";
import { emailService } from "../../services/email.service";
import styles from "./EmailIndex.module.scss";
import EmailFolderList from "../../cmpts/EmailFolderList/EmailFolderList.jsx";
import EmailCompose from "../../cmpts/EmailCompose/EmailCompose.jsx";
import { Outlet } from "react-router-dom";

const EmailIndex = ({ filter, setFilter, canceledSent, setCancelSent,isEmailClick, setIsEmailClick}) => {
  const [emailData, setEmailData] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState({
    status: false,
    info: {},
  });

  const [isChange, setIsChange] = useState("");


  useEffect(() => {
    getAllEmail();
    setCancelSent(false);
  }, [filter, canceledSent, isChange]);

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
        isComposeOpen={isComposeOpen}
        setIsComposeOpen={setIsComposeOpen}
        emailData={emailData}
        setIsEmailClick={setIsEmailClick}  
      />

      <div className={styles.listContainer}>
        {isEmailClick ? (
          <Outlet />
        ) : (
          <EmailList
            setIsEmailClick={setIsEmailClick}
            filter={filter}
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
        setIsChange={setIsChange}

      />
    </section>
  );
};

export default EmailIndex;
