import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { emailService } from "../../services/email.service";
import { eventBusService } from "../../services/event-bus.service.js";

import { formatRelativeTime } from "../../services/util.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faStar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./EmailDetails.module.scss";

const EmailDetails = ({ setIsEmailClick, filter }) => {
  const [email, setEmail] = useState([]);
  const [isChange, setIsChange] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!params) return;
      getEmailById();
    },
    [params.id],
    isChange
  );

  const getEmailById = async () => {
    try {
      const email = await emailService.getById(params.id || id);
      setEmail(email);
      const updatedEmail = { ...email, isRead: true };

      await emailService.updateEmail(updatedEmail);
    } catch (e) {
      console.log("Failed to load email", e);
    }
  };

  const onFavorite = async () => {
    try {
      const updatedEmail = { ...email, isStarred: !email.isStarred };
      await emailService.updateEmail(updatedEmail);

      setEmail(updatedEmail);
    } catch (e) {
      console.log(e);
    }
  };

  const onReadEmail = async () => {
    try {
      const updatedEmail = { ...email, isRead: false };
      await emailService.updateEmail(updatedEmail);

      eventBusService.emit("show-user-msg", {
        txt: "Email marked as unread.",
        emailId: email.id,
      });
      setIsEmailClick(false);
      navigate(`/inbox`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.emailDetailsCmpt}>
      <Link  to={`/${filter.status}`} onClick={() => setIsEmailClick(false)}>
        <FontAwesomeIcon
          className={styles.emailDetailsIconBack}
          icon={faArrowLeft}
        />
      </Link>
      <div className={styles.emailDetailsCont}>
        <div className={styles.emailDetailHeader}>
          <p className={styles.emailTitle}>{email?.subject}</p>
          <div className={styles.rightSideHeader}>
            <div className={styles.iconEmailDetail}>
              <FontAwesomeIcon
                icon={faStar}
                className={styles.favIconEmailDetail}
                onClick={onFavorite}
                style={{ color: email.isStarred ? "yellow" : "inherit" }}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.favIconEmailDetail}
                onClick={() => onReadEmail(email)}
              />
            </div>
            <p>At {formatRelativeTime(email?.sentAt)}</p>
          </div>
        </div>
        <div className={styles.from}>
          <div className={styles.userEmailDetails}>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            <div>
              <p>From : {email?.from || "Me"}</p>
              <p>To : {email?.to}</p>
            </div>
          </div>
        </div>
        <hr />

        <p>{email?.body}</p>
      </div>
    </div>
  );
};

export default EmailDetails;
