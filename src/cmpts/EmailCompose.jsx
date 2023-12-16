import React, { useState, useEffect } from "react";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

const EmailCompose = ({ isComposeOpen, setIsComposeOpen }) => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
    sentAt: new Date(),
    id: utilService.makeId(),
    removedAt: null,
    isRead: false,
    isStarred: false,
  });

  useEffect(() => {
    if (isComposeOpen.info && isComposeOpen.info.isDraft) {
      setEmailData({
        to: isComposeOpen.info.to,
        subject: isComposeOpen.info.subject,
        body: isComposeOpen.info.body,
        sentAt: isComposeOpen.info.sentAt || new Date(),
        removedAt: null,
        isRead: false,
        isStarred: false,
      });
    }
  }, [isComposeOpen.info]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const newEmail = async () => {
    const sentAt = new Date();
    const addToData = await emailService.newEmail({
      ...emailData,
      isDraft: false,
      sentAt,
      id: utilService.makeId(),
    });

    return addToData;
  };

  const newDraft = async () => {
    const addToData = await emailService.newEmail({
      ...emailData,
      isDraft: true,
      sentAt: null,
      id: utilService.makeId(),
    });

    return addToData;
  };

  const onSentOrDraft = async (name) => {

    const sentAt = new Date();
  
    if (emailData.to.trim()) {
      if (isComposeOpen.info && isComposeOpen.info.isDraft) {
        const originalDraft = await emailService.getById(isComposeOpen.info.id);
        if (originalDraft) {
          emailService.updateEmail({
            ...originalDraft,
            ...emailData,
            isDraft: name === "draft",  
            sentAt,
          });
        } else {
          name === "draft" ? newDraft() : newEmail();  
        }
      } else {
        name === "draft" ? newDraft() : newEmail();  
      }
    }
    setIsComposeOpen({
      status: false,
      info: {},
    });

    console.log(isComposeOpen, "isComposeOpen");

  };
  

  return (
    <div className="email-compose-overlay">
      <div className="email-compose-cmpt">
        <div className="compose-header">
          <p>New Message</p>
        </div>
        <form className="form-compose">
          <button
            className="close-btn"
            type="button"
            onClick={() => onSentOrDraft("draft")}
          >
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
            className="to-input-compose"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailData.subject}
            onChange={handleChange}
            className="subject-input-compose"
          />
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            value={emailData.body}
            onChange={handleChange}
            className="message-input-compose"
          ></textarea>
          <div>
            <button
              className="send-btn-compose"
              type="button"
              onClick={() => onSentOrDraft("sent")}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCompose;
