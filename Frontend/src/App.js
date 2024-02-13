import './App.css';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [user, setLoginUser] = useState("");

  return (
    <div className="App">
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage user={user} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register setLoginUser={setLoginUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
