import React, { useState, useEffect } from 'react';
import { Row, Card, Button, Col } from 'reactstrap';

import { FiGlobe } from 'react-icons/fi';
import { FiGithub } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { FiFacebook } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './course1.css';
import useMousetrap from '../../../../hooks/use-mousetrap';
import man from './man.jpg';

import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import Loader from './Loader';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const ImageListPages = ({ match, ...props }) => {
  console.log(props);
  const [displayMode, setDisplayMode] = useState('imagelist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trainer, setTrainer] = useState({});

  const createMarkup = (data) => {
    return { __html: data };
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    if (error)
      NotificationManager.warning(
        error,
        'All Courses Error',
        3000,
        null,
        null,
        ''
      );
  }, [error, setError]);

  useEffect(() => {
    let id = props.location.state.trainer_id;

    console.log(id);
    async function fetchData() {
      try {
        const result = await axiosInstance.get(
          `/student/sessions/trainer/${id}`
        );
        if (result.data.success) {
          console.log(result.data.trainerData);
          setTrainer(result.data.trainerData);
        } else {
          try {
            setError(result.data.error);
          } catch (er) {
            setError('Could not fetch details');
          }
        }
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (e) {
          setError('Could not fetch details');
        }
      } finally {
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;
  console.log(trainer);
  if (!isLoaded) return <Loader />;
  return (
    <>
      <Link to="/app/pages/product/details">
        <AiOutlineLeftCircle
          className="mb-4"
          style={{ fontSize: '30px', cursor: 'pointer' }}
        />
      </Link>
      <Row>
        <Col md="4" xs="12">
          <Card body style={{ height: '268px' }}>
            <img src={man} className="img1" />
            <p className="mx-auto font-weight-bold nameinst">
              {trainer.trainer_full_name}
            </p>
            <p className="mx-auto desc">{trainer.trainer_occupation}</p>
            {/* <p className="mx-auto desc">Bengaluru, India</p> */}
            <Row>
              <Button outline className="info ml-auto mr-2">
                Message
              </Button>
              <Button className="info mr-auto ml-2">Contact</Button>
            </Row>
          </Card>
        </Col>
        <Col md="4" xs="12">
          <Card body style={{ height: '268px' }}>
            {/* <ListGroup> */}
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>Full Name</b> : {trainer.trainer_full_name}
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>Email</b> : {trainer.trainer_email}
            </div>
            {/* <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Former Web Developer</b> at Capgemini, 2010 to 2013</div> */}
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>Former Software Engineer</b> at Infosys, 2013 to 2015
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              {/* <b>Achievements</b> : Hacktober 2020 */}
              {trainer.trainer_occupation}
            </div>
            {/* </ListGroup> */}
          </Card>
        </Col>
        <Col md="4" xs="12">
          <Card body style={{ height: '268px' }}>
            <div className="px-4 pb-2 pt-1" style={{ fontSize: '20px' }}>
              <b>
                <FiGlobe />
              </b>{' '}
              {trainer.trainer_website_url}
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>
                <FiGithub />
              </b>{' '}
              udit3344
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>
                <FiTwitter />
              </b>{' '}
              {trainer.trainer_twitter_id}
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>
                <FiFacebook />
              </b>{' '}
              {trainer.trainer_facebook_id}
            </div>
            <div className="px-4 py-2" style={{ fontSize: '20px' }}>
              <b>
                <FiInstagram />
              </b>{' '}
              {trainer.trainer_instagram_id}
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md="6" xs="12">
          <Card body>
            <h2 className="font-weight-bold mb-4">Career Summary</h2>
            <p
              style={{ fontSize: '19px' }}
              dangerouslySetInnerHTML={createMarkup(
                trainer.trainer_career_summary
              )}
            ></p>
          </Card>
        </Col>
        <Col md="6" xs="12">
          <Card body>
            <h2 className="font-weight-bold mb-4">Experience</h2>
            <p
              style={{ fontSize: '19px' }}
              dangerouslySetInnerHTML={createMarkup(trainer.trainer_experience)}
            ></p>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
    </>
  );
};

export default ImageListPages;
