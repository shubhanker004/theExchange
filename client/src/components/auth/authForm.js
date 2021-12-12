import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { TextField , Button } from '@material-ui/core';

import Loader from 'utils/loader';
import { errorHelper } from 'utils/tools';
import { userRegister, userSignIn } from 'store/actions/user-actions';
import './authForm.css'

const AuthForm = (props) => {
    const notifications = useSelector(state=> state.notifications);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();


  // form validation
  const formik = useFormik({
    initialValues:{ email:'',password:'' },
    validationSchema:Yup.object({
      email:Yup.string()
      .required('Email not provided')
      .email('This is an invalid email'),

      password:Yup.string()
      .required('Password not provided.') 
      .min(6, 'Password is too short - should be minimum 6 chars.')
    }),
    onSubmit:( values )=>{
      setLoading(true);
      handleSubmit(values);
    }
});


    const handleSubmit = (values) => {

      if(props.formType){
        dispatch(userRegister(values))
      } else {
        dispatch(userSignIn(values))
      }

    }


    useEffect(()=>{
      if(notifications && notifications.success){
        props.history.push('/dashboard')
      } else{
        setLoading(false);
      }
    },[notifications,props.history])


    return (
      <>
        <div className="auth_container">
          {loading ? (
            <Loader />
          ) : (
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              {props.formType && (
                <div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="fname"
                      label="Enter your first name"
                      variant="filled"
                      {...formik.getFieldProps("fname")}
                      {...errorHelper(formik, "fname")}
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <TextField
                      style={{ width: "100%" }}
                      name="lname"
                      label="Enter your last name"
                      variant="filled"
                      {...formik.getFieldProps("lname")}
                      {...errorHelper(formik, "lname")}
                    />
                  </div>
                </div>
              )}

              <div className="form-group" style={{ marginTop: "1rem" }}>
                <TextField
                  style={{ width: "100%" }}
                  name="email"
                  label="Enter your email"
                  variant="filled"
                  {...formik.getFieldProps("email")}
                  {...errorHelper(formik, "email")}
                />
              </div>
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <TextField
                  style={{ width: "100%" }}
                  name="password"
                  label="Enter your password"
                  variant="filled"
                  type="password"
                  {...formik.getFieldProps("password")}
                  {...errorHelper(formik, "password")}
                />
              </div>
              <Button
                size="medium"
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#333333",
                  color: "#FFFFFF",
                  marginTop: "20px",
                }}
              >
                {props.formType ? "Sign Up" : "Log In"}
              </Button>
            </form>
          )}
        </div>
      </>
    );
}

export default AuthForm;