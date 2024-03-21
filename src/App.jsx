import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from './pages/Services';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Logout from "./components/Logout";
import AdminLayout from "./components/admin/AdminLayout";
import Users from './pages/admin/Users';
import Contacts from './pages/admin/Contacts';
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/EditUser";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="users/edit/:_id" element={<EditUser />} />
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <ToastContainer autoClose={2000} /> */}
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored"
      bodyClassName="toastBody"
      // transition="Bounce"
      />
      <Footer />
    </BrowserRouter>
  )
}

export default App
