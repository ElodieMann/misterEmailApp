import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../services/util.service";
import { emailService } from "../services/email.service";

const EmailPreview = ({ email, setIsEmailClick }) => {
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
      await emailService.removeEmail(email.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="email-item"
      style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
    >
      <FontAwesomeIcon
        icon={faStar}
        className="fav-icon"
        onClick={onFavorite}
      />

      <Link
        to={`/email/${email.id}`}
        onClick={() => setIsEmailClick(true)}
        className="email-info"
      >
        <article     style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}>
          <p className="mail-from">{email.from}</p>
          <p className="mail-subj">{email.subject}</p>
          <p className="mail-sent">{formatRelativeTime(email.sentAt)}</p>
        </article>
      </Link>

      <FontAwesomeIcon
        className="trash-icon"
        icon={faTrash}
        onClick={onDelete}
      />
    </div>
  );
};

export default EmailPreview;
