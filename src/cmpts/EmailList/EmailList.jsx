import React, { useEffect, useState } from "react";
import { emailService } from "../../services/email.service";
import EmailPreview from "../EmailPreview/EmailPreview.jsx";

const EmailList = ({
  setIsEmailClick,
  filter,
  isComposeOpen,
  setIsComposeOpen,
  emailData,
  setEmailData,
}) => {
  const [isDelete, setIsDelete] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getAllEmail();

  }, [filter, isDelete, favorites, isComposeOpen.status]);

  console.log('filter', filter);
  // console.log('emailData', emailData);

  const getAllEmail = async () => {
    try {
      const data = await emailService.getAllEmail(filter);
      setEmailData(data);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  return (
    <>
      {emailData?.length > 0 ? (
        emailData.map((email) => (
          <EmailPreview
            key={email.id}
            email={email}
            setIsEmailClick={setIsEmailClick}
            setIsDelete={setIsDelete}
            filter={filter}
            setIsComposeOpen={setIsComposeOpen}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))
      ) : (
        <p>No Email</p>
      )}
    </>
  );
};

export default EmailList;
