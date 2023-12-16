import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./EmailFilter.module.scss";

const EmailFilter = ({ filter, setFilter, emailData, setEmailData }) => {
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
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortByDate: true,
      sortBySubject: false,
    }));
  };

  const sortBySubject = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortByDate: false,
      sortBySubject: true,
    }));
  };

  return (
    <div className={styles.filterCmpt}>
      <form className={styles.formSearch} onSubmit={onSubmit}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search"
            name="txt"
            value={searchTerm}
            onChange={onSearchInputChange}
          />
        </div>

        <div className={styles.btnFilter}>
          <button onClick={sortByDate}>Date</button>
          <button onClick={sortBySubject}>Subject</button>
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