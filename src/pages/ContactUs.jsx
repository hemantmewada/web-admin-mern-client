import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  email: "",
  message: ""
};
const ContactUs = () => {
  const { user } = useAuth();

  const [contact, setContact] = useState(initialState);

  
  useEffect(() => {
    if (user) {
      setContact({
        ...contact,
        username: user.username || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.BASEURL}/contact/store`,contact);
      if (res.data.status) {
        toast.success(res.data.message);
        setContact(initialState);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(`Error in API call: ${error}`);
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact-us.svg" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  placeholder="enter username"
                  value={contact.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter email address"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  cols="30"
                  rows="6"
                  placeholder="enter some message"
                  value={contact.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3673.2779091727393!2d76.03400707505091!3d22.976805918035073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDU4JzM2LjUiTiA3NsKwMDInMTEuNyJF!5e0!3m2!1sen!2sin!4v1710919140392!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
        </section>
      </section>
    </>
  );
};


export default ContactUs;