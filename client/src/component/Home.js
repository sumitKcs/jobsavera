import React from "react";
import Footer from "./Footer";
import Jobs from "./Jobs";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Search from "./Search";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <TopBar />
      <Search />
      <Jobs />
      <Pagination />
      <Footer />
    </>
  );
};

export default Home;
