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
  const [isComposeOpen, setIsComposeOpen] = useState(false);
console.log(filter);


  return (
    <Router>
      <div className="email-index">
        <EmailFolderList
          setFilter={setFilter}
          setIsComposeOpen={setIsComposeOpen}
        />
        <main>
          <EmailFilter setFilter={setFilter} />

          {isComposeOpen && (
            <EmailCompose setIsComposeOpen={setIsComposeOpen} />
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/email/:filter"
              element={<EmailIndex filter={filter} setFilter={setFilter}/>}
            />
            <Route path="/email/details/:id" element={<EmailDetails filter={filter} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
