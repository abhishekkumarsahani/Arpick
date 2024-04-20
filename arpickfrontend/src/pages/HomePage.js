import React from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offfers";
import NewCollection from "../components/NewCollection/NewCollection";
const HomePage = () => {
  return (
    <Layout title="Home Page - Arpick Logistics">
      <div style={{marginTop: 65}}>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollection/>
      </div>
    </Layout>
  );
};

export default HomePage;
