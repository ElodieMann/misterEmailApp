import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../services/util.service";
import { emailService } from "../../services/email.service";
import * as keys from "../../config/keys";
import styles from "./EmailPreview.module.scss";

const EmailPreview = ({
  email,
  setIsEmailClick,
  setIsDelete,
  setIsComposeOpen,
  filter,
  setFavorites,
  favorites,
  toggleSelect,
  isSelected,
  setIsRead
}) => {
  const [isFav, setIsFav] = useState(email.isStarred);

  useEffect(() => {
    onChange();
  }, [isFav]);

  const onChange = () => {
    let newFav = [...favorites];
    newFav.includes(email.id)
      ? newFav.splice(email.id, 1)
      : newFav.push(email.id);
    setFavorites(newFav);
  };

  const onFavorite = async () => {
    try {
      const updatedEmail = { ...email, isStarred: !isFav };
      emailService.updateEmail(updatedEmail);
      setIsFav(!isFav);
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async () => {
    try {
      if (filter.status === keys.TRASH_FILTER) {
        await emailService.removeFromLocalStorage(email.id);
        setIsDelete(email.id);
      } else {
        await emailService.removeEmail(email.id);
        setIsDelete(email.id);
      }
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
        className={styles.favIcon}
        onClick={() => onFavorite(email.id)}
        style={{ color: isFav ? "yellow" : "inherit" }}
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
          to={`/misterEmailApp/email/details/${email.id}`}
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
      <p className={styles.mailSent}>{formatRelativeTime(email.sentAt)}</p>
      <FontAwesomeIcon
        className={styles.trashIcon}
        icon={faTrash}
        onClick={onDelete}
      />
    </div>
  );
};

export default EmailPreview;
