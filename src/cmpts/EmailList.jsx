import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import EmailPreview from "./EmailPreview";

const EmailList = ({
  setIsEmailClick,
  filter,
  setFilter,
  setIsComposeOpen,
  emailData,
  setEmailData
}) => {
  const [isDelete, setIsDelete] = useState("");
  
console.log(emailData);
  useEffect(() => {
    getAllEmail();
  }, [filter, isDelete]);

  const getAllEmail = async () => {
    try {
      const data = await emailService.getAllEmail(filter);
      setEmailData(data);
    } catch (e) {
      console.log("Failed to load Email", e);
    }
  };


  // const sortByDate = () => {
  //   const sortedData = [...emailData]
  //     .flat()
  //     .sort((a, b) => b.sentAt - a.sentAt);
  //   setEmailData(sortedData);
  // };

  // const sortByTitle = () => {
  //   const sortedData = [...emailData]
  //     .flat()
  //     .sort((a, b) => a.subject.localeCompare(b.subject));
  //   setEmailData(sortedData);
  // };

  return (
    <section>
      {/* <div className="btn-filter">
        <button onClick={sortByDate}>Date</button>
        <button onClick={sortByTitle}>Subject</button>
        <button onClick={() => setFilter(emailService.getDefaultFilter())}>
          Reset Search
        </button>
      </div> */}
      {emailData?.length > 0 ? (
        emailData.map((email, index) => (
          <div key={index}>
            <EmailPreview
              key={email.id}
              email={email}
              setIsEmailClick={setIsEmailClick}
              setIsDelete={setIsDelete}
              filter={filter}
              setIsComposeOpen={setIsComposeOpen}
            />
          </div>
        ))
      ) : (
        <p>No Email</p>
      )}
    </section>
  );
};

export default EmailList;
