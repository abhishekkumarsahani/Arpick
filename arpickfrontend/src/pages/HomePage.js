import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div style={{marginTop: 65}}>
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default HomePage;
