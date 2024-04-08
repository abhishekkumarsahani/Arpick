import React, { useState } from "react";
import axios from "axios";
import "./PackageBooking.css";
import { useAuth } from "../../context/auth";
import Layout from "../Layout/Layout";
import hero_image from '../Assets/courier.jpg'

const PackageBooking = () => {
  const [auth] = useAuth();
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageWeight, setPackageWeight] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const userId = auth?.user?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:44337/api/Package/addpackage", {
        senderName,
        senderContact,
        senderAddress,
        receiverName,
        receiverContact,
        receiverAddress,
        packageName,
        packageWeight,
        userId: userId,
      });

      if (response.status === 200) {
        // Package booked successfully, trigger email notification
        const emailNotificationResponse = await axios.post("https://localhost:44337/api/Email/sendPackageBookingEmail", {
          toEmail: auth.user.email,
          bookingDetails: {
            pickupLocation: senderAddress,
            pickupTime: "Today, 3:00 PM" // Replace with actual pickup time
          }
        });

        if (emailNotificationResponse.status === 200) {
          setBookingStatus("Package booked successfully! An email notification has been sent.");
        } else {
          setBookingStatus("Package booked successfully! Failed to send email notification.");
        }
      } else {
        setBookingStatus("Failed to book package. Please try again.");
      }

      setSenderName("");
      setSenderAddress("");
      setSenderContact("");
      setReceiverContact("");
      setReceiverName("");
      setReceiverAddress("");
      setPackageName("");
      setPackageWeight("");
    } catch (error) {
      console.error("Error:", error);
      setBookingStatus("Failed to book package. Please try again.");
    }
  };

  return (
    <Layout title="Book package">
    <div className="container">
        <div className="hero-image">
        <img src={hero_image} alt="" />
        </div>
      <div className="form-container">
        <h2>Package Booking</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Sender Name:</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div>
            <label>Sender Contact:</label>
            <input
              type="text"
              value={senderContact}
              onChange={(e) => setSenderContact(e.target.value)}
            />
          </div>
          <div>
            <label>Sender Address:</label>
            <input
              type="text"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Receiver Name:</label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </div>
          <div>
            <label>Receiver Address:</label>
            <input
              type="text"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Receiver Contact:</label>
            <input
              type="text"
              value={receiverContact}
              onChange={(e) => setReceiverContact(e.target.value)}
            />
          </div>
          <div>
            <label>Package Name:</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </div>
          <div>
            <label>Package Weight:</label>
            <input
              type="text"
              value={packageWeight}
              onChange={(e) => setPackageWeight(e.target.value)}
            />
          </div>
          <button type="submit">Book Package</button>
        </form>
        {bookingStatus && <p className="message">{bookingStatus}</p>}
      </div>
    </div>
    </Layout>
  );
};

export default PackageBooking;
