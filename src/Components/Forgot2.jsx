import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Forgot2() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://examination-portal-nhe6.onrender.com/login/email2', { email });
      if (response.status === 200) {
        toast.success("email sent successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending the password reset email.");
    }
  };

  return (
    <>
      <div className="new3">
        <h1 className="head">
          <marquee width="60%" direction="right" height="100px">
            WELCOME TO EXAMINATION PORTAL
          </marquee>
        </h1>
        <div className="form3">
          <p className="p2">FORGOT PASSWORD</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input8"
              required
              placeholder="Email"
            />
            <br />
            <button type="submit" className="logbtn2">
              SEND EMAIL
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgot2;
