import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const EmailFilter = ({ setFilter, emailData, setEmailData }) => {
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
  const sortByDate = () => {
    const sortedData = [...emailData]
      .flat()
      .sort((a, b) => b.sentAt - a.sentAt);
    setEmailData(sortedData);
  };

  const sortByTitle = () => {
    const sortedData = [...emailData]
      .flat()
      .sort((a, b) => a.subject.localeCompare(b.subject));
    setEmailData(sortedData);
  };

  return (
    <div className="filter-cmpt">
      <form className="form-search" onSubmit={onSubmit}>
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
          className="input-search"
            type="text"
            placeholder="Search"
            name="txt"
            value={searchTerm}
            onChange={onSearchInputChange}
          />
        </div>

        <div className="btn-filter">
          <button onClick={sortByDate}>Date</button>
          <button onClick={sortByTitle}>Subject</button>
          <button onClick={() => setFilter(emailService.getDefaultFilter())}>
            Reset Search
          </button>
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
        </div>
      </form>
    </div>
  );
};

export default EmailFilter;
