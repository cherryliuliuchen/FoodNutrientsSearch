import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import FoodDetailPage from './pages/FoodDetailPage';
import AccountPage from './pages/AccountPage';
import MyFoodPage from './pages/MyFoodPage';
import MyInformationPage from './pages/MyInformationPage';
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if the token exists
};

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      setLoggedIn(true);
    } else if (!token && loggedIn) {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Flexbox */}
      <MyNavbar loggedIn={loggedIn} /> 
      <div className="flex-grow-1 main-content"> {/* Make the content fill the remaining space on the page */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/food/:fdcId" element={<FoodDetailPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my-food" element={<MyFoodPage />} />
          <Route path="/my-information" element={<MyInformationPage />} />
        </Routes>
      </div>
      <Footer className="mt-auto" /> 让 Footer 贴底
    </div>
  );
}

export default App;
