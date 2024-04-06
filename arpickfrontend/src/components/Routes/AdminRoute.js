import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Assuming useAuth provides user information including role

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (auth?.token && auth?.user?.role === "admin") {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.token, auth?.user?.role]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
