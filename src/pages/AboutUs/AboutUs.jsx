import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      <Link to={"/misterEmailApp"} className={styles.backBtn}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Back
      </Link>
      <h1>About Us</h1>
      <p>
        Welcome to Mister Mail, where email management meets simplicity and
        efficiency!
      </p>
      <h2 className={styles.redText}>Our Mission</h2>
      <p>
        At Mister Mail, our mission is to provide you with an unparalleled email
        experience. We understand that effective communication is the
        cornerstone of productivity, and that's why we've crafted a platform
        inspired by the best, with features designed to make your email
        management seamless.
      </p>
      <h2 className={styles.yellowText}>What Sets Us Apart</h2>
      <ul>
        <li>
          <span>Intuitive Design: </span>Our user-friendly interface ensures
          that you can effortlessly navigate through your emails, making the
          management process a breeze.
        </li>
        <li>
          <span>Innovative Features: </span>We've incorporated innovative
          features inspired by industry leaders, enhancing your email experience
          and keeping you ahead in the fast-paced digital world.
        </li>
        <li>
          <span>Privacy and Security: </span>Your privacy is our priority.
          Mister Mail employs robust security measures to safeguard your
          sensitive information, giving you peace of mind.
        </li>
      </ul>
      <h2 className={styles.greenText}>Meet the Team</h2>
      <p>
        Behind every line of code and user interface design, there's a dedicated
        team passionate about simplifying your digital communication. We believe
        in the power of efficient email management to transform the way you work
        and connect.
      </p>
      <h2 className={styles.blueText}>Get in Touch</h2>
      <p>
        Have questions or feedback? We'd love to hear from you! Reach out to our
        support team at support@mistermail.com for assistance. Thank you for
        choosing Mister Mail. Here's to organized, efficient, and stress-free
        email management!
      </p>
    </div>
  );
};

export default AboutUs;
