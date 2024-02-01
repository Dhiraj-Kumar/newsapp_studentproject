import React, {useState,useEffect } from "react";
import "../../assets/Loginpage.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import Alert from '@mui/material/Alert';
import google from '../../images/google.png';
import config from "../config"
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import validator from 'validator'
import axios from 'axios'


function Loginpage() {
 
  const navigate = useNavigate();
  const [alert,setAlert]=useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
 

      await axios.post(`${config.auth}/login`, { email, password }, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      }).then(({data}) => {
       
        localStorage.setItem('username', data.username);
        localStorage.setItem('fn', data.fn);
        localStorage.setItem('ln', data.ln);
        localStorage.setItem('loginby','authdb')
        if(data.message === "user login success"){
        navigate('/dashboardpage')
        }
      }
      ).catch(function (error) {
        // handle error
        console.log("Error is: " + error);
 
                  setAlert(true)
                  navigate(0)
                
        
      })

    },




    validate: (values) => {
      let errors = {}


      if (!values.email.length) {
        errors.email = "Email is Required*"
      } else {
        if (!validator.isEmail(values.email)) {
          errors.email = "Email is invalid*"
        }
      }
      if (values.password.length <= 8) {
        errors.password = "min length of password required is 8"
      }
      if (!values.password.length) {
        errors.password = "Password is Required*"
      }


      return errors
    },
  });
  const getUser = async () => {
		try {
			const url = `${config.auth}/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      console.log(data)
      if(data != null){
        // console.log(user)
        localStorage.setItem('username', data.username);
        localStorage.setItem('fn', data.fn);
        localStorage.setItem('ln', data.ln);
        localStorage.setItem('loginby','google')
       navigate('/dashboardpage')
      }
		} catch (err) {
			console.log(err);
      
		}
	};

	useEffect(() => {
		getUser();
	}, []);
  const googleAuth = () => {
		window.open(
			`${config.auth}/google/return`,
			"_self"
		);
	};

  return (
    <div>

      <div className="container-fluid body-login">
        <div className=" login-flex rounded">
          <div className="column shadow rounded login-flex-col-1 p-4">
            <div className="text-center login-flex-col-div-1">
              <img src={logo} alt="logo" width={65} height={65} />
              <h3 className="text-white fw-bold logo-h3">Newsly</h3>
              <br />
              <br />
              <h5 className="text-white fw-bold ">Hello, Friend!</h5>
              <br />
              <p className="text-white login-p ">
                <span className="text-white fw-bolder">
                  Haven't created your account with us yet?
                </span>
                <br />
                Enter your personal details and start the journey with us..
              </p>
              <br />
              <button
                className="btn btn-signup "
                onClick={() => {
                  navigate("/registerpage");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="column rounded bg-white login-flex-col-2 p-4">
            <div className="text-center login-flex-col-div-2 mt-5">
              <h3 className="login-h4 fw-bold">Sign in to Newsly</h3>
              <br />
              <br />
              <button className="btn google-btn" onClick={googleAuth}>
              <img src={google} width={30} height={30} alt='google' ></img>
              </button>
              <br />
              <p>or use your email account</p>
              <br />
              <form onSubmit={formik.handleSubmit}>
                <MailOutlineIcon
                  style={{ fontSize: "32px", opacity: "0.8" }}
                />{" "}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="email-input"
                  
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder=" Email"
                />
                <br />
                <KeyIcon style={{ fontSize: "32px", opacity: "0.8" }} />{" "}
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="email-input mt-2"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder=" Password"
                />
                <br />
                <br />
                <Link className="btn google-btn"  to='/forgetpassword'>
                  Forget your password?
                </Link>
                <br /> <br />
                <button className="btn btn-signin mt-2 button" type="submit">
                  Sign In
                </button>
                {formik.errors.email ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-1 login-alert ">  {formik.errors.email} </Alert>

                  : null}
                {formik.errors.password ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.password} </Alert>

                  : null}

                 
              </form>
               { alert ?
                  <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">Invalid Email or Password</Alert>   
                  :
               null
                  
                }     
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Loginpage;

