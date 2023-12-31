import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faStar,
  faPaperPlane,
  faCompassDrafting,
  faTrash,
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

const EmailFolderList = ({
  setFilter,
  isComposeOpen,
  setIsComposeOpen,
  emailData,
  setIsEmailClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unReadEmail, setUnReadEmail] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const currentPath = location.pathname.split("/")[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(currentPath || keys.INBOX_FILTER);

    setFilter((prevFilter) => ({
      ...prevFilter,
      status: currentPath || keys.INBOX_FILTER,
    }));
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

    filterUnreadEmail();
  }, [setIsComposeOpen, emailData]);

  const filterUnreadEmail = () => {
    if (activeLink === keys.INBOX_FILTER) {
      const unRead = emailData.filter(
        (email) => !email.isRead && email.to === "user@appsus.com"
      );
      setUnReadEmail(unRead.length);
    }
  };

  const handleFolderClick = (filterValue) => {
    setIsEmailClick(false);
    setFilter((prevFilter) => ({ ...prevFilter, status: filterValue }));
    setActiveLink(filterValue);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${styles.emailFolderList} ${isMenuOpen ? "isMenuOpen" : ""}`}
    >
      <FontAwesomeIcon
        className={styles.hamburgerIcon}
        icon={faBars}
        onClick={toggleMenu}
      />

      {(!isComposeOpen.status || window.innerWidth > 950) && (
        <button
          className={`${styles.composeBtn}`}
          onClick={() => {
            setIsComposeOpen({
              status: true,
              info: {},
            });
            const params = new URLSearchParams();

            params.set("compose", "new");
            navigate(`/${currentPath}?${params.toString()}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
          Compose
        </button>
      )}

      <div className={`${styles.links} ${isMenuOpen ? styles.showMenu : ""}`}>
        {folderLinks.map(({ label, icon, filter }) => (
          <Link
            key={label}
            to={`/${filter}`}
            className={`${styles.navLink} ${
              activeLink === filter ? styles.active : ""
            }`}
            onClick={() => handleFolderClick(filter)}
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
