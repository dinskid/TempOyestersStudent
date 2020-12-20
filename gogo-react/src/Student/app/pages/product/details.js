import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
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
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Separator,
  Colxx,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import GlideComponentThumbs from '../../../../components/carousel/GlideComponentThumbs';
import { detailImages, detailThumbs } from '../../../../data/carouselItems';
import { detailsQuestionsData } from '../../../../data/questions';
import CommentWithLikes from '../../../../components/pages/CommentWithLikes';
import { commentWithLikesData } from '../../../../data/comments';
import QuestionAnswer from '../../../../components/pages/QuestionAnswer';
import GalleryDetail from '../../../../containers/pages/GalleryDetail';
import './course1.css'
import { AiFillStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';
import { FiHeart } from 'react-icons/fi';
import { BiCheck } from 'react-icons/bi';
import Man from './man.jpg'
import { AiFillPlayCircle } from 'react-icons/ai';
import Angular from './angular.png'
import { ImAlarm } from 'react-icons/im';
import { BiChevronDown } from 'react-icons/bi';
import {Route,Link} from 'react-router-dom'

const instructor = ['Udit Narayan']
const work_exp = ['Senior Web Developer, Flexor Inc. from 2013 - 2017']
const about = ['Full stack web developer responsible for end-to-end web app development and creative cloud engineering. Led three teams of five employees each. Prototyped an average of 25 new product features per year. Drove best practice implementation for 22 employees across multiple departments. Decreased rework by 23% and costs by 15%. Boosted user experience scores by 55% over company-wide previous best.']
const content = ['Content-1','Content-2','Content-3','Content-4','Content-5','Content-6','Content-7','Content-8','Content-9']
const DetailsPages = ({ match, intl }) => {
/*   const [activeTab, setActiveTab] = useState('details');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);
    const [isOpen11, setIsOpen11] = useState(false);

  
    const toggle = () => setIsOpen(!isOpen);
    const toggle2 = () => setIsOpen2(!isOpen2);
    const toggle3 = () => setIsOpen3(!isOpen3);
    const toggle4 = () => setIsOpen4(!isOpen4);
    const toggle5 = () => setIsOpen5(!isOpen5);
    const toggle6 = () => setIsOpen6(!isOpen6);
    const toggle7 = () => setIsOpen7(!isOpen7);
    const toggle8 = () => setIsOpen8(!isOpen8);
    const toggle9 = () => setIsOpen9(!isOpen9);
    const toggle10 = () => setIsOpen10(!isOpen10);
    const toggle11 = () => setIsOpen11(!isOpen11);  */
  
  const { messages } = intl;
  return (
    <>
    <Row>
      <Col md="8">
      <div >
        <h2 className="heading">Angular 8 Course (2020)</h2>
        <h6>Master Angular 10 (formerly "Angular 2") and build awesome, reactive web apps with the successor of Angular.js</h6>
        <p className="para">Instructor: <a href="#">{instructor}</a></p>
        <Button className="button">Share <HiOutlineShare/></Button><Button className="button ml-3">Wishlist <FiHeart/></Button>
        <Card body className="what_to_learn">
          <CardTitle tag="h2" className="head">What you'll learn</CardTitle>
          <Row>
          <Col md="1">
            <BiCheck className="bicheck"/>
          </Col>
          <Col md="5">
          <CardText className="ct"> Develop modern, complex, responsive and scalable web applications with Angular 10.</CardText>
          </Col>
          <Col md="1">
            <BiCheck className="bicheck"/>
          </Col>
          <Col md="5">
          <CardText className="ct">Fully understand the architecture behind an Angular application and how to use it.</CardText>
          </Col>
          </Row>
          <Row className="mt-4">
          <Col md="1">
            <BiCheck className="bicheck"/>
          </Col>
          <Col md="5">
          <CardText className="ct"> Use the gained, deep understanding of the Angular fundamentals to quickly establish yourself as a frontend developer.</CardText>
          </Col>
          <Col md="1">
            <BiCheck className="bicheck"/>
          </Col>
          <Col md="5">
          <CardText className="ct">Create single-page applications with one of the most modern JavaScript frameworks out there.</CardText>
          </Col>
          </Row>
        </Card>
      </div>
      <Card body className="trainer">
        <CardTitle tag="h2" className="head">About Trainer</CardTitle>
        <Row>
          <Col md="4">
            <img src={Man} className="inst_img"/>
            <CardText className="inst_name text-center mt-2">{instructor}</CardText>
          </Col>
          <Col md="8">
            <CardText className="font-weight-bold">{work_exp}</CardText>
            <CardText className="">{about}</CardText>
          </Col>
        </Row>
        
        <Button className="go_to_profile"><Route><Link to="/app/pages/product/image-list"><p className="mt-3 innertext">See Full Profile</p></Link></Route></Button>
      </Card>
      <h2 className="mt-4 font-weight-bold">Course Content</h2>
      <Card className="toggle"><Button color="link" id="toggler"  style={{ marginBottom: '1rem' }}><p className="p">Getting started</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler">
        <Card className="toggled">
          <CardBody>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-3 ml-auto mr-3">1:44</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-3 ml-auto mr-3">3:48</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-3 ml-auto mr-3">5:05</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-3 ml-auto mr-3">2:30</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-3 ml-auto mr-3">1:44</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-3 ml-auto mr-3">6:54</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-3 ml-auto mr-3">5:49</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-3 ml-auto mr-3">6:47</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-3 ml-auto mr-3">3:46</p></Row>
            <Row><p className="content m-3"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-3 ml-auto mr-3">3:43</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler2"  style={{ marginBottom: '1rem' }}><p className="p">The Basics</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler2">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler3"  style={{ marginBottom: '1rem' }}><p className="p">Course Projects - The Basics</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler3">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler4"  style={{ marginBottom: '1rem' }}><p className="p">Debugging</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler4">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler5"  style={{ marginBottom: '1rem' }}><p className="p">Components </p></Button></Card>
      <UncontrolledCollapse toggler="#toggler5">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler6"  style={{ marginBottom: '1rem' }}><p className="p">Project - Components </p></Button></Card>
      <UncontrolledCollapse toggler="#toggler6">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler7"  style={{ marginBottom: '1rem' }}><p className="p">Directives</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler7">
        <Card className="toggled">
          <CardBody>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row><p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler8"  style={{ marginBottom: '1rem' }}><p className="p">Project - Directives</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler8">
        <Card className="toggled">
          <CardBody>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row>  <p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row>  <p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row>  <p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <Card className="toggle2"><Button color="link" id="toggler9"  style={{ marginBottom: '1rem' }}><p className="p">Mega Projects</p></Button></Card>
      <UncontrolledCollapse toggler="#toggler9">
        <Card className="toggled">
          <CardBody>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-1</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-2</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-3</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-4</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-5</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-6</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-7</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-8</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-9</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          <Row> <p className="content"><AiFillPlayCircle className="iconvid"/>content-10</p><p className="content mt-1 ml-auto mr-3">0:44</p></Row>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      </Col>
      <Col md="4">
      <Card className="fixed width ">
        <CardImg top src={Angular} alt="Card image cap" style={{width:"100%", height:"50%"}} />
        <CardBody>
          <CardText tag="h2" className="price">Rs. 1200</CardText>
          <CardText tag="h6" className="mb-2"><ImAlarm className="mr-2"/> Duration 2 Weeks</CardText>

          <Button className="btn2 mt-4">Add to Cart</Button>
          <Button outline color="secondary" className="btn3">Buy Now</Button>
        </CardBody>
      </Card>
      </Col>
    </Row>
    <br/><br/>
    </>
  );
};
export default injectIntl(DetailsPages);
