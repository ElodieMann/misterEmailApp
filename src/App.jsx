import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails";
import EmailFolderList from "./cmpts/EmailFolderList";
import EmailFilter from "./cmpts/EmailFilter";
import { useState } from "react";
import EmailCompose from "./cmpts/EmailCompose.jsx";
import { emailService } from "./services/email.service.js";
import "./App.css";

function App() {
  const [filter, setFilter] = useState(emailService.getDefaultFilter());
  const [isComposeOpen, setIsComposeOpen] = useState({
    status: false,
    info: {},
  });


  return (
    <Router>
      <div className="email-index">
        <EmailFolderList
          setFilter={setFilter}
          isComposeOpen={isComposeOpen}
          setIsComposeOpen={setIsComposeOpen}
        />
        <main>
          <EmailFilter setFilter={setFilter} />

          {isComposeOpen.status && (
            <EmailCompose
              setIsComposeOpen={setIsComposeOpen}
              isComposeOpen={isComposeOpen}
            />
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/email/:filter"
              element={
                <EmailIndex
                  filter={filter}
                  setFilter={setFilter}
                  setIsComposeOpen={setIsComposeOpen}
                />
              }
            />
            <Route
              path="/email/details/:id"
              element={<EmailDetails filter={filter} />}
            />
            <Route
              path="/email/draft/:id"
              element={
                // In App.jsx
                <EmailCompose
                  isComposeOpen={isComposeOpen}
                  setIsComposeOpen={setIsComposeOpen}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
