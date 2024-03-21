import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config/config';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        contact: "",
        email: ""
    });
    const {_id} = useParams();

    const getSingleUser = async () => {
        try {
            const res = await axios.get(
                `${config.BASEURL}/admin/users/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.status) {
                setUser({
                    username: res.data.data.username,
                    contact: res.data.data.contact,
                    email: res.data.data.email
                });
            }
        } catch (error) {
            console.log(`Error in getSingleUser API: ${error}`);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(
                `${config.BASEURL}/admin/users/update/${_id}`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.status) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/admin/users");
                }, 2000);
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("error",error);
            toast.error(error.response.data.message);
            console.log(`Error in update single user API: ${error}`);
        }
    }

    useEffect(() => {
        getSingleUser();
    }, []);
    

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        {/* contact form content actual  */}
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="contact">Contact</label>
              <input
                type="contact"
                name="contact"
                id="contact"
                autoComplete="off"
                value={user.contact}
                onChange={handleChange}
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}

export default EditUser
