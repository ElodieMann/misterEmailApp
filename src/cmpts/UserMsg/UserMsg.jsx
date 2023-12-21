import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailService } from "../../services/email.service.js";
import { eventBusService } from "../../services/event-bus.service.js";
import styles from "./UserMsg.module.scss";

const UserMsg = () => {
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      console.log("Message reçu:", msg);
      setMsg(msg);

        setTimeout(() => {
          onCloseMsg();
        }, 3000);
    });

    return unsubscribe;
  }, []);

  function onCloseMsg() {
    setMsg(null);
  }

  function onViewMessage() {
    console.log("View message clicked!");

    if (msg.emailId) {
      navigate(`/misterEmailApp/email/details/${msg.emailId}`);
    }
  }

  function onCancelSending() {
    emailService.removeEmail(msg.emailId);

    setMsg({
      txt: "Canceled.",
    });
  }

  if (!msg) return <></>;

  return (
    <div className={`${styles.userMsg} ${styles[msg.type]}`}>
      <p>{msg.txt}</p>
      {msg.actions &&
        msg.actions.map((action, index) => (
          <button
            key={index}
            className={styles.optBtn}
            onClick={
              action.label === "View message" ? onViewMessage : onCancelSending
            }
          >
            {action.label}
          </button>
        ))}
      <button className={styles.closeBtn} onClick={onCloseMsg}>
        X
      </button>
    </div>
  );
};

export default UserMsg;
