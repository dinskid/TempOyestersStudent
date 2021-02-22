import React, { useState, useEffect } from 'react';
import { NavItem, Nav, TabContent, TabPane, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Cart from './Cart';
import WishList from './WishList';
import SavedForLater from './SavedForLater';
import Loader from '../product/Loader';
import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import  NavBar from "./NavbarCart/NavbarCart";
import MainCard from "./MainCard/MainCard";


const CartIndex = () => {
  const [activeFirstTab, setactiveFirstTab] = useState('1');
  const [reload, setReload] = useState(false);

  const [cartItems, setCartItems] = useState(0);
  const [savedItems, setSavedItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [savedforlaterItems, setSavedforlaterItems] = useState([]);

  useEffect(() => {
    if (error)
      NotificationManager.warning(error, 'Cart Error', 3000, null, null, '');
  }, [error]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axiosInstance.get('/student/cart/cart_list');
        let cart = 0,
          cartItemData = [],
          wishItemData = [],
          savedItemData = [],
          wish = 0,
          saved = 0,
          total = 0;

        result.data.result.forEach((doc) => {
          if (doc.cart_item_status == 'cart') {
            cart++;
            total += parseInt(doc.session_fee);
            cartItemData.push({
              id: doc.cart_item_id,
              session_id: doc.session_id,
              status: doc.cart_item_status,
              img: doc.session_thumbnail,
              cost: doc.session_fee,
              name: doc.session_name,
              text: doc.session_description,
            });
          } else if (doc.cart_item_status == 'wishlist') {
            wish++;
            wishItemData.push({
              id: doc.cart_item_id,
              session_id: doc.session_id,
              status: doc.cart_item_status,
              img: doc.session_thumbnail,
              cost: doc.session_fee,
              name: doc.session_name,
              text: doc.session_description,
            });
          } else if (doc.cart_item_status == 'savedforlater') {
            saved++;
            savedItemData.push({
              id: doc.cart_item_id,
              session_id: doc.session_id,
              status: doc.cart_item_status,
              img: doc.session_thumbnail,
              cost: doc.session_fee,
              name: doc.session_name,
              text: doc.session_description,
            });
          }
        });
        setCart(cartItemData);
        setWishlist(wishItemData);
        setSavedforlaterItems(savedItemData);
        setCheckoutPrice(total);

        setCartItems(cart);
        setSavedItems(saved);
        setWishlistItems(wish);
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (e) {
          setError('Could not fetch details');
        }
      } finally {
        setLoaded(true);
      }
    };
    getData();
  }, [reload]);

  const handleReload = () => {
    console.log('handle reloading ');
    setReload(!reload);
  };

  const handleRemove = async (id) => {
    try {
      const result = await axiosInstance.delete(`/student/cart/${id}`);
      console.log(result);
      if (!result.data.success) {
        try {
          setError(result.data.error);
        } catch (er) {
          setError('Could not delete data');
        }
      } else setReload(!reload);
    } catch (err) {
      try {
        setError(err.response.data.error);
      } catch (e) {
        setError('Could not delete data');
      }
    }
  };

  const handleUpdate = async (session_id, cart_item_status) => {
    try {
      const values = { session_id, cart_item_status };
      const result = await axiosInstance.post('/student/cart/', { values });
      console.log(result);
      if (!result.data.success) {
        try {
          setError(result.data.error);
        } catch (er) {
          setError('Could not Update Details');
        }
      } else setReload(!reload);
    } catch (err) {
      try {
        setError(err.response.data.error);
      } catch (e) {
        setError('Could not Update Details');
      }
    }
  };

  if (!loaded) return <Loader />;
  return (
    <>
      {/* <Nav tabs className="card-header-tabs mb-3">
        <NavItem>
          <NavLink
            to="#"
            location={{}}
            className={classnames({
              active: activeFirstTab === '1',
              'nav-link': true,
            })}
            onClick={() => {
              setactiveFirstTab('1');
            }}
          >
            <h6>Cart ({cartItems}) </h6>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="#"
            location={{}}
            className={classnames({
              active: activeFirstTab === '2',
              'nav-link': true,
            })}
            onClick={() => {
              setactiveFirstTab('2');
            }}
          >
            <h6>Saved Items ({savedItems})</h6>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="#"
            location={{}}
            className={classnames({
              active: activeFirstTab === '3',
              'nav-link': true,
            })}
            onClick={() => {
              setactiveFirstTab('3');
            }}
          >
            <h6>WishList ({wishlistItems})</h6>
          </NavLink>
        </NavItem>
      </Nav> */}

      <NavBar/>
      <MainCard/>
      {/* <TabContent activeTab={activeFirstTab}>
        <TabPane tabId="1">
          <Cart
            handleReload={handleReload}
            reload={reload}
            setReload={setReload}
            data={cart}
            checkoutPrice={checkoutPrice}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </TabPane>
        <TabPane tabId="2">
          <SavedForLater
            data={savedforlaterItems}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </TabPane>

        <TabPane tabId="3">
          <WishList
            data={wishlist}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </TabPane>
      </TabContent> */}
    </>
  );
};

export default CartIndex;
