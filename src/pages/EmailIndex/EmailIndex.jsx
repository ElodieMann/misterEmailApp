import React, { useState }  from "react";
import EmailList from "../../cmpts/EmailList";
import EmailDetails from "../../cmpts/EmailDetails";

const EmailIndex = ({filter}) => {
  const [isEmailClick, setIsEmailClick] = useState(false);


  return (
    <div className="email-index">
  
      {isEmailClick ? <EmailDetails setIsEmailClick={setIsEmailClick} /> : <EmailList filter={filter} />}
    </div>
  );
};

export default EmailIndex;
