import React, { useState } from "react";
import EmailFolderList from "../../cmpts/EmailFolderList";
import "./EmailIndex.css";

const EmailIndex = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <EmailFolderList setFilter={setFilter}/>

    </div>
  );
};

export default EmailIndex;
