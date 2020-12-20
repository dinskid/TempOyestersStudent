/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Card,
  Button,
  TabPane,
  TabContent,
  UncontrolledCollapse,
  FormGroup,
  Label,
  Input,
  CardTitle,
  CardHeader,
  CardText,
  CardBody,
  Col,
  Progress,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Media,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Separator, Colxx } from '../../../components/common/CustomBootstrap';
import knowledgeBaseData from '../../../data/knowledgebase';
import ReactPlayer from 'react-player';
import './miscellaneous/course.css';
import Angular from './angular.mp4';
import { Scrollbars } from 'react-custom-scrollbars';
import { comments } from '../../../data/comments';
import classnames from 'classnames';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { MdAttachFile } from 'react-icons/md';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { FcCheckmark } from 'react-icons/fc';
import { Link, Route } from 'react-router-dom';
import img from './img2.jpg';
import { VideoPlayer } from './VideoPlayer';
const Comments = [
  {
    img: 'img1',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Wonder woman',
  },
  {
    img: 'img2',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Ironman',
  },
  {
    img: 'img3',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Black Cat',
  },
  {
    img: 'img4',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Mary Jane',
  },
];
const KnowledgeBase = ({ match }) => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');

  return (
    <>
      <Row>
        <Col md="9">
          {/*<video width="90%" controls>
          <source src={Angular} type="video/mp4"/>
        Your browser does not support the video tag.
        </video>*/}
          <VideoPlayer />
          <p className="mt-3" style={{ fontSize: '15px' }}>
            #frontend #web_development #angular
          </p>
          <h2 className="font-weight-bold">Angular - Get Started(Content-1)</h2>
          <p>20 nov 2019</p>
        </Col>
        <Col md="3">
          <Card body className="progressbox">
            <CardTitle tag="h2" className="prog">
              Course Progress
            </CardTitle>
            <Progress value="200" max={500} id="progress" />
            <div className="text-center mt-3 font-weight-bold">45% of 100%</div>

            <CardTitle tag="h5" className="font-weight-bold">
              Contents
            </CardTitle>
            <Scrollbars style={{ width: 280, height: 350 }}>
              <Card className="toggle">
                <Button
                  color="link"
                  id="toggler"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">
                    Getting started{' '}
                    <FcCheckmark style={{ marginLeft: '80px' }} />
                  </p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler2"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">
                    The Basics
                    <FcCheckmark style={{ marginLeft: '110px' }} />
                  </p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler2">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3">
                        <FcCheckmark />
                      </p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler3"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Course Projects - The Basics</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler3">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"> </p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler4"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Debugging</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler4">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler5"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Components and databinding</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler5">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler6"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Project - Components</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler6">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler7"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Directives</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler7">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler8"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Project - Directives</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler8">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content1 m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content1 mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <Card className="toggle2">
                <Button
                  color="link"
                  id="toggler9"
                  style={{ marginBottom: '1rem' }}
                >
                  <p className="p1">Mega Projects</p>
                </Button>
              </Card>
              <UncontrolledCollapse toggler="#toggler9">
                <Card className="toggled">
                  <CardBody>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-1
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-2
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-3
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-4
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-5
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-6
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-7
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-8
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-9
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                    <Row>
                      <p className="content m-3">
                        <AiFillPlayCircle className="iconvid" />
                        content-10
                      </p>
                      <p className="content mt-3 ml-auto mr-3"></p>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Scrollbars>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md="9">
          <Card className="mt-4">
            <CardHeader className="mt-4">
              <Nav tabs className="card-header-tabs mt-4">
                <NavItem className="mr-4">
                  <NavLink
                    to="#"
                    location={{}}
                    className={classnames({
                      active: activeFirstTab === '1',
                      'nav-link': true,
                    })}
                    onClick={() => {
                      setActiveFirstTab('1');
                    }}
                  >
                    Comments
                  </NavLink>
                </NavItem>

                <NavItem className="ml-4">
                  <NavLink
                    to="#"
                    location={{}}
                    className={classnames({
                      active: activeFirstTab === '2',
                      'nav-link': true,
                    })}
                    onClick={() => {
                      setActiveFirstTab('2');
                    }}
                  >
                    Material
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <TabContent activeTab={activeFirstTab}>
              <TabPane tabId="1" className="mb-4">
                <Scrollbars style={{ width: 950, height: 400 }} id="scrollme">
                  {Comments.map((list) => (
                    <div
                      id="comments"
                      role="tabpanel"
                      className="mb-3"
                      aria-labelledby="home-tab"
                      show
                    >
                      <Card body className="text-center card-inner">
                        <Row>
                          <Col md={2} xs={12}>
                            <img
                              src={require(`./${list.img}.jpg`)}
                              className="comment_img ml-auto mr-auto"
                            />
                            <CardTitle tag="h5" className="card_comment">
                              {list.name}
                            </CardTitle>
                          </Col>
                          <Col md={10} xs={12}>
                            {' '}
                            <CardText className="mt-4 text-left">
                              {list.comment}
                            </CardText>
                            <a href={img} download>
                              <FiDownload /> Image.jpg
                            </a>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  ))}
                </Scrollbars>
                <FormGroup row>
                  <Col md={2}>
                    <label className="input-label-1 ml-4">
                      <input type="file" className="inp" />
                      <MdAttachFile className="icon-cmt" />
                      <p style={{ marginLeft: '25px' }}>Attachments</p>
                    </label>
                  </Col>
                  <Col md={7} className="comment_area">
                    <Input type="textarea" name="text" id="exampleText" />
                  </Col>
                  <Col md={2} className="comment-btn">
                    <Button className="btn4">Comment</Button>
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>

            <div
              id="material"
              role="tabpanel"
              aria-labelledby="contact-tab"
            ></div>
          </Card>
        </Col>
        <Col md="4"></Col>
      </Row>
      <br />
    </>
  );
};
export default KnowledgeBase;
