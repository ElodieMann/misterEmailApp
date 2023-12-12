import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { emailService } from "../services/email.service";
import { formatRelativeTime } from "../services/util.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
    <div className="email-details-cont">
      <Link to="/email/inbox" onClick={() => setIsEmailClick(false)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <h1>{email?.subject}</h1>
      <div className="from">
        <div>
          <p>From : {email?.from || "Me"}</p>
          <p>To : {email?.to}</p>
        </div>
        <p>At {formatRelativeTime(email?.sentAt)}</p>
      </div>
      <h4>{email?.body}</h4>
    </div>
  );
};

export default EmailDetails;
