/* eslint-disable react/no-array-index-key */
import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavLink,DropdownItem } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import notifications from '../../data/notifications';
import { adminRoot } from '../../constants/defaultValues';


const NotificationItem = ({ img, title, date }) => {
  return (
    <div>
      <div className="border-bottom-3" style={{marginLeft:'-15px', marginRight:'-15px' }}>
        <NavLink to={`${adminRoot}/pages/product/details`} >
          <p className="font-weight-medium mb-1">{title}</p>
          <p className="text-muted mb-0 text-small">{date}</p>
        </NavLink>
      </div>
      <DropdownItem divider />
   </div>
  );
};

const TopnavNotifications = () => {
  return (
    <div className="position-relative d-flex mr-auto">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" style={{fontSize:'20px'}} />
          <span className="count">3</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
            })}
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
