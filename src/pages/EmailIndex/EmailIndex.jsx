import React, { useState } from "react";
import EmailFolderList from "../../cmpts/EmailFolderList";
import EmailFilter from "../../cmpts/EmailFilter";
import EmailList from "../../cmpts/EmailList";
import "./EmailIndex.css";

const EmailIndex = () => {
  const [filter, setFilter] = useState("");
  return (
    <div className="email-index">
      <EmailFolderList setFilter={setFilter}/>
      <main>
        <EmailFilter />
        <EmailList />
      </main>

    </div>
  );
};

export default EmailIndex;
