import React from "react";
import Layout from "../../components/Layout/Layout";
import policyImage from '../../components/Assets/policy.jpg'
import "./Policy.css"; // Import your CSS file for Policy component

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Logistics and Inventory Management System"}>
      <div className="policy-container">
        <div className="row">
          <div className="col-md-6">
            <img src={policyImage} alt="Policy" className="policy-image" />
          </div>
          <div className="col-md-4 policy-info">
            <p>
              Welcome to our Logistics and Inventory Management System's Privacy
              Policy. Your privacy is important to us, and we are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you interact with our system.
            </p>
            <h3>Information We Collect</h3>
            <p>
              We collect information that you provide to us voluntarily, such as
              your name, email address, and other personal details when you use
              our system.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
