import React from 'react';
import { Link } from 'react-router-dom';
function Start() {
  return (
    <>
      <body className="new">
        <h1 className="head">
          <marquee width="80%" direction="right" height="100px">
            WELCOME TO EXAMINATION PORTAL
          </marquee>
        </h1>
        <h1 className="h1">LOGIN/REGISTER</h1>
        <h2 className="h2">
          Education is the movement from darkness to light - Allan Bloom
        </h2>
        <div className="but">
         <Link to='/Login'><button className="but1">LOGIN</button></Link>
         <Link to='/admin'><button className="but2">ADMIN LOGIN</button></Link>
        </div>
      </body>
    </>
  );
}

export default Start;
