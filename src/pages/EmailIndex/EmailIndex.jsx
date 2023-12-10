import React, { useState } from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = ({
  filter,
  setEmailData,
  emailData,
  getAllEmail,
  showEmailUnread,
  inputSearch
}) => {
  const [isEmailClick, setIsEmailClick] = useState(false);

  return (
    <div className="email-index">
      {isEmailClick ? (
        <EmailDetails setIsEmailClick={setIsEmailClick} />
      ) : (
        <EmailList
          filter={filter}
          getAllEmail={getAllEmail}
          setEmailData={setEmailData}
          emailData={emailData}
          showEmailUnread={showEmailUnread}
          inputSearch={inputSearch}
        />
      )}
    </div>
  );
};

export default EmailIndex;
