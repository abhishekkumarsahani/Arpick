import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import applogo from "../../components/Assets/applogo.png";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [ChangePassword, setChangePassword] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:44337/api/Auth/ForgotPassword", {
        Email,
        ChangePassword,
      });
      if (res && res.data.isSuccess) {
        toast.success(res.data && res.data.message);
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="ForgotPassword - Arpick Logistics">
      <section
        className="h-100 gradient-forms"
        style={{ backgroundColor: "#eee", marginTop: 30 }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={applogo}
                          style={{ width: 185,margin: "auto" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Change your Password</h4>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            value={ChangePassword}
                            onChange={(e) => setChangePassword(e.target.value)}
                            id="form2Example22"
                            className="form-control"
                            placeholder="New Password"
                          />
                        </div>
                        
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Change Password
                          </button>
                          
                        </div>
                        
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                      Changing your password ensures the security of your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
