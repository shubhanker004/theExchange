import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Divider } from '@mui/material';

import { productsByPaginate, productRemove } from 'store/actions/product-actions';
import { addBrand } from 'store/actions/brands-actions';
import DashboardLayout from 'hoc/dashboardLayout';
import ProductsTable from './productsTable';


const defaultValues = {
  keywords: "",
  brand: [],
  category: [],
  minPuffs:0,
  maxPuffs:50000,
  minPrice:0,
  maxPrice:50,
  page: 1
};

const AdminProducts = (props) => {

  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const products = useSelector(state => state.products);
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({...state, ...newState}),
    defaultValues
  );

  const formik = useFormik({
    initialValues: { keywords: ''},
    validationSchema: Yup.object({
      keywords: Yup.string()
      .min(1, "Minimum 1 characters required.")
      .max(50, "No more than 50 chracters are allowed.")
    }),
    onSubmit:(values)=>{
      setSearchValues({ keywords: values.keywords, page:1});
    }
  });

  const formik2 = useFormik({
    initialValues: { brandname: ''},
    validationSchema: Yup.object({
      brandname: Yup.string()
      .min(2, "Minimum 2 characters required.")
      .max(50, "No more than 50 chracters are allowed.")
    }),
    onSubmit:(values)=>{
      handleBrand(values.brandname);
    }
  });

  const handleBrand = (brand) => {
    dispatch(addBrand(brand));
  }


  const gotoEdit = (id) => {
    props.history.push(`/dashboard/admin/edit_product/${id}`)
  }


  const gotoPage = (page) => {
    setSearchValues({page:page});
  }

  const handleClose = () => {
    setRemoveModal(false)
  }

  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true)
  }

  const handleRemove = () => {
    dispatch(productRemove(toRemove));
  }

  const resetSearch = () => {
    setSearchValues(defaultValues);
  }

  useEffect(() => {
    dispatch(productsByPaginate(searchValues))
  }, [dispatch, searchValues])

  useEffect(() => {
    handleClose();
    setRemoveModal(null);
    if(notifications && notifications.removeArticle) {
      dispatch(productsByPaginate(searchValues))
    }
  }, [dispatch, notifications, setSearchValues])

  return (
    <DashboardLayout title="Products">
      <div style={{ marginLeft: "65%" }}>
        <LinkContainer to="/dashboard/admin/add_product">
          <Button variant="dark">Add Product</Button>
        </LinkContainer>
      </div>

      <Divider style={{marginTop:"80px", marginBottom:"30px"}}>Add Brand</Divider>
    <div style={{margin:"auto"}}>
      <form className="mt-3" onSubmit={formik2.handleSubmit}>
          <TextField
            style={{ width: "50%", marginTop: "20px", marginLeft: "3rem" }}
            name="brandname"
            label="Enter brand name."
            variant="outlined"
            {...formik2.getFieldProps("brandname")}
            {...errorHelper(formik, "brandname")}
          />
          <Button
            variant="dark"
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              height: "55px",
              fontWeight: "400",
              fontSize: "20px"
            }}
            type="submit"
          >
            Add Brand
          </Button>
        </form>
      </div>
      <Divider style={{marginTop:"80px", marginBottom:"20px"}}>View & Edit Products</Divider>

      <div style={{ margin: "20px 0" }}>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <TextField
            style={{ width: "70%", marginTop: "20px", marginLeft: "3rem" }}
            name="keywords"
            label="Enter model name to search."
            variant="filled"
            {...formik.getFieldProps("keywords")}
            {...errorHelper(formik, "keywords")}
          />
          <Button
            variant="outline-dark"
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              height: "55px",
              fontWeight: "700",
              fontSize: "20px"
            }}
            type="submit"
          >
            Search
          </Button>
          <Button
            variant="outline-dark"
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              height: "55px",
              fontWeight: "700",
              fontSize: "20px"
            }}
            onClick= {()=>resetSearch()}
          >
            Reset
          </Button>
        </form>
      </div>

      <div className="products_table">
        <ProductsTable
          removeModal={removeModal}
          prods={products.byPaginate}
          prev={(page) => gotoPage(page)}
          next={(page) => gotoPage(page)}
          gotoEdit={(id) => gotoEdit(id)}
          handleClose={() => handleClose()}
          handleModal={(id) => handleModal(id)}
          handleRemove={() => handleRemove()}
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminProducts;
