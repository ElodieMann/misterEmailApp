import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails/EmailDetails.jsx";
import EmailFolderList from "./cmpts/EmailFolderList/EmailFolderList.jsx";
import EmailFilter from "./cmpts/EmailFilter/EmailFilter.jsx";
import { useState, useEffect } from "react";
import EmailCompose from "./cmpts/EmailCompose/EmailCompose.jsx";
import { emailService } from "./services/email.service.js";
import styles from "./App.module.scss";

function App() {
  const [filter, setFilter] = useState(emailService.getDefaultFilter());
  const [emailData, setEmailData] = useState([]);

  const [isComposeOpen, setIsComposeOpen] = useState({
    status: false,
    info: {},
  });


  return (
    <Router>
      <div className={styles.emailApp}>
        <EmailFolderList
          setFilter={setFilter}
          setIsComposeOpen={setIsComposeOpen}
        />
        <main>
          <div className={styles.search}>
            <EmailFilter
              filter={filter}
              setFilter={setFilter}
              emailData={emailData}
              setEmailData={setEmailData}
            />
          </div>
          <div className={styles.emailIndex}>
            {isComposeOpen.status && (
              <EmailCompose
                setIsComposeOpen={setIsComposeOpen}
                isComposeOpen={isComposeOpen}
              />
            )}
            <Routes>
              <Route path="/misterEmailApp" element={<HomePage />} />
              <Route path="/misterEmailApp/about" element={<AboutUs />} />
              <Route
                path="/misterEmailApp/email/:filter"
                element={
                  <EmailIndex
                    filter={filter}
                    setFilter={setFilter}
                    isComposeOpen={isComposeOpen}
                    setIsComposeOpen={setIsComposeOpen}
                    emailData={emailData}
                    setEmailData={setEmailData}
                  />
                }
              />
              <Route
                path="/misterEmailApp/email/details/:id"
                element={<EmailDetails setIsComposeOpen={setIsComposeOpen} />}
              />
              <Route
                path="/misterEmailApp/email/draft/:id"
                element={<EmailCompose />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
