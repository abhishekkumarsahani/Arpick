import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import applogo from "../../components/Assets/applogo.png";

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  // const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/Auth/SignIn`, {
        Email,
        Password,
        Role,
      });
      if (res && res.data.isSuccess) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.data,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login - Arpick Logistics">
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
                          style={{ width: 185, margin: "auto" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Login Your Account</h4>
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
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
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
                            Log in
                          </button>
                          <NavLink className="text-muted" to="/forgotpassword">
                            Forgot password?
                          </NavLink>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <NavLink className="text-muted" to="/signup">
                            Register
                          </NavLink>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Welcome back! Log in to your account to access our
                        comprehensive logistics and inventory management system.
                        With intuitive interfaces and advanced features,
                        managing your supply chain has never been easier. Stay
                        updated with real-time tracking and streamline your
                        operations effortlessly. Join us today and experience
                        seamless logistics management tailored to your needs.
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

export default SignIn;
