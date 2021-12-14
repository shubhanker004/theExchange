import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse
} from "@material-ui/core";

const CollapseCheckbox = (props) => {
  const [open, setOpen] = useState(props.initState);
  const [checked, setChecked] = useState([]);

  const handleCollapseOpen = () => setOpen(!open);

  const renderList = () =>
    props.list
      ? props.list.map((value) => (
          <ListItem key={value._id}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => handleToggle(value._id)}
                checked={checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked);
    props.handleFilters(newChecked);
  };

  return (
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title}  />
          {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
  );
};

export default CollapseCheckbox;
