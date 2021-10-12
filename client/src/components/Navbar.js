import React from "react";
import { Link,useLocation,useHistory } from "react-router-dom";


const Navbar = () => {
  let location = useLocation()
  let history = useHistory()
  const handleLogout =()=>{
    localStorage.removeItem('token')
    history.push('/login')
  }
  
  
  return (
   
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Keepify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'? 'active' :""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'? 'active' :""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn mx-2" to="/login" role="button" type="submit">
              Login
            </Link>

            <Link className="btn " to="/signup" role="button" type="submit">
              Signup
            </Link>

           
          </form>:<>
        
          <button onClick={handleLogout} className="btn ">LogOut</button>
           </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
