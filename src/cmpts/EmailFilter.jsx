import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const EmailFilter = () => {
    return (
        <form>
            <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Search" />
            </div>
        </form>
    );
};

export default EmailFilter;
