import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { AboutUs } from "./pages/AboutUs";
import { HomePage } from "./pages/HomePage";
import { EmailIndex } from "./pages/EmailIndex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/email" element={<EmailIndex />} />
      </Routes>
    </Router>
  );
}

export default App;
