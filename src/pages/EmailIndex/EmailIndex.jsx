import React, { useState } from "react";
import EmailList from "../../cmpts/EmailList/EmailList.jsx";
import EmailDetails from "../../cmpts/EmailDetails/EmailDetails.jsx";

const EmailIndex = ({ filter, setFilter,isComposeOpen, setIsComposeOpen, emailData, setEmailData, sent, draft }) => {
  const [isEmailClick, setIsEmailClick] = useState(false);

  return (
    <>
      {isEmailClick ? (
        <EmailDetails
          setIsEmailClick={setIsEmailClick}
          setIsComposeOpen={setIsComposeOpen}
        />
      ) : (
        <EmailList
        isComposeOpen={isComposeOpen}
          filter={filter}
          setFilter={setFilter}
          setIsComposeOpen={setIsComposeOpen}
          emailData={emailData}
          setEmailData={setEmailData}
          sent={sent}
          draft={draft}
        />
      )}
    </>
  );
};

export default EmailIndex;
