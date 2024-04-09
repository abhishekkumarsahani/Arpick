import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css"; // Import CSS file
import { useAuth } from "../../context/auth";
import Layout from "../Layout/Layout";

const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = auth?.user?.userId;
      const response = await axios.post(
        "https://localhost:44337/api/Feedback/addfeedback",
        { userId, comment }
      );
      console.log(response.data);
      // Reset form after successful submission
      setComment("");
      alert("Feedback submitted successfully.");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Layout title="Feedback Page">
      <div className="feedback-form-container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </Layout>
  );
};

export default FeedbackForm;
