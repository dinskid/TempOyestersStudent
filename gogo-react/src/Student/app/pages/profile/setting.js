import React from 'react'
import {
    Row,
    Card,Col,
    CardBody,
    Nav,Input,InputGroupAddon,
    NavItem,InputGroup,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge,
    CardTitle,
    CardSubtitle,
    CardText,
    CardImg,
  } from 'reactstrap';
  import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import avatar from './avatar.jpg'
import {Route, Link} from 'react-router-dom'
function setting() {
    return (
        <div>
            <Link to='/app/pages/product/data-list'><AiOutlineLeftCircle className="mb-4" style={{fontSize:'30px',cursor:'pointer'}}/></Link>
            <Card className="mx-auto" style={{width: '70%'}}>
                <CardBody>
                        
                        <h2 className=" text-center mx-auto font-weight-bold">Your Profile</h2>
                        <p className=" text-center mx-auto ">Add information about yourself</p>
                        <hr/>
                        <Row>
                            <Col md={12}>
                                <Row><label className="mt-3 text-center mx-auto d-flex">Update Avatar</label></Row>
                                <Row><img src={avatar} style={{borderRadius:'50%', width:'20%', marginLeft:'auto',marginRight:'auto', display:'flex'}}/></Row>
                                <Row className="mx-auto d-flex align-items-center"><Input type="file" /></Row>
                            </Col>
                            <Col md={6} xs={12}>
                                <label className="mt-3">First Name</label>
                                <Input type="text" placeholder="Enter your firstname"/>
                            </Col>
                            <Col md={6} xs={12}>
                                <label className="mt-3">Last Name</label>
                                <Input type="text" placeholder="Enter your lasttname"/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={12} xs={12}>
                                <label>Bio</label>
                                <Input type="textarea" placeholder="Enter About yourself"/>
                            </Col>
                        </Row>
                        <br/>
                        <hr/>
                        <h4 className="text-center">Links</h4>
                        <Row>
                            <Col md={6} xs={12}>
                            <label className="mt-4">Facebook</label>
                            <InputGroup>
                                <Input placeholder="Enter your facebook profile link"/>
                            </InputGroup>
                            </Col>
                            <Col md={6} xs={12}>
                            <label className="mt-4">Twitter</label>
                            <InputGroup>
                                <Input placeholder="Enter your twitter profile link"/>
                            </InputGroup>
                            </Col>
                        </Row>    
                        <Row>
                        <Col md={6} xs={12}>
                            <label className="mt-4">LinkedIn</label>
                            <InputGroup>
                                <Input placeholder="Enter your linkedin profile link"/>
                            </InputGroup>
                            </Col>
                            <Col md={6} xs={12}>
                            <label className="mt-4">Youtube</label>
                            <InputGroup>
                                <Input placeholder="Enter your youtube profile link"/>
                            </InputGroup>
                            </Col>
                        </Row>    
                        <Row>
                        <Col md={6} xs={12}>
                            <label className="mt-4">Github</label>
                            <InputGroup>
                                <Input placeholder="Enter your github profile link"/>
                            </InputGroup>
                            </Col>
                            <Col md={6} xs={12}>
                            <label className="mt-4">Website(if any)</label>
                            <InputGroup>
                                <Input placeholder="Enter your website link"/>
                            </InputGroup>
                            </Col>
                        </Row>    
                        <Button className="mx-auto d-flex mt-4" style={{borderRadius:'0px'}}>Submit</Button>
                </CardBody>
            </Card>
            <br/><br/>
        </div>
    )
}

export default setting
