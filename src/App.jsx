import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails";
import EmailFolderList from "./cmpts/EmailFolderList";
import EmailFilter from "./cmpts/EmailFilter";
import "./App.css";
import { useState } from "react";
import * as keys from './config/keys.js'
import EmailCompose from "./cmpts/EmailCompose.jsx";

function App() {
  const [emailData, setEmailData] = useState([]);
  const [filter, setFilter] = useState(keys.INBOX_FILTER);
  const [showEmailUnread, setShowEmailUnread] = useState("");
  const [inputSearch, setInputSearch] = useState('')
  const [isComposeOpen,setIsComposeOpen] = useState(false)

  return (
    <Router>
      <div className="email-index">
        <EmailFolderList
          filter={filter}
          setFilter={setFilter}
          emailData={emailData}
          setIsComposeOpen={setIsComposeOpen}
        />
        <main>
          <EmailFilter setShowEmailUnread={setShowEmailUnread} setInputSearch={setInputSearch}/>


          {isComposeOpen && <EmailCompose setIsComposeOpen={setIsComposeOpen} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/email/:filter"
              element={
                <EmailIndex
                  showEmailUnread={showEmailUnread}
                  filter={filter}
                  setEmailData={setEmailData}
                  emailData={emailData}
                  inputSearch={inputSearch}
                />
              }
            />
            <Route path="/email/details/:id" element={<EmailDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
