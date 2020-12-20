import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { servicePath } from '../../../../constants/defaultValues';
import './course1.css'
import ListPageHeading from '../../../../containers/pages/ListPageHeading';
import AddNewModal from '../../../../containers/pages/AddNewModal';
import ListPageListing from '../../../../containers/pages/ListPageListing';
import useMousetrap from '../../../../hooks/use-mousetrap';
import { FiGlobe } from 'react-icons/fi';
import { FiGithub } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { FiFacebook } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import {Route, Link} from 'react-router-dom'
import {
  Row,
  Card,
  CardTitle,ListGroupItem,ListGroup,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Col,CardText ,Collapse,UncontrolledCollapse,CardImg,CardSubtitle
} from 'reactstrap';
import man from './man.jpg'
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${servicePath}/cakes/paging`;

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

const ImageListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalPage(data.totalPage);
          setItems(data.data.map(x=>{ return { ...x,img : x.img.replace("img/","img/products/")}}));
          setSelectedItems([]);
          setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

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

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
    <Link to='/app/pages/product/details'><AiOutlineLeftCircle className="mb-4" style={{fontSize:'30px',cursor:'pointer'}}/></Link>
      <Row>
        <Col md="4" xs="12">
          <Card body style={{height:'268px'}}>
            <img src={man} className="img1"/>
            <p className="mx-auto font-weight-bold nameinst" >Udit Narayan</p>
            <p className="mx-auto desc">Senior Web Developer, Flexor Inc.</p>
            <p className="mx-auto desc">Bengaluru, India</p>
            <Row><Button outline className="info ml-auto mr-2">Message</Button>
            <Button className="info mr-auto ml-2">Contact</Button></Row>
          </Card>
        </Col>
        <Col md="4" xs="12">
          <Card body style={{height:'268px'}}>
          {/* <ListGroup> */}
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Full Name</b> : Udit Narayan</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Email</b> : uditn@gmail.com</div>
            {/* <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Former Web Developer</b> at Capgemini, 2010 to 2013</div> */}
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Former Software Engineer</b> at Infosys, 2013 to 2015</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b>Achievements</b> : Hacktober 2020</div>
          {/* </ListGroup> */}
          </Card>
        </Col>
        <Col md="4" xs="12">
          <Card body style={{height:'268px'}}>
            <div className="px-4 pb-2 pt-1" style={{fontSize:'20px'}}><b><FiGlobe/></b>   www.uideveloper.com</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b><FiGithub/></b>   udit3344</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b><FiTwitter/></b> uditnry</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b><FiFacebook/></b> Udit Narayan</div>
            <div className="px-4 py-2" style={{fontSize:'20px'}}><b><FiInstagram/></b> udit_narayan</div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md="6" xs="12">
          <Card body>
            <h2 className="font-weight-bold mb-4">Career Summary</h2>  
            <p style={{fontSize:'19px'}}>Full stack web developer responsible for end-to-end web app development and creative cloud engineering. Led three teams of five employees each. Prototyped an average of 25 new product features per year. Drove best practice implementation for 22 employees across multiple departments. Decreased rework by 23% and costs by 15%. Boosted user experience scores by 55% over company-wide previous best.</p>
          </Card>
        </Col>
        <Col md="6" xs="12">
          <Card body>
            <h2 className="font-weight-bold mb-4">Experience</h2>  
            <p style={{fontSize:'19px'}}>Full stack web developer responsible for end-to-end web app development and creative cloud engineering. Led three teams of five employees each. Prototyped an average of 25 new product features per year. Drove best practice implementation for 22 employees across multiple departments. Decreased rework by 23% and costs by 15%. Boosted user experience scores by 55% over company-wide previous best.</p>
          </Card>
        </Col>
      </Row>
      <br/><br/>
    </>
  );
};

export default ImageListPages;
