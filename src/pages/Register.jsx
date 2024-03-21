import { useState } from "react";
import axios from "axios";
import config from "../config/config";
import {toast} from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { setTokenInLocalStore } = useAuth();
    const [user, setUser] = useState({
        username: "",
        password: "",
        contact: "",
        email: ""
    });
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
          const res = await axios.post(`${config.BASEURL}/auth/register`,user);
          if (res.data.status) {
            toast.success(res.data.message);
            setTokenInLocalStore(res.data.token);
            setUser({
              username: "",
              password: "",
              contact: "",
              email: ""
            });
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
          console.log("Error in API call: ",error);
        }
    }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.svg"
                  alt="registration image"
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      autoComplete="off"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact">Contact No.</label>
                    <input
                      type="number"
                      name="contact"
                      placeholder="contact"
                      id="contact"
                      autoComplete="off"
                      value={user.contact}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default Register;