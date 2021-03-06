import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Col,
  Badge,
  Row,
  Spinner,
} from 'reactstrap';
import './course1.css';
import useMousetrap from '../../../../hooks/use-mousetrap';
import { Route, Link } from 'react-router-dom';
import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import NoDataFound from './NoDataAllCourse';
import Logo from '../../../../data/Logo';
import { useGlobalContext } from '../../../../context';

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

  const [names, setNames] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState(null);
  const { logo, profilePicture } = useGlobalContext();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axiosInstance.get('/student/sessions');
        console.log(result);
        if (result.data.success) {
          const data = result.data.sessions.map((doc) => ({
            id: doc.session_id,
            img: doc.session_thumbnail,
            course: doc.session_name,
            genre: doc.session_tagline,
            cost: doc.session_fee,
            tags: doc.session_tags,
          }));

          setNames(data);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('Unable to fetch data');
            console.log(e);
          }
        }
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (error) {
          setError('Unable to fetch data');
        }
      } finally {
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (error)
  //     NotificationManager.warning(
  //       error,
  //       'All Courses Error',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  // }, [error, setError]);

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
    <div className="course-card-container">
      {names.map((name, index) => {
        return (
          <div className="course-card">
            <Route>
              <Link
                to={{
                  pathname: '/app/pages/product/details',
                  state: { session_id: name.id },
                }}
              >
                <p className="course-card-price"> Rs.{name.cost}</p>
                <div className="img-container">
                  <img src={name.img || logo || profilePicture} alt="Card image cap" />
                </div>
              </Link>
            </Route>
            <div className="course-card-content">
              <h2>{name.course.substr(0, 38)}</h2>
              <p>{name.genre ? name.genre.substr(0, 200) : ''}</p>
            </div>
            <div className="course-card-tags">
              {name.tags.split(',').map((tag) => {
                return <Badge className="badge-color m-1">{tag}</Badge>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataListPages;
