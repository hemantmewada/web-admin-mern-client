import React from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useAuth } from '../../store/auth';

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />
  }
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/service">
                  <FaRegListAlt /> Services
                </NavLink>
              </li> */}

              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default AdminLayout;