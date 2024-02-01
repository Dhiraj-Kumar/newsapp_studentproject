import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Appbar from "./Appbar";
import Footer from "./Footer";
import config from './config'
import KeyIcon from "@mui/icons-material/Key";
import Alert from '@mui/material/Alert';
import axios from "axios";


function ChangePassword() {
    const username = localStorage.getItem("username");
    const [message, setMessage] = useState(false)
    const [alert, setAlert] = useState("")
    const navigate = useNavigate();

    const logout = () => {
        var allCookies = document.cookie.split(";");
    
        for (var i = 0; i < allCookies.length; i++) {
          document.cookie =
            allCookies[i] + "=;expires=" + new Date(0).toUTCString();
        }
    
        localStorage.clear();
       
        navigate('/loginpage');
      };
    const formik = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            cpassword: ""
        },
        onSubmit: async (values) => {
            const data = {
                oldpassword: values.oldpassword,
                newpassword: values.newpassword
            }
            await axios.post(`${config.auth}/changePassword/${username}`, data).then(({ data }) => {
            
                    setMessage(true)
                    setTimeout(() => {
                        logout()
                    }, 1000);
                 
            }).catch((err) => {
                console.log(err)
                setAlert("Old Password is Incorrect")
                navigate(0)
            })


        },
        validate: (values) => {
            let errors = {}

            if (!values.oldpassword.length) {
                errors.oldpassword = "Old Password is Required"
            }
            if (values.newpassword.length <= 8) {
                errors.newpassword = "min length of password required is 8"
            }
            if (!values.newpassword.length) {
                errors.newpassword = "Password is Required*"
            }
            if (!values.cpassword.length) {
                errors.cpassword = "Confirm Password is Required*"
            }
            if (values.newpassword !== values.cpassword) {
                errors.newpassword = "Password and Confirm should be same"
            }


            return errors
        }
    });

    return (
        <div>
            <Appbar />

            <div className="container-fluid body-login">
                <div className=" login-flex ">
                    <div className="column rounded bg-white login-flex-col-2 p-4">
                        <div className="text-center login-flex-col-div-2 mt-5">
                            <h3 className="login-h4 fw-bold">Change Password</h3>
                            <br />


                            <form onSubmit={formik.handleSubmit}>


                                <div>
                                    <KeyIcon style={{ fontSize: "32px", opacity: "0.8" }} />
                                    <input
                                        type="password"
                                        name="oldpassword"
                                        id="oldpassword"
                                        className="email-input mt-2"
                                        onChange={formik.handleChange}
                                        value={formik.values.oldpassword}
                                        placeholder=" Enter Old Password"
                                    />
                                    <br />

                                    <KeyIcon style={{ fontSize: "32px", opacity: "0.8" }} />
                                    <input
                                        type="password"
                                        name="newpassword"
                                        id="newpassword"
                                        className="email-input mt-2"
                                        onChange={formik.handleChange}
                                        value={formik.values.newpassword}
                                        placeholder=" Enter New Password"
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

                                    {formik.errors.oldpassword ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.oldpassword} </Alert>

                                        : null}

                                    {formik.errors.newpassword ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.newpassword} </Alert>

                                        : null}
                                    {formik.errors.cpassword ? <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">  {formik.errors.cpassword} </Alert>

                                        : null}

                                    {alert ?
                                        <Alert severity="error" className="login-alert d-flex justify-content-center align-items-center mt-1 ">{alert}</Alert>
                                        :
                                        null

                                    }

                                    {message ? <div className="alert alert-success alert-dismissible fade show mt-5" role="alert">
                                        <strong>Password Changed Successfully</strong>

                                    </div>
                                        : null
                                    }

                                </div>


                                <br />


                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ChangePassword;


