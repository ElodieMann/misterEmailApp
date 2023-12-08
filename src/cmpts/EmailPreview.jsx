import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const EmailPreview = ({ email }) => {

  function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (daysDiff === 1) {
      return "Yesterday";
    } else {
      const date = new Date(timestamp);
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  }

  return (
    
    <article>
      <FontAwesomeIcon icon={faStar} className="fav-icon"/>
      <p className="mail-from">{email.from}</p>
      <p className="mail-subj">{email.subject}</p>
      <p className="mail-sent">{formatRelativeTime(email.sentAt)}</p>
    </article>
  );
};

export default EmailPreview;
