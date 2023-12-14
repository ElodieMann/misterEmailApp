import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faStar,
  faPaperPlane,
  faCompassDrafting,
  faTrash,
  faEnvelopesBulk,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import * as keys from "../config/keys";

const folderLinks = [
  { label: keys.INBOX_LABEL, icon: faInbox, filter: keys.INBOX_FILTER },
  { label: keys.STARRED_LABEL, icon: faStar, filter: keys.STARRED_FILTER },
  { label: keys.SENT_LABEL, icon: faPaperPlane, filter: keys.SENT_FILTER },
  {
    label: keys.DRAFT_LABEL,
    icon: faCompassDrafting,
    filter: keys.DRAFT_FILTER,
  },
  { label: keys.TRASH_LABEL, icon: faTrash, filter: keys.TRASH_FILTER },
];

const EmailFolderList = ({ setFilter, setIsComposeOpen }) => {
  const [unReadEmail, setUnReadEmail] = useState("");
  const [activeLink, setActiveLink] = useState(keys.INBOX_FILTER);

  useEffect(() => {
    filterUnreadEmail();
  }, [unReadEmail]);

  const filterUnreadEmail = async () => {
    const data = await emailService.getAllEmail("inbox");
    const unRead = data.filter((email) => !email.isRead);
    setUnReadEmail(unRead.length);
  };

  return (
    <nav>
      <FontAwesomeIcon className="mail-home-icon" icon={faEnvelopesBulk} />
      <button
        className="compose-btn"
        onClick={() =>
          setIsComposeOpen({
            status: true,
            info: {},
          })
        }
      >
        <FontAwesomeIcon icon={faPen} />
        Compose
      </button>
      <div className="links">
        {folderLinks.map(({ label, icon, filter }) => (
          <Link
            key={label}
            to={`/misterEmailApp/email/${filter}`}
            className={`nav-link ${activeLink === filter ? "active" : ""}`}
            onClick={() => {
              setFilter((prevFilter) => ({ ...prevFilter, status: filter }));
              setActiveLink(filter);
            }}
          >
            <FontAwesomeIcon icon={icon} />
            {label}{" "}
            {filter === keys.INBOX_FILTER && (
              <span className="unread-indicator">{unReadEmail}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default EmailFolderList;
