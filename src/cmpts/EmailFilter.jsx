import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const EmailFilter = ({ setFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setFilter((prevFilter) => ({ ...prevFilter, txt: searchTerm }));
  };

  const onSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setFilter((prevFilter) => ({ ...prevFilter, txt: e.target.value }));
  };

  const onSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      isRead:
        selectedValue === "read"
          ? true
          : selectedValue === "unread"
          ? false
          : null,
    }));
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
          onChange={onSearchInputChange}
        />
      </div>

      <select
        name="readStatus"
        onChange={(e) =>
          setFilter((prevFilter) => ({
            ...prevFilter,
            isRead:
              e.target.value === "read"
                ? true
                : e.target.value === "unread"
                ? false
                : null,
          }))
        }
      >
        <option value="">All</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>
    </form>
  );
};

export default EmailFilter;
