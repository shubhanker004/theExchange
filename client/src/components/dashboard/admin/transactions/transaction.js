import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import { getTransactionData } from 'store/actions/transaction-actions';
import DashboardLayout from 'hoc/dashboardLayout';
import TransactionTable from './transactionTable';


const defaultValues = {
  keywords: "",
  items:20,
  page:1
};

const Transaction = (props) => {

  const transaction = useSelector(state => state.transaction);
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
  })


  const gotoPage = (page) => {
    setSearchValues({page:page});
  }


  const resetSearch = () => {
    setSearchValues(defaultValues);
  }

  const handleItems = (item) => {
    setSearchValues({ items: item})
  }


  useEffect(() => {
    dispatch(getTransactionData(searchValues))
  }, [dispatch, searchValues]);

  return (
    <DashboardLayout title="All Transactions">

      <div style={{ margin: "20px 0" }}>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <TextField
            style={{ width: "70%", marginTop: "20px", marginLeft:"3rem" }}
            name="keywords"
            label="Enter customer name to search."
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

      
        {transaction.data && transaction.data.docs ? (
              <>
              <div className="products_table">
                <Dropdown style={{ marginTop: "30px", marginBottom:"30px", marginLeft: "75%" }}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Items
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleItems(2)}>
                      2
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(10)}>
                      10
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(20)}>
                      20
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(50)}>
                      50
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItems(100)}>
                      100
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
      
        <TransactionTable
          trans={transaction.data}
          prev={(page) => gotoPage(page)}
          next={(page) => gotoPage(page)}
        />
        </div>
        </>)
        :
        (<strong>No data found for your search.</strong>)}
    </DashboardLayout>
  );
}

export default Transaction;