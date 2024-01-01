import React, { useState, useEffect, useRef } from "react";
import { emailService } from "../../services/email.service";
import { utilService } from "../../services/util.service";
import {
  emailSentMsg,
  showErrorMsg,
} from "../../services/event-bus.service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./EmailCompose.module.scss";

const EmailCompose = ({
  filter,
  isComposeOpen,
  setIsComposeOpen,
  display,
  setIsChange,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sendButtonRef = useRef(null);

  const [emailData, setEmailData] = useState(getInitialEmailData());

  useEffect(() => {
    if (isComposeOpen?.info?.isDraft) {
      setEmailData(isComposeOpen.info);  
    } else {
      handleComposeNew();  
    }
  }, [isComposeOpen, searchParams]);

  function getInitialEmailData() {
    return {
      to: "",
      subject: "",
      body: "",
      sentAt: new Date(),
      id: utilService.makeId(),
      removedAt: null,
      isRead: true,
      isStarred: false
    };
  }

  function handleComposeNew() {
    const isComposeNew = searchParams.get("compose") === "new";
    if (isComposeNew) {
      setIsComposeOpen({ status: true, info: {} });
      setEmailData(() => ({  
        ...getInitialEmailData(),
        to: searchParams.get("to") || "",
        subject: searchParams.get("subject") || ""
      }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prevData => ({ ...prevData, [name]: value }));
  };

  const areFieldsEmpty = () => !emailData.to.trim() || !emailData.subject.trim() || !emailData.body.trim();

  const handleSendOrDraft = async (actionType) => {
    if (actionType === "draft" && areFieldsEmpty()) {
      closeComposer();
      return;
    }

    if (emailData.to.trim()) {
      const emailResponse = await processEmail(actionType);
      if (emailResponse && actionType === "sent") {
        emailSentMsg(emailResponse.id);
      }
    } else {
      showErrorMsg();
    }
  };

  const processEmail = async (actionType) => {
    const isDraft = actionType === "draft";
    const emailInfo = {
      ...emailData,
      isDraft,
      sentAt: isDraft ? null : new Date(),
      id: isComposeOpen?.info?.isDraft ? emailData.id : utilService.makeId()
    };

    let emailResponse;
    if (isComposeOpen?.info?.isDraft) {
      emailResponse = await emailService.updateEmail(emailInfo);
    } else {
      emailResponse = await emailService.newEmail(emailInfo);
    }

    closeComposer();
    return emailResponse;
  };

  const closeComposer = () => {
    setIsComposeOpen({ status: false, info: {} });
    navigate(`/${filter.status}`);
    setIsChange(new Date());
  };
  return display ? (
    <div className={styles.emailComposeOverlay}>
      <div className={styles.emailComposeCmpt}>
        <div className={styles.formCompose}>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={() => handleSendOrDraft("draft")}
          >
            <FontAwesomeIcon icon={faXmark} />
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
            ref={sendButtonRef}
            className={styles.sendBtnCompose}
            type="button"
            onClick={() => handleSendOrDraft("sent")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EmailCompose;
