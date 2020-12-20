import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row,Col } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import './navs.css'
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { AiFillLinkedin } from 'react-icons/ai';
import {Link} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import mob from './black.png'
import com from './white.png'
const Footer = () => {
  return (
    <footer className="page-footer ">
      <Row className="m-0">
      <Col md="2"></Col>
      <Col md="3" xs="12 "> 
      <p className=" copy1 ml-auto" style={{marginLeft:"auto"}}>Copyright © Trainer Oyesters Training <br/><p style={{marginLeft:'60px', marginTop:'5px'}} className=" rights"> All Rights Reserved <br/> </p><p style={{marginLeft:'60px', fontWeight:'bold', marginTop:'-10px'}} className="">Contact Trainer at</p><FaFacebook className="fbicon" style={{color:'#046DE4', fontSize: '25px', marginRight: '20px', marginLeft:'60px', marginTop:'-25px'}}/><FiInstagram className="fbicon" style={{color: '#ED4956',fontSize: '25px', marginRight: '20px', marginTop:'-25px'}}/><AiFillLinkedin className="fbicon" style={{color: '#50ABF1',fontSize: '28px', marginTop:'-25px'}} /> </p></Col>
      <Col md="4" xs="12" className=" col2 mt-3 float-left text-center">
      <Link to="/app/privacy" className=" mt-4 copy" >Privacy & Policy</Link><Link to="/app/cookie" className=" mt-4 ml-2 copy" >Cookie Policy</Link><Link to="/app/terms" className=" mt-4 ml-2 copy" >Terms of service</Link><br/><Link to="/app/irp" className=" mt-4 ml-2 copy" >IPR Complaints</Link><Link to="/app/antispam" className=" mt-4 ml-2 copy" >Anti Spam Policy</Link><Link to="/app/abuse" className=" mt-4 ml-2 copy" >Abuse Policy</Link></Col>
      <Col md="3" xs="12" className="text-center mt-4 text-light"><p className="deliver" style={{lineHeight: '0px',}}>Deliver online with Oyesters</p><img src={com} style={{width:'30%', marginLeft:'auto',marginright:'auto'}} id="com"/><img src={mob} id="mob" style={{width:'30%', marginLeft:'auto',marginright:'auto'}} /><br/><p className="mt-2">Platform by Oyesters</p><FaFacebook style={{color:'#046DE4', fontSize: '20px', marginRight: '20px',marginTop: '-25px'}}/><FiInstagram style={{color: '#ED4956',fontSize: '20px', marginRight: '20px',marginTop: '-25px'}}/><AiFillLinkedin style={{color: '#50ABF1',fontSize: '23px',marginTop: '-25px'}} /></Col>
      </Row>
    </footer>
  );
};

export default Footer;
