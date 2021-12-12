import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from 'utils/tools';
import { clearNotifications } from 'store/actions/index';



const MainLayout = (props) => {

  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch()

  useEffect(() => {
    if(notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : 'Aww Snap! Some error occured.';
      showToast('ERROR', msg);
      dispatch(clearNotifications());
    }

    if(notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : 'Done !!';
      showToast('SUCCESS', msg);
      dispatch(clearNotifications());
    }
  }, [notifications])

  return (
    <>
      {props.children}
      <ToastContainer toastClassName="dark-toast"/>
    </>
  );
}

export default MainLayout;