import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const handleLogout = () => {

  }
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">MERN</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about-us"> About </NavLink>
              </li>
              {/* <li>
                <NavLink to="/services"> Services </NavLink>
              </li> */}
              <li>
                <NavLink to="/contact-us"> Contact </NavLink>
              </li>
              {
                isLoggedIn ? (
                  <>
                    <li>
                      <NavLink to="/admin">admin</NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout">Logout</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/register"> Register </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login"> Login </NavLink>
                    </li>
                  </>
                )
              }
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;