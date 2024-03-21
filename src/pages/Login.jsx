import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () => {
  const { setTokenInLocalStore, loginLogout } = useAuth();
  const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
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
          const res = await axios.post(`${config.BASEURL}/auth/login`,user);
          if (res.data.status) {
            toast.success(res.data.message);
            setTokenInLocalStore(res.data.token);
            setTimeout(() => {
              navigate("/");
            }, 2000);
            loginLogout(true);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(`Error in login API call ${error}`);
          toast.error(error?.response?.data.message);
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
                  src="/images/login.svg"
                  alt=" let's fill the login form "
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
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

                  <br />
                  <button type="submit" className="btn btn-submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};


export default Login
