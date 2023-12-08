import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";

const EmailList = () => {
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    getAllEmail();
  }, []);

  const getAllEmail = async () => {
    try {
      await emailService.initEmails();
      await emailService.initLoggedInUser();
      const data = await emailService.getAllEmail();
      setEmailData(data);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };

  console.log(emailData);

  return (
    <section>
      {emailData.length > 0 ? (
        emailData.map((emailList, index) => (
          <div key={index}>
            {emailList.map((email) => (
              <EmailPreview key={email.id} email={email} />
            ))}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default EmailList;
