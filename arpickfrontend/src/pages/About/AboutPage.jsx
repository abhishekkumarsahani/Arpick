import React from "react";
import Layout from "../../components/Layout/Layout";
import aboutimage from '../../components/Assets/about.jpg'
import "./About.css"; // Import your CSS file for About component

const About = () => {
  return (
    <Layout title={"About - Logistics and Inventory Management System"}>
      <div className="about-container">
        <div className="row">
          <div className="col-md-6">
            <img src={aboutimage} alt="About" className="about-image" />
          </div>
          <div className="col-md-6 about-content">
            <h2>About Us</h2>
            <p>
              Welcome to the Logistics and Inventory Management System, your
              go-to destination for efficient logistics and inventory
              solutions. We are committed to streamlining your supply chain
              processes and optimizing your inventory management practices.
            </p>
            <p>
              At Logistics and Inventory Management System, we understand the
              importance of seamless logistics operations and effective
              inventory management for the success of your business. Our team
              is dedicated to providing innovative solutions tailored to meet
              your logistics and inventory needs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;
