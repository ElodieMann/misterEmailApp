import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../services/util.service";
import { emailService } from "../services/email.service";

const EmailPreview = ({
  email,
  setIsEmailClick,
  setIsDelete,
  setIsComposeOpen,
  filter,
}) => {
  const [isFav, setIsFav] = useState(email.isStarred);

  const onFavorite = async () => {
    try {
      const updatedEmail = { ...email, isStarred: !isFav };
      setIsFav(!isFav);
      emailService.updateEmail(updatedEmail);
    } catch (e) {
      console.log(e);
    }
  };
  const onDelete = async () => {
    try {
      if (filter.status === "trash") {
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

  const onEmailClicked = () => setIsEmailClick(true);

  return (
    <div
      className="email-item"
      style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
    >
      <FontAwesomeIcon
        icon={faStar}
        className="fav-icon"
        onClick={onFavorite}
        style={{ color: isFav ? "yellow" : "inherit" }}
      />
      {filter.status === "draft" ? (
        <button
          className="compose-btn-draft"
          onClick={() =>
            setIsComposeOpen({
              status: true,
              info: email,
            })
          }
        >
          <article
            className="link-draft"
            style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
          >
            <p className="mail-from" style={{ color: "red" }}>
              Draft
            </p>
            <p className="mail-subj">{email.subject}</p>
            <p className="mail-sent">{formatRelativeTime(email.sentAt)}</p>
          </article>
        </button>
      ) : (
        <Link
          to={`/email/details/${email.id}`}
          onClick={onEmailClicked}
          className="email-info"
        >
          <article
            style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
          >
            <p className="mail-from">{email.from}</p>
            <p className="mail-subj">{email.subject}</p>
            <p className="mail-sent">{formatRelativeTime(email.sentAt)}</p>
          </article>
        </Link>
      )}

      <FontAwesomeIcon
        className="trash-icon"
        icon={faTrash}
        onClick={onDelete}
      />
    </div>
  );
};

export default EmailPreview;
