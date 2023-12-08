import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>
        <span style={{ color: "red" }}>Welcome</span>{" "}
        <span style={{ color: "yellow" }}>to </span>{" "}
        <span style={{ color: "blue" }}>Mister</span>{" "}
        <span style={{ color: "green" }}>Mail </span>!
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

      <Link to={"/email"} className="email-page-link">
        <FontAwesomeIcon className="mail-home-icon" icon={faEnvelopesBulk} />{" "}
        To your email inbox.
      </Link>
      <Link to={"/about"} className="about-link">
        About us
      </Link>
    </div>
  );
};

export default HomePage;
