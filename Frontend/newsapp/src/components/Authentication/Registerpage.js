import React, { useState } from "react";
import "../../assets/Loginpage.css";
import logo from "../../images/logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import Alert from '@mui/material/Alert';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router";
import config from '../config'
import axios from 'axios'
import { useFormik } from "formik";
import validator from 'validator'
import Selectcustom from "./Selectcustom";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const options = [
  { value: 'What was the name of your first pet?', label: 'What was the name of your first pet?' },
  { value: 'In what city was your father born?', label: 'In what city was your father born?' },
  { value: 'What was your childhood nickname?', label: 'What was your childhood nickname?' },
  { value: 'What was your favorite sport?', label: 'What was your favorite sport?' }

]

function Registerpage() {
 
  const [alert,setAlert]=useState(false)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      sques: "",
      ans1: "",
      password: "",
      cpassword: ""
    },
    onSubmit: async (values) => {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        ans1: values.ans1,
        password: values.password,

      }

      await axios.post(`${config.auth}/register`, data).then(({ data }) => {
        console.log(data.message)
          navigate('/loginpage')
        

      }).catch((err) => {
        console.log(err)
        
          setAlert(true)
          navigate(0)
        
      })
    },
    validate: (values) => {
      let errors = {}

      if (!values.firstname.length) {
        errors.firstname = " Firstname is Required*"
      }
      if (!values.lastname.length) {
        errors.lastname = " Lastname is Required*"
      }
      if (values.firstname.length < 4) {
        errors.firstname = "Atleast 4 characaters required in firstname"
      }
      if (!values.sques) {
        errors.sques = "Security Question required"
      }
      if (!values.email.length) {
        errors.email = "Email is Required*"
      } else {
        if (!validator.isEmail(values.email)) {
          errors.email = "Email is invalid*"
        }
      }
      if (!values.ans1.length) {
        errors.ans1 = "Answer for selected security question required"
      }
      if (values.password.length <= 8) {
        errors.password = "min length of password required is 8"
      }
      if (!values.password.length) {
        errors.password = "Password is Required*"
      }
      if (!values.cpassword.length) {
        errors.cpassword = "Confirm Password is Required*"
      }
      if (values.password !== values.cpassword) {
        errors.password = "Password and Confirm should be same"
      }


      return errors
    }
  });
  return (
    <div>

      <div className="container-fluid body-login">
        <div className=" login-flex rounded shadow">
          <div className="column rounded bg-white login-flex-col-2 p-4">
            <div className="text-center login-flex-col-div-2 mt-5">
              <h3 className="login-h4 fw-bold">Create Account</h3>
              <br />

              

              <form onSubmit={formik.handleSubmit}>
                <PersonOutlineIcon
                  style={{ fontSize: "30px", opacity: "0.7" ,marginRight:'5px'}}
                />
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="email-input"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  placeholder=" Firstname"
                />

                <br />
                <PersonOutlineIcon
                  style={{ fontSize: "30px", opacity: "0.7" ,marginRight:'5px' }}
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="email-input mt-2"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  placeholder=" Lastname"
                />

                <br />
                <MailOutlineIcon
                  style={{ fontSize: "30px", opacity: "0.7",marginRight:'5px' }}
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="email-input mt-2"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder=" Email"
                />

                <br />

                <Selectcustom
                  className='email-input'
                  onChange={value => formik.setFieldValue('sques', value.value)}
                  value={formik.values.sques}
                  options={options}

                />

                <QuestionAnswerOutlinedIcon style={{ fontSize: "30px", opacity: "0.7" ,marginRight:'5px' }} />
                <input
                  type="password"
                  name="ans1"
                  id="ans1"
                  className="email-input mt-2"
                  onChange={formik.handleChange}
                  value={formik.values.ans1}
                  placeholder=" Answer"
                />
                <br />

                <KeyIcon style={{ fontSize: "30px", opacity: "0.7",marginRight:'5px' }} />
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

                <KeyIcon style={{ fontSize: "30px", opacity: "0.7",marginRight:'5px' }} />
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="email-input mt-2"
                  onChange={formik.handleChange}
                  value={formik.values.cpassword}
                  placeholder=" Confirm Password"
                />

                <br />
                <br />
                <button className="btn btn-signin mt-2" type="submit">
                  Sign Up
                </button>
                <div style={{ overflowY: 'scroll', height: '8rem' }}>
                  {formik.errors.firstname ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.firstname} </Alert>

                    : null}

                  {formik.errors.lastname ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.lastname} </Alert>

                    : null}

                  {formik.errors.email ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-1 login-alert ">  {formik.errors.email} </Alert>

                    : null}
                  {formik.errors.sques ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.sques} </Alert>

                    : null}
                  {formik.errors.ans1 ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.ans1} </Alert>

                    : null}
                  {formik.errors.password ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.password} </Alert>

                    : null}
                  {formik.errors.cpassword ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.cpassword} </Alert>

                    : null}

                    { alert ?
                      <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">User with Specific Email id already exists</Alert>   
                      :
                   null
                      
                    }     
                </div>
              </form>
            </div>
          </div>

          <div className="column  rounded login-flex-col-1 p-4">
            <div className="text-center login-flex-col-div-1">
              <img src={logo} alt="logo" width={65} height={65} />
              <h3 className="text-white fw-bold logo-h3">Newsly</h3>
              <br />
              <br />
              <h5 className="text-white fw-bold ">Welcome Back!</h5>
              <br />
              <p className="text-white login-p ">
                {" "}
                To keep connected with us please login with your personal
                info..
              </p>
              <br />
              <button
                className="btn btn-signup "
                onClick={() => {
                  navigate("/loginpage");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Registerpage;
