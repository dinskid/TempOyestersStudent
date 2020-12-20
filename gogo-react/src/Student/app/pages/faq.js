import React, { useState, useEffect } from 'react';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Col,Row
} from 'reactstrap';
import './course.css';
import { servicePath } from '../../../constants/defaultValues';
import Angular from './angular.png'
import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewModal from '../../../containers/pages/AddNewModal';
import ListPageListing from '../../../containers/pages/ListPageListing';
import useMousetrap from '../../../hooks/use-mousetrap';
import { Link,Route } from 'react-router-dom';
/* import ReactCardFlip from 'react-card-flip'; */
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};
let names = [{img:'angular', course:'Angular',genre:'Front-end JavaScript Framework',desc:'Angular is a TypeScript-based open-source web application framework.',cost:1200,tags:'Web, frontend'}]





const apiUrl = `${servicePath}/cakes/paging`;

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
    {/*   <h1>My Courses</h1>
      <Separator className="mb-5" /> */}
         <Row>
      {names.map(name => {

return  (
  
<Col md={3} xs={12}>
<Card className="mt-2 mb-2" style={{width: "100%", height: "450px", marginLeft: "auto", marginRight: "auto"}}>
  <Route><Link to="course"><CardImg top style={{width: '100%'}} src={require(`./${name.img}.png`)} alt="Card image cap" /></Link></Route>
  <CardBody>
    <h2 className="font-weight-bold">{name.course}</h2>
    <h6 className="mb-2 font-weight-bold">{name.genre}</h6>
    <CardText>{name.desc}</CardText>
    <Row><h5 className="mr-auto ml-4"><b>${name.cost}</b></h5><h5 className="ml-auto mr-4"><b>Tags:</b> {name.tags}</h5></Row>
  </CardBody>
</Card>
</Col>
)
})}

</Row>
    </>
  );
};

export default DataListPages;
