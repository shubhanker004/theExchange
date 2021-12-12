import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import DashboardLayout from "hoc/dashboardLayout";
import { errorHelper } from "utils/tools";
import Loader from "utils/loader";
import { validation } from "./formValues";
import { getAllBrands } from 'store/actions/brands-actions';
import { productAdd } from 'store/actions/product-actions';
import { clearProductAdd } from "store/actions";
import PicUpload from './upload';
import PicViewer from "./picViewer";

import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const AddProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector(state => state.brands);
  const dispatch = useDispatch();
  

  const formik = useFormik({
    initialValues: {
      category: "",
      brand: "",
      model: "",
      flavor:"",
      puffs: "",
      nicotinePercentage: "",
      price: "",
      suggestedRetailPrice:"",
      available: "",
      shipping: true,
      images:[]
    },
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(productAdd(values))
  }

  const handlePicValue = (pic) => {
    const picArray = formik.values.images;
    picArray.push(pic.url);
    formik.setFieldValue('images', picArray)
  }

  const deletePic = (index) => {
    const picArray = formik.values.images;
    picArray.splice(index, 1);
    formik.setFieldValue('images', picArray)
  }


  useEffect(() => {
    if(notifications && notifications.success) {
      props.history.push('/dashboard/admin/admin_products')
    }
    if(notifications && notifications.error) {
      setLoading(false)
    }
  }, [notifications, props.history])

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch])

  useEffect(()=> {
    return()=> {
      dispatch(clearProductAdd())
    }
  }, [dispatch])

  return (
    <DashboardLayout title="Add product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicViewer 
            formik={formik}
            deletePic={(index) => deletePic(index)}
          />
          <PicUpload 
            picValue={(pic) => handlePicValue(pic)}
          />
          <Divider className="mt-3 mb-3" />
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
          <div className="form-group" style={{marginTop:"20px", width:"50%"}}>
              <FormControl variant="outlined">
                <h5 style={{marginBottom:"10px"}}>Select a category</h5>
                <Select
                  name="category"
                  {...formik.getFieldProps("category")}
                  error={
                    formik.errors.category && formik.touched.category ? true : false
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Disposable Vape">
                    Disposable Vape
                  </MenuItem>
                  <MenuItem value="Delta">
                    Delta
                  </MenuItem>
                  
                </Select>
                {formik.errors.category && formik.touched.category ? (
                  <FormHelperText error={true}>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <div className="form-group" style={{marginTop:"30px", width:"50%"}}>
              <FormControl variant="outlined">
                <h5 style={{marginBottom:"10px"}}>Select a brand name</h5>
                <Select
                  name="brand"
                  {...formik.getFieldProps("brand")}
                  error={
                    formik.errors.brand && formik.touched.brand ? true : false
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brands && brands.all
                    ? brands.all.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.errors.brand && formik.touched.brand ? (
                  <FormHelperText error={true}>
                    {formik.errors.brand}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="model"
                label="Enter the model name"
                variant="filled"
                {...formik.getFieldProps("model")}
                {...errorHelper(formik, "model")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="flavor"
                label="Enter the flavor name"
                variant="filled"
                {...formik.getFieldProps("flavor")}
                {...errorHelper(formik, "flavor")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="puffs"
                label="Enter the number of puffs"
                variant="filled"
                type="number"
                {...formik.getFieldProps("puffs")}
                {...errorHelper(formik, "puffs")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="nicotinePercentage"
                label="Enter the nicotine percentage"
                variant="filled"
                type="number"
                {...formik.getFieldProps("nicotinePercentage")}
                {...errorHelper(formik, "nicotinePercentage")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="price"
                label="Enter the price"
                variant="filled"
                type="number"
                {...formik.getFieldProps("price")}
                {...errorHelper(formik, "price")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="suggestedRetailPrice"
                label="Enter the suggested retail price"
                variant="filled"
                type="number"
                {...formik.getFieldProps("suggestedRetailPrice")}
                {...errorHelper(formik, "suggestedRetailPrice")}
              />
            </div>

            <div className="form-group" style={{marginTop:"30px"}}>
              <TextField
                style={{ width: "50%" }}
                name="available"
                label="Enter the quantity of the item"
                variant="filled"
                type="number"
                {...formik.getFieldProps("available")}
                {...errorHelper(formik, "available")}
              />
            </div>

            <Divider className="mt-3 mb-3" />

            <div className="form-group" style={{marginTop:"30px", width:"30%"}}>
              <FormControl variant="outlined">
                <h5 style={{marginBottom:"10px"}}>Do you offer free shipping</h5>
                <Select
                  name="shipping"
                  {...formik.getFieldProps("shipping")}
                  error={
                    formik.errors.shipping && formik.touched.shipping
                      ? true
                      : false
                  }
                >
                  <MenuItem value={true}> Yes </MenuItem>
                  <MenuItem value={false}> No </MenuItem>
                </Select>
                {formik.errors.shipping && formik.touched.shipping ? (
                  <FormHelperText error={true}>
                    {formik.error.shipping}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <Divider className="mt-3 mb-3" />

            <Button variant="contained" type="submit" style={{marginTop:"30px", backgroundColor:"#212529", color:"#fff"}}>
              Add product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddProduct;
