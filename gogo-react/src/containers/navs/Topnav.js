/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { BsChatSquareDots } from 'react-icons/bs';
import { RiNotification4Line } from 'react-icons/ri';
import './nav.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../data/Logo';
import axiosInstance from '../../helpers/axiosInstance';

import IntlMessages from '../../helpers/IntlMessages';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from '../../redux/actions';
import { useLocation } from 'react-router-dom';

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
  buyUrl,
  adminRoot,
} from '../../constants/defaultValues';
import message from '../../data/message';
import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

import { getDirection, setDirection } from '../../helpers/Utils';
import AxiosInstance from '../../helpers/axiosInstance';
import UrlParams from '../../data/urlparams';
import Query from '../../data/query';
import { useGlobalContext } from '../../context';

const Messages = ({ img, title, date }) => {
  return (
    <div>
      <div
        className="border-bottom-3 d-flex"
        style={{ marginLeft: '-15px', marginRight: '-15px' }}
      >
        <Row className="ml-2">
          <Col md={2}>
            <img
              src={img}
              style={{ width: '300%', borderRadius: '50%', display: 'flex' }}
            />
          </Col>
          <Col md={10}>
            <p className="font-weight-medium mb-1 ml-3 d-flex">{title}</p>
          </Col>
          <p
            className="text-muted mt-1 mb-0  text-small d-flex"
            style={{ marginLeft: '70px' }}
          >
            {date}
          </p>
        </Row>
      </div>
      <DropdownItem
        divider
        style={{ width: '200px', backgroundColor: '#F1F1F1', color: '#F1F1F1' }}
      />
    </div>
  );
};

const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [ID, setID] = useState('');
  const { params } = useGlobalContext();

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  console.log(params);

  const handleLogout = async () => {
    const result = await AxiosInstance.get('/student/auth/logout');
    console.log(result.data);
    if (result.data.success === 1) {
      history.push(`/Student/user/login${query}`);
    }
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const { messages } = intl;
  const { query } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      const result = await axiosInstance.get('/student/auth/profile');
      console.log(result);
      setUserName(result.data.result.student_first_name);
      setProfilePic(result.data.result.student_profile_picture);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const Data = async () => {
  //     const result = await axiosInstance.get(`/student/clientDetails/${query}`);
  //     console.log(result);
  //   };
  //   Data();
  // }, []);

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
        <NavLink className="navbar-logo" to={'#'}>
          <img src={Logo} className="Logo" />
        </NavLink>
        {/* <BsChatSquareDots className="chat"/> */}
        {/* <IoIosNotificationsOutline className="notification"/> */}
        {/* <RiNotification4Line className="noti"/> */}

        {/*         <div className="search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages['menu.search']}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div> */}

        {/*         <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
        <div className="position-relative d-none d-none d-lg-inline-block"></div>
      </div>

      {/* <div className="navbar-right"> */}

      {/* <div className="header-icons d-flex align-middle ml-auto"> */}
      {/* <TopnavEasyAccess /> */}

      {/*  <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button> */}
      {/* </div> */}
      <div className="user d-flex ml-auto mr-4">
        {/* <UncontrolledDropdown className="ml-auto">
          <DropdownToggle
            className="header-icon notificationButton"
            color="empty"
          >
            <i className="simple-icon-speech" style={{ fontSize: '20px' }} />
            <span className="count">2</span>
          </DropdownToggle>
          <DropdownMenu
            className="position-absolute mt-3 scroll"
            right
            id="notificationDropdown"
          >
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {message.map((mess, index) => {
                return (
                  <a href="/app/pages/message">
                    <Messages key={index} {...mess} />
                  </a>
                );
              })}
            </PerfectScrollbar>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <h3 style={{ display: 'grid', alignItems: 'center', fontSize: '18px' }}>
          Hi, {userName.substr(0, 10)}
        </h3>
        {/* <TopnavNotifications className="noti" /> */}
        <UncontrolledDropdown className="dropdown-menu-right">
          <DropdownToggle className="p-0" color="empty">
            {/*  <span className="name mr-1">Sarah Kortney</span> */}
            <span>
              <img
                alt="Profile"
                src={profilePic || require('./Asset 1.png')}
                style={{ borderRadius: '50%', width: '50px', height: '50px' }}
              />
            </span>
          </DropdownToggle>
          <DropdownMenu className="mt-3" right>
            <a href="/app/pages/profile/setting">
              <DropdownItem>Account</DropdownItem>
            </a>
            {/* <DropdownItem>Features</DropdownItem> */}
            {/* <DropdownItem>History</DropdownItem> */}
            {/* <DropdownItem>Support</DropdownItem> */}

            <DropdownItem divider />
            <DropdownItem onClick={() => handleLogout()}>Sign out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      {/* </div> */}
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
