import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { emailService } from "../services/email.service";
import { formatRelativeTime } from "../services/util.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";

const EmailDetails = ({ setIsEmailClick, setIsComposeOpen }) => {
  const [email, setEmail] = useState([]);
  const params = useParams();

  useEffect(() => {
    getEmailById();
  }, []);

  const getEmailById = async () => {
    try {
      const email = await emailService.getById(params.id || id);
      setEmail(email);
      const updatedEmail = { ...email, isRead: true };

      setIsComposeOpen({
        status: false,
        info: updatedEmail,
      });

      emailService.updateEmail(updatedEmail);
    } catch (e) {
      console.log("Failed to load email", e);
    }
  };

  return (
    <div className="email-details-cmpt">
      <Link to="/misterEmailApp/email/inbox" onClick={() => setIsEmailClick(false)}>
        <FontAwesomeIcon className="email-details-icon-back" icon={faArrowLeft} />
      </Link>
      <div className="email-details-cont">
        <p className="email-title">{email?.subject}</p>
        <div className="from">
          <div className="user-email-details">
          <FontAwesomeIcon icon={faUser} className="user-icon"/>
            <div>
            <p>From : {email?.from || "Me"}</p>
            <p>To : {email?.to}</p>
            </div>
          </div>
          <p>At {formatRelativeTime(email?.sentAt)}</p>
        </div>
        <p>{email?.body}</p>
      </div>
    </div>
  );
};

export default EmailDetails;
