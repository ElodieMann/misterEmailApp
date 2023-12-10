import React from "react";

const EmailCompose = ({setIsComposeOpen}) => {
  return (
    <div className="email-compose-overlay">
    <div className="email-compose-cmpt">
      <div className="compose-header">
        <p>New Message</p>
      </div>
      <form className="form-compose">
        <button className="close-btn" onClick={() => setIsComposeOpen(false)}>x</button>
        <p>
          From :<span>Your-Mail</span>
        </p>
        <input type="text" 
        placeholder="To" />
        <input type="text" placeholder="Subject" />
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
    </div>
  );
};

export default EmailCompose;
