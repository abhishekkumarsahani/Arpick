import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        {/* Branding */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/013/068/247/non_2x/logistics-logo-design-arrow-icon-with-a-creative-and-simple-concept-vector.jpg"
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/shipments">
                Shipments
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
                <li className="nav-item">
                  <NavLink
                    onClick={handleLogout}
                    to="/signin"
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}

            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
