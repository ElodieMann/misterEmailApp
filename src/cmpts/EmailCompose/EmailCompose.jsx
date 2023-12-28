import React, { useState, useEffect } from "react";
import { emailService } from "../../services/email.service";
import { utilService } from "../../services/util.service";
import {
  emailSentMsg,
  showErrorMsg,
} from "../../services/event-bus.service.js";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./EmailCompose.module.scss";

const EmailCompose = ({ filter, isComposeOpen, setIsComposeOpen, display }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isComposeNew = searchParams.get("compose") === "new";

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
    if (isComposeOpen?.info && isComposeOpen?.info?.isDraft) {
      setEmailData({
        to: isComposeOpen?.info?.to,
        subject: isComposeOpen?.info?.subject,
        body: isComposeOpen?.info?.body,
        sentAt: isComposeOpen?.info?.sentAt || new Date(),
        removedAt: null,
        isRead: false,
        isStarred: false,
      });
    }
  }, [isComposeOpen?.info]);


useEffect(() => {
    const isComposeNew = searchParams.get("compose") === "new";
    if (isComposeNew) {
      setIsComposeOpen({
        status: true,
        info: {},
      });
    }

    const to = searchParams.get("to");
    const subject = searchParams.get("subject");

    if (to) {
      setEmailData((prevData) => ({ ...prevData, to }));
    }
    if (subject) {
      setEmailData((prevData) => ({ ...prevData, subject }));
    }
}, [searchParams, setIsComposeOpen]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };



  const areFieldsEmpty = () => {
    return (
      !emailData.to.trim() ||
      !emailData.subject.trim() ||
      !emailData.body.trim()
    );
  };

  const newEmailOrDraft = async (name) => {
    const sentAt = new Date();
    const isDraft = name === "draft";
    const addToData = await emailService.newEmail({
      ...emailData,
      isDraft,
      sentAt: isDraft ? null : sentAt,
      id: utilService.makeId(),
    });

    setIsComposeOpen({
      status: false,
      info: {},
    });
    if (name === "sent") emailSentMsg(addToData.id);
    navigate(`/${filter.status}`);

    return addToData;
  };

  const resetEmailData = () => {
    setEmailData({
      to: "",
      subject: "",
      body: "",
      sentAt: new Date(),
      id: utilService.makeId(),
      removedAt: null,
      isRead: false,
      isStarred: false,
    });
  };

  const onSentOrDraft = async (name) => {
    if (name === "draft" && areFieldsEmpty()) {
      setIsComposeOpen({
        status: false,
        info: {},
      });
      navigate(`/${filter.status}`);
      return;
    }

    if (name === "sent" && !isComposeOpen?.info?.isDraft) {
      await newEmailOrDraft(name);
      resetEmailData(); 
    }

    if (emailData.to.trim()) {
      if (isComposeOpen?.info && isComposeOpen?.info?.isDraft) {
        const originalDraft = await emailService.getById(
          isComposeOpen?.info?.id
        );

        if (originalDraft) {
          const isDraft = name === "draft";
          await emailService.updateEmail({
            ...originalDraft,
            ...emailData,
            isDraft,
            sentAt: isDraft ? null : new Date(),
          });

          setIsComposeOpen({
            status: false,
            info: {},
          });
          if (name === "sent") emailSentMsg();
        } else {
          await newEmailOrDraft(name);
        }
      } else {
        await newEmailOrDraft(name);
      }
    } else {
      showErrorMsg();
    }
  };

  return display?(

    <div className={styles.emailComposeOverlay}>
      <div className={styles.emailComposeCmpt}>
        <div className={styles.formCompose}>
          <button
            className={styles.closeBtn}
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
            value={emailData?.to}
            onChange={handleChange}
            className={styles.toInputCompose}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailData?.subject}
            onChange={handleChange}
            className={styles.subjectInputCompose}
          />
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            value={emailData.body}
            onChange={handleChange}
            className={styles.messageInputCompose}
          ></textarea>

          <button
            className={styles.sendBtnCompose}
            type="button"
            onClick={() => onSentOrDraft("sent")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  ) : null
};

export default EmailCompose;
