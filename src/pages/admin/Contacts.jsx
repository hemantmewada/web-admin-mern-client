import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../config/config';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

const Contacts = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const res = await axios.get(
        `${config.BASEURL}/admin/contacts`,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );
      if (res.data.status) {
        setContacts(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(`Error in admin panel users API call ${error}`);
    }
  }
  const deleteContact = async (_id) => {
    var result = confirm("Are you sure to delete this item?");
    if (!result){
      return false;
    }
    try {
      const res = await axios.delete(
        `${config.BASEURL}/admin/contacts/delete`,
        // {_id},
        {
          headers : {
            Authorization : `Bearer ${token}`
          },
          data: {
            _id
          }
        }
      );
      // const res = await axios.request({
      //   method: 'DELETE',
      //   url: `${config.BASEURL}/admin/contacts/delete`,
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   },
      //   data: { _id } // Send _id in the request body
      // });
      if (res.data.status) {
        toast.success(res.data.message);
        getAllContacts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(`Error in delete ${error}`);
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data </h1>

        <div className="container  admin-users">
          {contacts.map((contact, index) => {
            const { username, email, message, _id } = contact;

            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContact(_id)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Contacts
