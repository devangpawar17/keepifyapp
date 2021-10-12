import React, { useState } from "react";
import { useHistory,Link } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
  let history = useHistory()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch(`${process.env.HOST}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'               
            },
           
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        }, {mode:'cors'})
        const json = await response.json()
      
        if(json.success){
            localStorage.setItem('token',json.authToken)
            
            history.push("/")
            props.showAlert("logged in successfully","success")
        }
        else{
          props.showAlert("invalid credentials","danger")
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Login to Keepify</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
       
        <button type="submit"  className="btn">
          Submit
        </button>

        <Link className="navbar-brand" to="/signup">
          <p style={{color:"rgb(145, 112, 223)"}}>sign up now</p> 
        </Link>

      </form>
    </div>
  );
};

export default Login;
