import React from "react";
import DashboardLayout from "hoc/dashboardLayout";
import usersReducer from "store/reducers/users-reducer";

import "./index.css";

const UserDashboard = ({ users }) => {
  return (
    <DashboardLayout title="Account Information">
      <div className="user_nfo_panel">
        <div>
          <span>{users.data.firstName}{" "}{users.data.lastName}</span>
          <span>{users.data.email}</span>
          <span>{users.data.address}</span>
          <span>{users.data.phone}</span>
        </div>
        {users.data.history ? (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">history</div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
