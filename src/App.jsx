import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails/EmailDetails.jsx";
import EmailFilter from "./cmpts/EmailFilter/EmailFilter.jsx";
import { useState } from "react";
import { emailService } from "./services/email.service.js";
import styles from "./App.module.scss";
import UserMsg from "./cmpts/UserMsg/UserMsg.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  const [filter, setFilter] = useState(emailService.getDefaultFilter());
  const [isEmailClick, setIsEmailClick] = useState(false);

  const [canceledSent, setCancelSent] = useState(false);

  return (
    <Router>
      <div className={styles.emailApp}>
        <main>
          <header className={styles.search}>
            <EmailFilter filter={filter} setFilter={setFilter} />
          </header>
          <section className={styles.emailIndex}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/stat" element={<Dashboard />} />
              <Route
                path="/:filter"
                element={
                  <EmailIndex
                    filter={filter}
                    setFilter={setFilter}
                    canceledSent={canceledSent}
                    setCancelSent={setCancelSent}
                    isEmailClick={isEmailClick}
                    setIsEmailClick={setIsEmailClick}
                  />
                }
              >
                <Route
                  path="/:filter/:id"
                  element={
                    <EmailDetails
                      setIsEmailClick={setIsEmailClick}
                      filter={filter}
                    />
                  }
                ></Route>
              </Route>
            </Routes>
          </section>
        </main>
        <UserMsg
          setCancelSent={setCancelSent}
          setIsEmailClick={setIsEmailClick}
        />
      </div>
    </Router>
  );
}

export default App;
