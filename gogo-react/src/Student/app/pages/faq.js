import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Badge,
  Spinner,
  Col,
  Row,
} from 'reactstrap';

import './course.css';
import useMousetrap from '../../../hooks/use-mousetrap';
import { Link, Route } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import NotificationManager from '../../../components/common/react-notifications/NotificationManager';
import NoDataFound from './NoDataFound';
import Logo from '../../../data/Logo';

/* import ReactCardFlip from 'react-card-flip'; */
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];
/* const [isflipped, setisFlipped] = useState(false)
const handleClick = () => {
  setisFlipped(!isflipped);
} */
const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const DataListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  const [names, setNames] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    if (error)
      NotificationManager.warning(
        error,
        'My Courses Error',
        3000,
        null,
        null,
        ''
      );
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get('/student/courses');
        console.log(result);
        if (result.data.success) {
          const data = result.data.courses.map((doc) => ({
            img: doc.session_thumbnail,
            course: doc.session_name,
            genre: doc.session_tagline,
            desc: doc.session_description,
            cost: doc.session_fee,
            tags: doc.session_tags,
            session_id: doc.session_id,
          }));
          setNames(data);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('Unable to fetch courses');
          }
        }
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (error) {
          setError('Unable to fetch courses');
        }
      } finally {
        setIsLoaded(true);
      }
    };
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

  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );
  if (!names.length) return <NoDataFound />;
  return (
    <>
      {/*   <h1>My Courses</h1>
      <Separator className="mb-5" /> */}
      <Row>
        {names.map((name) => {
          return (
            <Col md={3} xs={12}>
              <Card
                className="mt-2"
                style={{
                  width: '100%',
                  minHeight: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '50px',
                }}
              >
                <Route>
                  <Link
                    to={{
                      pathname: 'course',
                      state: { session_id: name.session_id },
                    }}
                  >
                    <CardImg
                      top
                      style={{ width: '100%', maxHeight: '250px' }}
                      src={Logo}
                      alt="Card image cap"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '30px',
                        backgroundColor: '#ff0000',
                        borderRadius: '5px',
                      }}
                    >
                      <p
                        className="mt-1 mb-2 mr-2 ml-2"
                        style={{ color: '#fff', fontSize: '16px' }}
                      >
                        Rs.{name.cost}
                      </p>
                    </div>
                  </Link>
                </Route>
                <CardBody>
                  <h2
                    className="font-weight-bold"
                    style={{ fontSize: '20px', marginBottom: '1rem' }}
                  >
                    {name.course.substr(0, 38)}
                  </h2>
                  <h6 className="mb-2" style={{ fontSize: '1rem' }}>
                    {name.genre}
                  </h6>
                  {/* <CardText>{name.desc}</CardText> */}
                  <Row
                    style={{
                      marginTop: '1rem',
                      position: 'absolute',
                      bottom: '5%',
                    }}
                  >
                    {/* <h5 className="mr-auto ml-4">
                      <b>RS. {name.cost}</b>
                    </h5> */}
                    {/* <h5 className="ml-2 mr-4">
                      <b>Tags:</b> {name.tags}
                    </h5> */}
                    {name.tags.split(',').map((tag) => {
                      return <Badge className="m-1">{tag}</Badge>;
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DataListPages;
