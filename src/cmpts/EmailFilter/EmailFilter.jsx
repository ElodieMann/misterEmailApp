import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelopesBulk, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { emailService } from "../../services/email.service";
import { useSearchParams, useNavigate, NavLink } from "react-router-dom";
import { useForm } from '../../customHooks/useForm';
import { useEffectUpdate } from '../../customHooks/useEffectUpdate';
import styles from "./EmailFilter.module.scss";

const EmailFilter = ({ filter, setFilter }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formFields, handleInputChange, setFields] = useForm({ txt: '' });

  useEffect(() => {
    const filterFromParams = emailService.getFilterFromSearchParams(searchParams);
    setFilter((prevFilter) => ({ ...prevFilter, ...filterFromParams }));
    setFields({ txt: filterFromParams.txt ?? '' });  
  }, [searchParams, setFilter]);

 
  useEffectUpdate(() => {
    if (formFields.txt !== undefined) {
      handleFilterChange({ ...filter, txt: formFields.txt });
    }
  }, [formFields]);

  const handleFilterChange = (newFilter) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
    updateSearchParams(updatedFilter);
  };

  const updateSearchParams = (updatedFilter) => {
    const params = new URLSearchParams();
    if (updatedFilter.txt) params.set("txt", updatedFilter.txt);
    if (updatedFilter.sortByDate) params.set("sortByDate", updatedFilter.sortByDate);
    if (updatedFilter.sortBySubject) params.set("sortBySubject", updatedFilter.sortBySubject);
    navigate(`?${params.toString()}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
        <FontAwesomeIcon className={styles.mailHomeIcon} icon={faEnvelopesBulk} />
      </NavLink>
      <form className={styles.formSearch} onSubmit={(onSubmit)}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search"
            name="txt"
            value={formFields.txt}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.btnFilter}>
          <button onClick={() => updateFilterAndNavigate(true, false)}>Date</button>
          <button onClick={() => updateFilterAndNavigate(false, true)}>Subject</button>
          <button onClick={() => {
              handleFilterChange(emailService.getDefaultFilter());
              setFields({ txt: '' });  
          }}>
            Reset Search
          </button>
          <select
            name="readStatus"
            onChange={(e) =>
              handleFilterChange({
                ...filter,
                isRead: e.target.value === "read" ? true : e.target.value === "unread" ? false : null,
              })
            }
          >
            <option value="">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        <button onClick={() =>  navigate(`/stat`)}><FontAwesomeIcon icon={faChartSimple} /></button>
        </div>

      </form>

    </div>
  );
};

export default EmailFilter;
