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
  const [emailData, setEmailData] = useState([]);

  const [isComposeOpen, setIsComposeOpen] = useState({
    status: false,
    info: {},
  });


  return (
    <Router>
      <div className="email-index">
        <EmailFolderList
          setFilter={setFilter}
          setIsComposeOpen={setIsComposeOpen}
        />
        <main>
          <EmailFilter
            filter={filter}
            setFilter={setFilter}
            emailData={emailData}
            setEmailData={setEmailData}
          />

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
        </main>
      </div>
    </Router>
  );
}

export default App;
