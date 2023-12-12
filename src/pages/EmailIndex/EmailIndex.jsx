import React, { useState } from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = ({ filter, setFilter, setIsComposeOpen }) => {
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
          filter={filter}
          setFilter={setFilter}
          setIsComposeOpen={setIsComposeOpen}
        />
      )}
    </div>
  );
};

export default EmailIndex;
