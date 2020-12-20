import React,{ useState, useEffect } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Col,Row
  } from 'reactstrap';
  import axios from 'axios';
  import './course1.css';

import {Route, Link} from 'react-router-dom'
function Live_Session() {
    let names = [{img:'angular', course:'Angular',genre:'Front-end JavaScript Framework',desc:'Angular is a TypeScript-based open-source web application framework.',cost:1200,tags:'Web, frontend'}, 
{img:'react', course:'ReactJS', genre:'Front-end JavaScript Library',desc:'React makes it painless to create interactive UIs.', cost:1300,tags:'Web, frontend'},
{img:'vue', course:'VueJS',genre:'The Progressive JavaScript Framework',desc:'Vue.js lets you extend HTML with HTML attributes called directives.', cost:1500,tags:'Web, frontend'},
{img:'vue', course:'VueJS',genre:'The Progressive JavaScript Framework',desc:'Vue.js lets you extend HTML with HTML attributes called directives.', cost:1500,tags:'Web, frontend'}];

return (
    <Row>
      {names.map(name => {

return  (
  <Col md={3} xs={12}>
<Card className="mt-2 mb-2" style={{width: "100%", height: "450px", marginLeft: "auto", marginRight: "auto"}}>
  {/* <Route><Link to="details"> */}<CardImg top style={{width: '100%'}} src={require(`./${name.img}.png`)} alt="Card image cap" />{/* </Link></Route> */}
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
)


}

export default Live_Session
