import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faStar,
  faPaperPlane,
  faCompassDrafting,
  faTrash,
  faEnvelopesBulk,
  faPen
} from "@fortawesome/free-solid-svg-icons";

const EmailFolderList = ({setFilter}) => {

  return (
    <nav>
      <FontAwesomeIcon className="mail-home-icon" icon={faEnvelopesBulk} />
      <button className="compose-btn"><FontAwesomeIcon icon={faPen} />Compose</button>
      <div className="links">
      <Link className="nav-link" onClick={() => setFilter('inbox')}>
        <FontAwesomeIcon icon={faInbox} />
        Inbox
      </Link>
      <Link className="nav-link" onClick={() => setFilter('starred')}>
        <FontAwesomeIcon icon={faStar} /> Starred
      </Link>
      <Link className="nav-link" onClick={() => setFilter('sent')}>
        <FontAwesomeIcon icon={faPaperPlane} />
        Sent
      </Link>
      <Link className="nav-link" onClick={() => setFilter('draft')}>
        <FontAwesomeIcon icon={faCompassDrafting} />
        Draft
      </Link>
      <Link className="nav-link" onClick={() => setFilter('trash')}>
        <FontAwesomeIcon icon={faTrash} />
        Trash
      </Link>
      </div>
    </nav>
  );
};

export default EmailFolderList;
