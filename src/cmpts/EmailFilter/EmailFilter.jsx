import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { emailService } from "../../services/email.service";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./EmailFilter.module.scss";

const EmailFilter = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const txt = searchParams.get("txt");
    const date = searchParams.get("date");
    const sortByDate = searchParams.get("sortByDate");
    const sortBySubject = searchParams.get("sortBySubject");

    setFilter((prevFilter) => ({
      ...prevFilter,
      txt,
      date,
      sortByDate,
      sortBySubject,
    }));
  }, [searchParams, setFilter]);

  const handleFilterChange = (newFilter) => {
    const updatedFilter = {
      ...filter,
      ...newFilter,
      status: filter.status,
    };

    setFilter(updatedFilter);

    const params = new URLSearchParams();
    if (newFilter.txt) params.set("txt", newFilter.txt);
    if (newFilter.sortByDate) params.set("sortByDate", newFilter.sortByDate);
    if (newFilter.sortBySubject)
      params.set("sortBySubject", newFilter.sortBySubject);

    navigate(`?${params.toString()}`);
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
