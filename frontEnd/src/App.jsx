import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AgentProvider } from "./context/AgentContext";
import HomePage from "./components/HomePage";
import AgentDetails from "./components/AgentDetails";

function App() {
  return (
    <AgentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agent-details" element={<AgentDetails />} />
        </Routes>
      </Router>
    </AgentProvider>
  );
}

export default App;



