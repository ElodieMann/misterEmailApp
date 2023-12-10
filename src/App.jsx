import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailDetails from "./cmpts/EmailDetails";
import EmailFolderList from "./cmpts/EmailFolderList";
import EmailFilter from "./cmpts/EmailFilter";
import "./App.css";
import { useState } from "react";


function App() {
  const [emailData, setEmailData] = useState([]);

  

  const [filter, setFilter] = useState('inbox')
  return (
    <Router>
      <div className="email-index">
        <EmailFolderList filter={filter} setFilter={setFilter} emailData={emailData}/>
        <main>
          <EmailFilter />    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email/starred" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email/sent" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email/draft" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email/trash" element={<EmailIndex filter={filter} setEmailData={setEmailData} emailData={emailData}/>} />
            <Route path="/email/:id" element={<EmailDetails  />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
