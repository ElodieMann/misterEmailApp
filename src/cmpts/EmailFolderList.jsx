import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { emailService } from "../services/email.service";


const EmailFolderList = ({  setFilter }) => {

  const [unReadEmail, setUnReadEmail] = useState('')
  const [initData, setInitData] = useState([])


  useEffect(() => {
    filterUnreadEmail();
  }, [unReadEmail]);

  const filterUnreadEmail = async () => {
    const data = await emailService.getAllEmail();
    setInitData(data)
    const unRead = initData.filter((em) => !em.isRead);
    setUnReadEmail(unRead.length);
  };

  return (
    <nav>
      <FontAwesomeIcon className="mail-home-icon" icon={faEnvelopesBulk} />
      <button className="compose-btn">
        <FontAwesomeIcon icon={faPen} />
        Compose
      </button>
      <div className="links">
        <Link to='/email' className="nav-link" onClick={() => setFilter("inbox")}>
          <FontAwesomeIcon icon={faInbox} />
          Inbox <span style={{color: 'red'}}>{unReadEmail}</span>
        </Link>
        <Link  to={`/email/starred`} className="nav-link" onClick={() => setFilter("starred")}>
          <FontAwesomeIcon icon={faStar} /> Starred
        </Link>
        <Link to={`/email/sent`}  className="nav-link" onClick={() => setFilter("sent")}>
          <FontAwesomeIcon icon={faPaperPlane} />
          Sent
        </Link>
        <Link to={`/email/draft`} className="nav-link" onClick={() => setFilter("draft")}>
          <FontAwesomeIcon icon={faCompassDrafting} />
          Draft
        </Link>
        <Link to={`/email/trash`} className="nav-link" onClick={() => setFilter("trash")}>
          <FontAwesomeIcon icon={faTrash} />
          Trash
        </Link>
      </div>
    </nav>
  );
};

export default EmailFolderList;
