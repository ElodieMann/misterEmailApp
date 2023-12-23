import React, { useEffect, useState } from "react";
import EmailList from "../../cmpts/EmailList/EmailList.jsx";
import EmailDetails from "../../cmpts/EmailDetails/EmailDetails.jsx";
import { emailService } from "../../services/email.service";

const EmailIndex = ({
  filter,
  isComposeOpen,
  setIsComposeOpen,
  canceledSent,
  setCancelSent,
}) => {
  const [isEmailClick, setIsEmailClick] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [isDelete, setIsDelete] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isRead, setIsRead] = useState("");

  useEffect(() => {
    getAllEmail();
    setCancelSent(false);
  }, [filter, isDelete, favorites, isComposeOpen, canceledSent, isRead]);

  const getAllEmail = async () => {
    try {
      const data = await emailService.getAllEmail(filter);
      setEmailData([...data]);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  return (
    <>
      {isEmailClick ? (
        <EmailDetails setIsEmailClick={setIsEmailClick} />
      ) : (
        <EmailList
          setIsEmailClick={setIsEmailClick}
          filter={filter}
          isComposeOpen={isComposeOpen}
          setIsComposeOpen={setIsComposeOpen}
          emailData={emailData}
          favorites={favorites}
          setFavorites={setFavorites}
          setIsDelete={setIsDelete}
          setIsRead={setIsRead}
        />
      )}
    </>
  );
};

export default EmailIndex;
