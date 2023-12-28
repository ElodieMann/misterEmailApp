import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import { emailService } from "../../services/email.service";
import { useSearchParams, useNavigate, NavLink } from "react-router-dom";

import styles from "./EmailFilter.module.scss";

const EmailFilter = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const txt = searchParams.get("txt");
    const sortByDate = searchParams.get("sortByDate");
    const sortBySubject = searchParams.get("sortBySubject");

    setFilter((prevFilter) => ({
      ...prevFilter,
      txt,
      sortByDate,
      sortBySubject,
    }));

    if (txt !== null && txt !== undefined) {
      setSearchTerm(txt);
    }
  }, [searchParams, setFilter]);

  const handleFilterChange = (newFilter) => {
    const params = new URLSearchParams();
  
    if (newFilter.txt !== undefined) params.set("txt", newFilter.txt);
    if (newFilter.sortByDate !== undefined) params.set("sortByDate", newFilter.sortByDate);
    if (newFilter.sortBySubject !== undefined) params.set("sortBySubject", newFilter.sortBySubject);
    if (newFilter.isRead !== undefined) params.set("isRead", newFilter.isRead);
  
    navigate(`?${params.toString()}`);
  
    const updatedFilter = emailService.getFilterFromSearchParams(params);
    setFilter(updatedFilter);
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleFilterChange({ ...filter, txt: searchTerm });
      setSearchTerm("");
    }
  };

  const onSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleFilterChange({ ...filter, txt: e.target.value });
  };

  const updateFilterAndNavigate = (sortByDateValue, sortBySubjectValue) => {
    handleFilterChange({
      sortByDate: sortByDateValue,
      sortBySubject: sortBySubjectValue,
    });
  };

  return (
    <div className={styles.filterCmpt}>
      <NavLink to="/inbox">
        <FontAwesomeIcon
          className={styles.mailHomeIcon}
          icon={faEnvelopesBulk}
        />
      </NavLink>
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
          <button onClick={() => updateFilterAndNavigate(true, false)}>
            Date
          </button>
          <button onClick={() => updateFilterAndNavigate(false, true)}>
            Subject
          </button>
          <button
            onClick={() => handleFilterChange(emailService.getDefaultFilter())}
          >
            Reset Search
          </button>
          <select
            name="readStatus"
            onChange={(e) =>
              handleFilterChange({
                ...filter,
                isRead:
                  e.target.value === "read"
                    ? true
                    : e.target.value === "unread"
                    ? false
                    : null,
              })
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
