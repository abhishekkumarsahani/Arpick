import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/ShopContext";
import { Badge } from "antd";
import applogo from '../Assets/applogo.png'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { getTotalCartItems } = useContext(ShopContext);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cartItems");
    toast.success("Logout Successfully");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        {/* Branding */}
        <img
          src={applogo}
          style={{ width: 120, height: 50 }}
          alt="logo"
        />

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                style={{ border: "none" }}
              >
                Services
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/booking">
                    Package Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/cost-estimation">
                    Pricing and Cost Estimation
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/feedback">
                    Feedback
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/route">
                    Route Optimization
                  </NavLink>
                </li>
                {/* Add more NavLink components for other logistics features */}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/chat">
                ChatService
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tracking">
                Tracking
              </NavLink>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.email}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === "admin" ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/signin"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <Badge count={getTotalCartItems()} showZero offset={[10, -5]}>
                  Cart
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
