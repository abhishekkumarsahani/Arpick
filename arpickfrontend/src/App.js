import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import ListProduct from "./components/ListProduct/ListProduct";
import PackageBooking from "./components/PackageBooking/PackageBooking";
import FareCalculator from "./components/FareCalculator/FareCalculator";
import FeedbackForm from "./components/Feedback/Feedback";
import RouteOptimization from "./components/RouteOptimization/RouteOptimization";
import UserDetail from "./pages/User/Profile/Profile";
import PackageList from "./components/PackageList/PackageList"
import UserList from "./pages/Admin/UserList/UserList";
import About from "./pages/About/AboutPage";
import Contact from "./pages/Contact/Contact";
import Policy from "./pages/Policy/Policy";
import ChatService from "./pages/ChatService";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserDetail />} />

        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/addproduct" element={<AddProduct/>} />
          <Route path="admin/listproduct" element={<ListProduct/>} />
          <Route path="admin/packagelist" element={<PackageList/>} />
          <Route path="admin/userlist" element={<UserList/>} />
        </Route>
        <Route path="/products" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/booking" element={<PackageBooking />} />
        <Route path="/cost-estimation" element={<FareCalculator />} />
        <Route path="/feedback" element={<FeedbackForm/>} />
        <Route path="/route" element={<RouteOptimization/>} />
        <Route path="/chat" element={<ChatService/>} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
