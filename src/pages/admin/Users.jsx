import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../config/config';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const Users = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${config.BASEURL}/admin/users`,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );
      if (res.data.status) {
        setUsers(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(`Error in admin panel users API call ${error}`);
    }
  }
  const deleteUser = async (userId) => {
    var result = confirm("Are you sure to delete this item?");
    if (!result){
      return false;
    }
    try {
      const res = await axios.delete(
        `${config.BASEURL}/admin/user/delete/${userId}`,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );
      if (res.data.status) {
        toast.success(res.data.message);
        console.log(res.data);
        getAllUsers();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(`Error in admin panel delete users API call ${error}`);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data </h1>
        </div>
        <div className="container  admin-users">
          <table>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{++index}</td> */}
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>
                      <Link to={`/admin/users/edit/${user._id}`}>Edit</Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Users;