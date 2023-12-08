import React, { useState }  from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = () => {
  const [isEmailClick, setIsEmailClick] = useState(false);

  return (
    <div className="email-index">
     {!isEmailClick && <EmailList setIsEmailClick={setIsEmailClick} />}
      {isEmailClick && <EmailDetails setIsEmailClick={setIsEmailClick} />}
    </div>
  );
};

export default EmailIndex;
