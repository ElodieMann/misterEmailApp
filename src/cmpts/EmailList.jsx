import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";

const EmailList = ({setIsEmailClick}) => {
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    getAllEmail();
  }, []);

  const getAllEmail = async () => {
    try {
      await emailService.initEmails();
      await emailService.initLoggedInUser();
      const data = await emailService.getAllEmail();

      // Aplatir la structure avant de trier
      const flattenedData = data.flat();

      // Trier les emails par date décroissante
      const sortedData = flattenedData.sort((a, b) => b.sentAt - a.sentAt);

      setEmailData([sortedData]); // Mettez le résultat dans un tableau pour éviter l'imbriquement
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };


  return (
    <section>
      {emailData.length > 0 ? (
        emailData.map((emailList, index) => (
          <div key={index}>
            {emailList.map((email) => (
              <EmailPreview key={email.id} email={email} setIsEmailClick={setIsEmailClick} />
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
