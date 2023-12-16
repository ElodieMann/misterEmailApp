import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../services/util.service";
import { emailService } from "../services/email.service";
import * as keys from "../config/keys";

const EmailPreview = ({
  email,
  setIsEmailClick,
  setIsDelete,
  setIsComposeOpen,
  filter,
  setFavorites,
  favorites,
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
      className="email-item"
      style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
    >
      <FontAwesomeIcon
        icon={faStar}
        className="fav-icon"
        onClick={() => onFavorite(email.id)}
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
          to={`/misterEmailApp/email/details/${email.id}`}
          onClick={() => setIsEmailClick(true)}
          className="email-info"
        >
          <article
            style={{ backgroundColor: !email.isRead ? "white" : "#F2F6FC" }}
          >
            <p className="mail-from">{email.from || "From Me"}</p>
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
