import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const EmailFilter = ({ setShowEmailUnread }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search" name="txt" />
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
