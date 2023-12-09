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
  const [filter, setFilter] = useState('inbox')
  return (
    <Router>
      <div className="email-index">
        <EmailFolderList setFilter={setFilter} />
        <main>
          <EmailFilter />    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email" element={<EmailIndex filter={filter}/>} />
            <Route path="/email/:id" element={<EmailDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
