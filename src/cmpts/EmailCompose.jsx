import React, { useState } from "react";
import { emailService } from "../services/email.service";

const EmailCompose = ({ setIsComposeOpen }) => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const areFieldsNotEmpty = () => {
    return (
      emailData.to.trim() !== "" ||
      emailData.subject.trim() !== "" ||
      emailData.body.trim() !== ""
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendEmail = () => {
    emailService.saveSentEmail(emailData);
    setSentEmails((prevEmails) => [...prevEmails, emailData]);

    setIsComposeOpen(false);

    setEmailData({
      to: "",
      subject: "",
      body: "",
    });
  };

  const handleClose = () => {
    if (areFieldsNotEmpty()) {
      emailService.saveDraft(emailData);
      setDrafts((prevDrafts) => [...prevDrafts, emailData]);
    }
    setIsComposeOpen(false);
  };

  return (
    <div className="email-compose-overlay">
      <div className="email-compose-cmpt">
        <div className="compose-header">
          <p>New Message</p>
        </div>
        <form className="form-compose">
          <button className="close-btn" type="button" onClick={handleClose}>
            x
          </button>
          <p>
            From :<span>Your-Mail</span>
          </p>
          <input
            type="text"
            name="to"
            placeholder="To"
            value={emailData.to}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailData.subject}
            onChange={handleChange}
          />
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            value={emailData.body}
            onChange={handleChange}
          ></textarea>
          <div>
            <button type="button" onClick={handleSendEmail}>
              Send
            </button>
            <button type="button" onClick={handleClose}>
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCompose;
