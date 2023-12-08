import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatRelativeTime } from '../services/util.service';

const EmailPreview = ({ email, setIsEmailClick }) => {
  return (
    <Link to={`/email/${email.id}`} onClick={() => setIsEmailClick(true)}>
      <article>
        <FontAwesomeIcon icon={faStar} className="fav-icon"/>
        <p className="mail-from">{email.from}</p>
        <p className="mail-subj">{email.subject}</p>
        <p className="mail-sent">{formatRelativeTime(email.sentAt)}</p>
      </article>
    </Link>
  );
};

export default EmailPreview;
