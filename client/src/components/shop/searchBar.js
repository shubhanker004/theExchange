import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core";

import { errorHelper } from "utils/tools";

const SearchBar = (props) => {
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
      .min(3, "Minimum 3 characters are required.")
      .max(50, "No more than 50 chracters are allowed.")
    }),
    onSubmit: (values, { resetForm }) => {
      props.handleKeywords(values.keywords);
      resetForm();
    },
  });

  return (
    <div >
      <form className="mt-3" onSubmit={formik.handleSubmit} style={{marginLeft:"20px", marginRight:"5px"}}>
        <div>
          <TextField
            style={{
              width: "85%",
              marginBottom:"20px"
            }}
            placeholder="Enter the model name to search for products"
            name="keywords"
            variant="filled"
            {...formik.getFieldProps("keywords")}
            {...errorHelper(formik, "keywords")}
          />
        
        <Button
            variant="outline-dark"
            style={{
              margintop: "20px",
              marginLeft: "20px",
              height: "55px",
              fontWeight: "700",
              fontSize: "20px"
            }}
            type="submit"
          >
            Search
          </Button>
          </div>
      </form>
    </div>
  );
};

export default SearchBar;
