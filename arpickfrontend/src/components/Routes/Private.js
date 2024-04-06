import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Assuming useAuth provides token information

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("auth");
    if (token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
