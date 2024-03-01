import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import ForgotPassword from './pages/Auth/ForgotPassword';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
    </>
  );
}

export default App;
