import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate, Link } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [unReadEmail, setUnReadEmail] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {

    const currentPath = location.pathname.split('/')[1];  
    console.log(location);
    setActiveLink(currentPath || keys.INBOX_FILTER);  

    setFilter((prevFilter) => ({ ...prevFilter, status: currentPath || keys.INBOX_FILTER }));
  }, [location, setFilter]);


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

  const filterUnreadEmail = (data) => {
    const unRead = data.filter((email) => !email.isRead);
    setUnReadEmail(unRead.length);
  };

  return (
    <nav
      className={styles.emailFolderList}
    >
      <FontAwesomeIcon
        className={styles.hamburgerIcon}
        icon={faBars}
      />
    
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
            `/${keys.INBOX_FILTER}?${params.toString()}`
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
            to={`/${filter}`}
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
