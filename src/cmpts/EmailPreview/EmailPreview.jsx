import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTrash,
  faEnvelopeOpenText,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../services/util.service";
import { emailService } from "../../services/email.service";
import * as keys from "../../config/keys";
import styles from "./EmailPreview.module.scss";

const EmailPreview = ({
  email,
  setIsEmailClick,
  setIsComposeOpen,
  filter,
  toggleSelect,
  isSelected,
  setIsChange
}) => {
  const onFavorite = async () => {
    try {
      const updatedEmail = { ...email, isStarred: !email.isStarred };
      await emailService.updateEmail(updatedEmail);

      setIsChange(new Date())

    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {
    try {
      if (filter.status === keys.TRASH_FILTER) {
        await emailService.removeFromLocalStorage(email.id);
        setIsChange(new Date())
      } else {
        await emailService.removeEmail(email.id);
        setIsChange(new Date())

      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleRead = async () => {
    try {
      const updatedEmail = { ...email, isRead: !email.isRead };
      await emailService.updateEmail(updatedEmail);
      setIsChange(new Date())
 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={styles.emailItem}
      style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
    >
      <input
        type="checkbox"
        onChange={() => toggleSelect(email.id)}
        checked={isSelected}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={styles.favIconStar}
        onClick={onFavorite}
        style={{ color: email.isStarred ? "yellow" : "inherit" }}
      />
      {filter.status === "draft" ? (
        <button
          className={styles.composeBtnDraft}
          onClick={() =>
            setIsComposeOpen({
              status: true,
              info: email,
            })
          }
        >
          <article
            className={styles.linkDraft}
            style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
          >
            <p className={styles.mailFrom} style={{ color: "red" }}>
              Draft
            </p>
            <p className={styles.mailSubj}>{email.subject}</p>
          </article>
        </button>
      ) : (
        <Link
          to={`/${filter.status}/${email.id}`}
          onClick={() => setIsEmailClick(true)}
          className={styles.emailInfo}
        >
          <article
            style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
          >
            <p className={styles.mailFrom}>{email.from || "From Me"}</p>
            <p className={styles.mailSubj}>{email.subject}</p>
          </article>
        </Link>
      )}
      <div className={styles.mailSent}>
        <p>{formatRelativeTime(email.sentAt)}</p>
        <FontAwesomeIcon
          className={styles.favIconEmailPreview}
          icon={faTrash}
          onClick={onDelete}
        />
        <FontAwesomeIcon
          icon={email.isRead ? faEnvelope :  faEnvelopeOpenText}
          className={styles.favIconEmailPreview}
          onClick={() => toggleRead(email)}
        />
       
      </div>
    </div>
  );
};

export default EmailPreview;
