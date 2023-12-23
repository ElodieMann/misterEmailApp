import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { emailService } from "../../services/email.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faStar,
  faPaperPlane,
  faCompassDrafting,
  faTrash,
  faEnvelopesBulk,
  faPen,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import * as keys from "../../config/keys";
import styles from "./EmailFolderList.module.scss";

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
  const navigate = useNavigate();

  const [unReadEmail, setUnReadEmail] = useState("");
  const [activeLink, setActiveLink] = useState(keys.INBOX_FILTER);
  const [showMenu, setShowMenu] = useState(false);
  const [inboxEmails, setInboxEmails] = useState([]);

  useEffect(() => {
    fetchData();
  }, [inboxEmails]);

  useEffect(() => {
 
    const params = new URLSearchParams(window.location.search);
    const composeParam = params.get("compose");
    if (composeParam === "new") {
      setIsComposeOpen({
        status: true,
        info: {},
      });
    }
  }, [setIsComposeOpen]);

  const fetchData = async () => {
    const data = await emailService.getAllEmail("inbox");
    setInboxEmails(data);
    filterUnreadEmail(data);
  };

  const filterUnreadEmail = (data) => {
    const unRead = data.filter((email) => !email.isRead);
    setUnReadEmail(unRead.length);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`${styles.emailFolderList} ${showMenu ? styles.showMenu : ""}`}
    >
      <FontAwesomeIcon
        className={styles.hamburgerIcon}
        icon={faBars}
        onClick={toggleMenu}
      />
      <FontAwesomeIcon className={styles.mailHomeIcon} icon={faEnvelopesBulk} />
      <button
        className={styles.composeBtn}
        onClick={() => {
          setIsComposeOpen({
            status: true,
            info: {},
          });
          const params = new URLSearchParams();
          params.set("compose", "new");
          navigate(
            `/misterEmailApp/email/${keys.INBOX_FILTER}?${params.toString()}`
          );
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        Compose
      </button>
      <div className={styles.links}>
        {folderLinks.map(({ label, icon, filter }) => (
          <Link
            key={label}
            to={`/misterEmailApp/email/${filter}`}
            className={`${styles.navLink} ${
              activeLink === filter ? styles.active : ""
            }`}
            onClick={() => {
              setFilter((prevFilter) => ({ ...prevFilter, status: filter }));
              setActiveLink(filter);
            }}
          >
            <FontAwesomeIcon icon={icon} />
            {label}{" "}
            {filter === keys.INBOX_FILTER && (
              <span className={styles.unreadIndicator}>{unReadEmail}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default EmailFolderList;
