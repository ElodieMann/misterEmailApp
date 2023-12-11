import React, { useState } from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = ({ filter, setFilter }) => {
  const [isEmailClick, setIsEmailClick] = useState(false);

  return (
    <div className="email-index">
      {isEmailClick ? (
        <EmailDetails setIsEmailClick={setIsEmailClick} />
      ) : (
        <EmailList filter={filter} setFilter={setFilter}/>
      )}
    </div>
  );
};

export default EmailIndex;
