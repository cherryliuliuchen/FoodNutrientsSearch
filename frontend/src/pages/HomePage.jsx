import React from "react";
import SearchBar from "../components/HomePage/SearchBar";

const HomePage = () => {
  return (
    <div className="container text-center mt-5" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
      <h1 className="mb-4 fw-bold" style={{ color: "#fda77b" }}>
        Search for your favorite food
      </h1>
      <SearchBar />
    </div>
  );
};

export default HomePage;
