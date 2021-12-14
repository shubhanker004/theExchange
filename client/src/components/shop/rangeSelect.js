import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "utils/tools";
import { IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  Button,
} from "@material-ui/core";

const RangeSelect = (props) => {
  const [open, setOpen] = useState(props.initState);
  const handleCollapseOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: { minPuffs: 0, maxPuffs: 50000, minPrice: 0, maxPrice: 100 },
    validationSchema: Yup.object({
      minPuffs: Yup.number().min(0, "The minimum puff limit is 0"),
      maxPuffs: Yup.number().max(50000, "The maximum puff limit is 50000"),
      minPrice: Yup.number().min(0, "The minimum price limit is 0"),
      maxPrice: Yup.number().max(100, "The maximum price limit is 100"),
    }),
    onSubmit: (values) => {
      props.handleRange([
        values.minPuffs,
        values.maxPuffs,
        values.minPrice,
        values.maxPrice,
      ]);
    },
  });

  return (
    <div>
    <List>
      <ListItem onClick={handleCollapseOpen}>
        <ListItemText primary={props.title} className="collapse_title" />
        {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </ListItem>
      
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <h6>Puffs</h6>
            <div>
              <TextField
                placeholder="Min Puffs"
                name="minPuffs"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("minPuffs")}
                {...errorHelper(formik, "minPuffs")}
              />
            </div>
            <br />
            <div>
              <TextField
                placeholder="Max Puffs"
                name="maxPuffs"
                variant="outlined"
                type="number"
                style={{marginTop:"0px"}}
                {...formik.getFieldProps("maxPuffs")}
                {...errorHelper(formik, "maxPuffs")}
              />
            </div>
            <h6 style={{marginTop:"30px"}}>Price</h6>
            <div>
              <TextField
                placeholder="$ Min"
                name="minPrice"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("minPrice")}
                {...errorHelper(formik, "minPrice")}
              />
            </div>
            <br />
            <div>
              <TextField
                placeholder="$ Max"
                name="maxPrice"
                variant="outlined"
                type="number"
                style={{marginTop:"0px"}}
                {...formik.getFieldProps("maxPrice")}
                {...errorHelper(formik, "maxPrice")}
              />
            </div>
            <Button
              type="submit"
              className="mt-3"
              variant="contained"
              color="primary"
              size="small"
            >
              Search
            </Button>
          </form>
        </List>
      </Collapse>
    </List>
    </div>
  );
};

export default RangeSelect;
