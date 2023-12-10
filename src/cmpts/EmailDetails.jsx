import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { emailService } from "../services/email.service";
import { formatRelativeTime } from "../services/util.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EmailDetails = ({ setIsEmailClick }) => {
  const [email, setEmail] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEmailById();
  }, []);

  const getEmailById = async () => {
    try {
      const email = await emailService.getById(params.id);
      setEmail(email);
      const updatedEmail = { ...email, isRead: true };
      emailService.updateEmail(updatedEmail);
    } catch (e) {
      console.log("Failed to load email", e);
    }
  };

  console.log(email);
  return (
    <div className="email-details-cont">
      <Link to="/email" onClick={() => setIsEmailClick(false)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <h1>{email.subject}</h1>
      <div className="from">
        <div>
          <p>From : {email.from}</p>
          <p>To : me ({email.from})</p>
        </div>
        <p>At {formatRelativeTime(email.sentAt)}</p>
      </div>
      <h4>{email.body}</h4>
    </div>
  );
};

export default EmailDetails;
