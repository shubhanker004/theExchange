import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

import './loader.css';

const Loader= ({full}) => (
  <div className={`root_loader ${full ? 'full':''}`}>
    <CircularProgress color="inherit" />
  </div>
);

export default Loader;