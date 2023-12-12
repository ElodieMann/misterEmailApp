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

  const areFieldsNotEmpty = () => {
    return (
      emailData.to.trim() !== "" ||
      emailData.subject.trim() !== "" ||
      emailData.body.trim() !== ""
    );
  };

  const handleSendEmail = async () => {
    const sentAt = new Date();

    if (isComposeOpen.info && isComposeOpen.info.isDraft) {
      const originalDraft = await emailService.getById(isComposeOpen.info.id);
      console.log(originalDraft, "original");
      if (originalDraft) {
        emailService.updateEmail({
          ...originalDraft,
          ...emailData,
          isDraft: false,
          sentAt,
        });
      } else {
        emailService.newEmail({
          ...emailData,
          isDraft: false,
          sentAt,
          id: utilService.makeId()
        });
      }
    } else {
      emailService.newEmail({
        ...emailData,
        isDraft: false,
        sentAt,
        id: utilService.makeId()

      });
    }

    setIsComposeOpen({
      status: false,
      info: {},
    });

    setEmailData({
      to: "",
      subject: "",
      body: "",
      sentAt,
    });
  };

  const handleClose = async () => {
    if (areFieldsNotEmpty()) {
      if (isComposeOpen.info && isComposeOpen.info.isDraft) {
        const originalDraft = await emailService.getById(isComposeOpen.info.id);
        if (originalDraft) {
          emailService.updateEmail({
            ...originalDraft,
            ...emailData,
            isDraft: true,
          });
        } else {
          emailService.newEmail({
            ...emailData,
            isDraft: true,
            sentAt: null,  
            id: utilService.makeId(),
          });
        }
      } else {
        emailService.newEmail({
          ...emailData,
          isDraft: true,
          sentAt: null,  
          id: utilService.makeId(),
        });
      }
    }
    setIsComposeOpen({
      status: false,
      info: {},
    });
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
