import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails/EmailDetails.jsx";
import EmailFolderList from "./cmpts/EmailFolderList/EmailFolderList.jsx";
import EmailFilter from "./cmpts/EmailFilter/EmailFilter.jsx";
import { useState } from "react";
import EmailCompose from "./cmpts/EmailCompose/EmailCompose.jsx";
import { emailService } from "./services/email.service.js";
import styles from "./App.module.scss";
import UserMsg from "./cmpts/UserMsg/UserMsg.jsx";

function App() {
  const [filter, setFilter] = useState(emailService.getDefaultFilter());

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
            <EmailFilter setFilter={setFilter} />
          </div>
          <div className={styles.emailIndex}>
            {isComposeOpen.status && (
              <EmailCompose
                isComposeOpen={isComposeOpen}
                setIsComposeOpen={setIsComposeOpen}
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
                    isComposeOpen={isComposeOpen}
                    setIsComposeOpen={setIsComposeOpen}
                  />
                }
              />
              <Route
                path="/misterEmailApp/email/details/:id"
                element={<EmailDetails />}
              />
              <Route
                path="/misterEmailApp/email/draft/:id"
                element={<EmailCompose />}
              />
            </Routes>

          </div>
        </main>
            <UserMsg />
      </div>
    </Router>
  );
}

export default App;
