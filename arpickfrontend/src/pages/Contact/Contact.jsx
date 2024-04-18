import React from "react";
import Layout from "../../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contactImage from '../../components/Assets/contact.jpg'
import "./Contact.css"; // Import your CSS file for Contact component

const Contact = () => {
  return (
    <Layout title={"Contact - Logistics and Inventory Management System"}>
      <div className="contact-container">
        <div className="row">
          <div className="col-md-6">
            <img src={contactImage} alt="Contact" className="contact-image" />
          </div>
          <div className="col-md-4 contact-info">
            <h1 className="contact-title">CONTACT US</h1>
            <p className="contact-text">
              For any queries or information about our products, feel free to
              contact us anytime. We are available 24/7 to assist you.
            </p>
            <div className="contact-details">
              <p>
                <BiMailSend /> : arksahani3@gmail.com
              </p>
              <p>
                <BiPhoneCall /> : 012-3456789
              </p>
              <p>
                <BiSupport /> : 1800-0000-0000 (toll-free)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
