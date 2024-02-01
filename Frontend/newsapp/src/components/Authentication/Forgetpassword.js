import { React, useState } from "react";
import "../../assets/Loginpage.css";
import KeyIcon from "@mui/icons-material/Key";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router";
import axios from 'axios'
import config from '../config'
import { useFormik } from "formik";
import Selectcustom from "./Selectcustom";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const options = [
  { value: 'What was the name of your first pet?', label: 'What was the name of your first pet?' },
  { value: 'In what city was your father born?', label: 'In what city was your father born?' },
  { value: 'What was your childhood nickname?', label: 'What was your childhood nickname?' },
  { value: 'What was your favorite sport?', label: 'What was your favorite sport?' }

]

function Forgetpassword() {
  const [name, setName] = useState('')
  const [alert, setAlert] = useState("")
  const [message, setMessage] = useState(false)
  const [invalid,setInvalid]=useState("")
  const [hide, setHide] = useState(false)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      sques: "",
      ans1: "",
      password: "",
      cpassword: ""
    },
    onSubmit: async (values) => {
  
      if (!hide) {
        const data1 = {
          email: values.email,
          ans1: values.ans1

        }
        console.log("in verify")
        await axios.post(`${config.auth}/verifyUser`, data1).then(({ data }) => {
          console.log("in verify")
          if (data.message === "Invalid Email") {
            setAlert(data.message)
            navigate(0)
          }
          else if (data.message === "Incorrect answer or Incorrect security question") {
            setAlert(data.message)
            navigate(0)
          }
          else {
            console.log(data.user)
            setName(data.user)
            setHide(true)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      else {
        const data2 = {
          password: values.password
        }
        console.log(data2)
        await axios.post(`${config.auth}/forgotPassword/${name}`, data2).then((res) => {
          setMessage(true)
          setTimeout(() => {
            navigate('/loginpage')
          }, 2000);

        }).catch((err) => {
          console.log(err)
        })
      }

    },
    validate: (values) => {
      let errors = {}

      if (!hide) {
        if (!values.sques) {
          errors.sques = "Security Question required"
        }

        if (!values.ans1.length) {
          errors.ans1 = "Answer for selected security question required"
        }
      }
      else {
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
      }
      
      return errors
    }
  });
  return (
    <div>

      <div className="container-fluid body-login">
        <div className=" reset login-flex-reset">
          <div className="column rounded bg-white login-flex-col-2 p-4">
            <div className="text-center login-flex-col-div-2 mt-5">
              <h3 className="login-h4 fw-bold">Reset Password</h3>
              <br />


              <form onSubmit={formik.handleSubmit}>


                {hide ?
                  <div>
                    <KeyIcon style={{ fontSize: "32px", opacity: "0.8" }} />
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

                    <KeyIcon style={{ fontSize: "32px", opacity: "0.8" }} />
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
                    <button className="btn btn-signin mt-2" type="submit">
                      submit
                    </button>

                    {formik.errors.password ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.password} </Alert>

                      : null}
                    {formik.errors.cpassword ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.cpassword} </Alert>

                      : null}

                    {message ? <div className="alert alert-success alert-dismissible fade show mt-5" role="alert">
                      <strong>Password Reset Successfully</strong> 
                      
                    </div>
                      : null
                    }

                  </div>
                  : <div>
                    <Selectcustom
                      className='email-input  '
                      onChange={value => formik.setFieldValue('sques', value.value)}
                      value={formik.values.sques}
                      options={options}

                    />
                    <QuestionAnswerOutlinedIcon style={{ fontSize: "32px", opacity: "0.8" }} />
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
                    <QuestionAnswerOutlinedIcon style={{ fontSize: "32px", opacity: "0.8" }} />
                    <input
                      type="text"
                      name="ans1"
                      id="ans1"
                      className="email-input mt-2"
                      onChange={formik.handleChange}
                      value={formik.values.ans1}
                      placeholder=" Answer"
                    />
                    <br />
                    <button className="btn btn-signin mt-2" type="submit">
                      submit
                    </button>
                    {formik.errors.sques ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.sques} </Alert>

                      : null}
                    {formik.errors.ans1 ? <Alert severity="error" className="d-flex justify-content-center align-items-center mt-2 login-alert">  {formik.errors.ans1} </Alert>

                      : null}

                    {alert ?
                      <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">{alert}</Alert>
                      :
                      null

                    }
                  </div>}

                <br />
              

              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Forgetpassword;