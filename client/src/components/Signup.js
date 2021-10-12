import React,{useState} from "react";
import { useHistory,Link } from "react-router-dom";


const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

    let history = useHistory()
  
      const handleSubmit=async(e)=>{
          e.preventDefault()
          const {name,email,password}=credentials
          const response = await fetch(`${process.env.HOST}/api/auth/createuser`,{
              
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
                  
              },
             
              body: JSON.stringify({name,email,password})
          })
          const json = await response.json()
          console.log(json);
          
          if(json.success){
            localStorage.setItem('token',json.authToken)
            history.push("/")
            props.showAlert("Acoount created","success")
          }else{         
            props.showAlert("invalid credentials","danger")
          }
    
      }
  
  
      const onChange = (e) => {
          setCredentials({ ...credentials, [e.target.name]: e.target.value });
        };
      

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Sign up to Keepify</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
           onChange={onChange} required minLength={5}
          />
          </div>
         
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
           onChange={onChange}required minLength={5}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="passowrd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"onChange={onChange}required minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"onChange={onChange}required minLength={5}
          />
        </div>
        
      
        <button type="submit" className="btn">
          Submit
        </button>

        <Link className="navbar-brand" to="/login">
          <p style={{color:"rgb(145, 112, 223)"}}>login now</p> 
        </Link>

      </form>
    </div>
  );
};

export default Signup;
