import React from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "utils/tools";

import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { userUpdateProfile } from "store/actions/user-actions";
import EmailStepper from "./stepper";

const UserInfo = ({ users }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: users.data.firstName,
      lastName: users.data.lastName,
      address: users.data.address,
      phone: users.data.phone
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, "Maximum limit is 30 characters.")
        .required("Please enter your first name."),
      lastName: Yup.string()
        .max(30, "Maximum limit is 30 characters.")
        .required("Plese enter your last name"),
      address: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Please enter your address."),
      phone: Yup.string()
        .min(10, "Minimum length should be 10")
        .max(10, "Maximum length should be 10")
        .required("Please enter your phone number,"),
    }),
    onSubmit: (values) => {
      dispatch(userUpdateProfile(values))
    }
  });

  return (
    <DashboardLayout title="User information">
      <form
        className="mt-3 article_form"
        style={{ maxWidth: "250px" }}
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <TextField
            style={{ width: "100%" }}
            name="firstName"
            label="Enter your first name"
            variant="filled"
            {...formik.getFieldProps("firstName")}
            {...errorHelper(formik, "firstName")}
          />
        </div>
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <TextField
            style={{ width: "100%" }}
            name="lastName"
            label="Enter your last name"
            variant="filled"
            {...formik.getFieldProps("lastName")}
            {...errorHelper(formik, "lastName")}
          />
        </div>
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <TextField
            style={{ width: "100%" }}
            name="address"
            label="Enter your address"
            variant="filled"
            multiline="true"
            minRows="2"
            maxRows="3"
            {...formik.getFieldProps("address")}
            {...errorHelper(formik, "address")}
          />
        </div>
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <TextField
            style={{ width: "100%" }}
            name="phone"
            label="Enter your phone number"
            variant="filled"
            {...formik.getFieldProps("phone")}
            {...errorHelper(formik, "phone")}
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
          Edit profile
        </Button>
      </form>
      <hr style={{width:"50%", marginTop:"75px"}}/>
      <div>
        <EmailStepper users={users}/>
      </div>
    </DashboardLayout>
  );
};

export default UserInfo;



