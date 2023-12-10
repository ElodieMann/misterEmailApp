import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const EmailFilter = ({ setInputSearch, setShowEmailUnread }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setInputSearch(searchTerm);
    setSearchTerm(""); 
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          name="txt"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        name="readStatus"
        onChange={(e) => setShowEmailUnread(e.target.value)}
      >
        <option value="">All</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>
    </form>
  );
};

export default EmailFilter;
