import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../Assets/Product_Cart.svg'
import list_product_icon from '../Assets/Product_list_icon.svg'
import package_icon from '../Assets/package.svg'
import userpackage from '../Assets/userList.svg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/dashboard/admin/addproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/dashboard/admin/listproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
      <Link to={'/dashboard/admin/packagelist'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={package_icon} alt="" />
            <p>Package List</p>
        </div>
      </Link>
      <Link to={'/dashboard/admin/userlist'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <img src={userpackage} alt="" />
            <p>User List</p>
        </div>
      </Link>

      
    </div>
  )
}

export default Sidebar
