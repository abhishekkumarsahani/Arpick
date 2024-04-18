import React, { useEffect, useState } from 'react';
import './PackageList.css';
import crossIcon from '../Assets/cross_icon.png';
import Layout from '../Layout/Layout';

const PackageList = () => {
  const [allPackages, setAllPackages] = useState([]);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      const response = await fetch('https://localhost:44337/api/Admin/allpackages');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setAllPackages(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const removePackage = async (id) => {
    try {
      if (!id) {
        throw new Error('Package ID is undefined');
      }
  
      await fetch(`https://localhost:44337/api/Admin/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      fetchPackages();
    } catch (error) {
      setError('Failed to remove package: ' + error.message);
    }
  };
  
  return (
    <Layout title="Admin-ListPackagePage">
      <div className='list-package'>
        <h1>All Package List</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="listpackage-format-main">
          <p>Sender Name</p>
          <p>Sender Address</p>
          <p>Sender Contact</p>
          <p>Receiver Name</p>
          <p>Receiver Address</p>
          <p>Receiver Contact</p>
          <p>Package Weight</p>
          <p>Package Name</p>
          <p>User Id</p>
          <p>Remove</p>
        </div>
        <div className="listpackage-allpackages">
          {allPackages.map((packages, index) => (
            <div key={index} className="listpackage-format-main listpackage-format">
              <p>{packages.senderName}</p>
              <p>{packages.senderAddress}</p>
              <p>{packages.senderContact}</p>
              <p>{packages.receiverName}</p>
              <p>{packages.receiverAddress}</p>
              <p>{packages.receiverContact}</p>
              <p>{packages.packageWeight}</p>
              <p>{packages.packageName}</p>
              <p>{packages.userId}</p>
              <img onClick={() => removePackage(packages.id)} src={crossIcon} alt="" className="listpackage-remove-icon" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PackageList;
