import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./components/Authentication/Loginpage";
import Registerpage from "./components/Authentication/Registerpage";
import Dashboard from './components/Dashboard';
import Forgetpassword from "./components/Authentication/Forgetpassword";
import Topheadlines from './components/Topheadlines'
import Business from './components/Category/Business'
import Search from './components/Search'
import Sports from "./components/Category/Sports";
import Science from "./components/Category/Science";
import Technology from "./components/Category/Technology";
import Health from "./components/Category/Health";
import General from "./components/Category/General";
import Entertainment from "./components/Category/Entertainment";
import Favourites from "./components/Favourites"
import ChangePassword from "./components/Changepassword";




function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
          <Route path="/loginpage" element={<Loginpage/>} />
          <Route path="/registerpage" element={<Registerpage/>} />
          <Route path="/dashboardpage" element={<Dashboard/>} />
          <Route path="/topheadlines" element={<Topheadlines/>} />
          <Route path="/businessnews" element={<Business/>} />
          <Route path="/sportsnews" element={<Sports/>} />
          <Route path="/sciencenews" element={<Science/>} />
          <Route path="/technologynews" element={<Technology/>} />
          <Route path="/healthnews" element={<Health/>} />
          <Route path="/generalnews" element={<General/>} />
          <Route path="/entertainmentnews" element={<Entertainment/>} />
          <Route path="/forgetpassword" element={<Forgetpassword/>} />
          <Route path="/favoritespage" element={<Favourites/>} />
          <Route path="/searching/:value" element={<Search/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
