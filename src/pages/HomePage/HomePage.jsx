import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1>
        <span>Welcome</span>
        <span> to </span>
        <span> Mister</span>
        <span> Mail </span>!
      </h1>
      <h2>
        Your all-in-one destination for efficient and streamlined email
        management!
      </h2>
      <h3>
        Our platform offers a Gmail-inspired email experience with familiar
        features and enhancements to help you stay organized, connected, and
        productive. Whether you're a busy professional, a diligent student, or
        someone looking to simplify their communication, we've got everything
        you need.
      </h3>

      <Link
        to="/mail/inbox/edit?to=help@gmail.com&subject=Help"
        className={styles.quickSendLink}
      >
        Quick Send (Help)
      </Link>

      <Link to={"/misterEmailApp/email/inbox"} className={styles.emailPageLink}>
        <FontAwesomeIcon
          className={styles.mailHomeIcon}
          icon={faEnvelopesBulk}
        />{" "}
        To your email inbox.
      </Link>
      <Link to={"/misterEmailApp/about"} className={styles.aboutLink}>
        About us
      </Link>
    </div>
  );
};

export default HomePage;
