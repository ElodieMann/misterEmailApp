import React from "react";
import EmailPreview from "../EmailPreview/EmailPreview.jsx";

const EmailList = ({
  setIsEmailClick,
  filter,
  setIsComposeOpen,
  emailData,
  favorites,
  setFavorites,
  setIsDelete,
}) => {


  return (
    <>
      {emailData?.length > 0 ? (
        emailData.map((email) => (
          <EmailPreview
            key={email.id}
            email={email}
            setIsEmailClick={setIsEmailClick}
            setIsDelete={setIsDelete}
            setIsComposeOpen={setIsComposeOpen}
            filter={filter}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        ))
      ) : (
        <p>No Email</p>
      )}
    </>
  );
};

export default EmailList;
