import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_BASE_URL from "../../apiConfig";
import applogo from "../../components/Assets/applogo.png";

const SignUp = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [FullName, setFullName] = useState("");
  const [Role, setRole] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/Auth/SignUp`, {
        UserName,
        Email,
        FullName,
        Password,
        ConfirmPassword,
        Contact,
        Address,
        Role,
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
    <Layout title="Register - Arpick Logistics">
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee", marginTop: 15 }}
      >
        <div className="container py-5 h-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100"
            style={{ padding: 15 }}
          >
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center mb-5">
                        <img
                          src={applogo}
                          style={{ width: 185, margin: "auto" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Register New Account</h4>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="UserName"
                            required
                          />
                        </div>
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
                            type="text"
                            value={FullName}
                            onChange={(e) => setFullName(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="FullName"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="form2Example22"
                            className="form-control"
                            placeholder="ConfirmPassword"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            value={Contact}
                            onChange={(e) => setContact(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="Contact"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}
                            id="form2Example11"
                            className="form-control"
                            placeholder="Role"
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Our logistics and inventory management system offers
                        comprehensive solutions to streamline your operations.
                        From efficient order processing to real-time tracking of
                        inventory levels, we provide tools to optimize your
                        supply chain and enhance productivity. With advanced
                        features and user-friendly interfaces, managing your
                        logistics and inventory has never been easier. Join us
                        today and experience the power of seamless logistics
                        management.
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

export default SignUp;
