import React from "react";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <Layout title="Admin Dashboard">
      <div style={{ marginTop: 65 }}>
        <Sidebar />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
