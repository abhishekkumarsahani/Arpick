import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu/UserMenu";

const Dashboard = () => {
  return (
    <Layout>
      <div style={{ marginTop: 65 }}>
        <UserMenu/>
      </div>
    </Layout>
  );
};

export default Dashboard;
