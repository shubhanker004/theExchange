import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getTokenCookie } from "utils/tools";
import Loader from "utils/loader";

const PicUpload = ({picValue}) => {
  const [loading, setLoading] = useState(false);

  const formikImg = useFormik({
    initialValues: { pic:"" },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("Please uplaod an image file"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);

      axios
        .post(`/api/products/upload`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${getTokenCookie()}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          picValue(response.data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={formikImg.handleSubmit} style={{width:"70%", marginTop:"20px", marginBottom:"20px"}}>
          <Form.Group>
            <Form.Control 
              type="file"
              id="file"
              name="file"
              onChange={(event) => {
                formikImg.setFieldValue("pic", event.target.files[0]);
              }}
            />
            {formikImg.errors.pic && formikImg.touched.pic ? (
              <div>Error</div>
            ) : null}
          </Form.Group>
          <Button variant="secondary" type="submit" style={{marginTop:"10px"}}>
            Add Image
          </Button>
        </Form>
      )}
    </>
  );
};

export default PicUpload;
