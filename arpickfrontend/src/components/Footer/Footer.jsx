import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>ARPICK</p>
      </div>
      <ul className="footer-links">
        <li>
          <Link to="/policy" className="footer-link">
            Company
          </Link>
        </li>
        <li>
          <Link to="/" className="footer-link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/about" className="footer-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
        </li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyroght @2023 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
