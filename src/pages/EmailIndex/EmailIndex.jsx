import React, { useState } from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = ({ filter, setFilter,isComposeOpen, setIsComposeOpen, emailData, setEmailData, sent, draft }) => {
  const [isEmailClick, setIsEmailClick] = useState(false);

  return (
    <div className="email-index">
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
    </div>
  );
};

export default EmailIndex;
