import React from 'react';
import { Row, Card, Col, CardBody, CardText } from 'reactstrap';
import { FaClipboardCheck } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import AffiliateCard from './AffiliateCard';

function affiliate() {
  return (
    <div>
      <Row>
        <Col sm="3" xs="12">
          <Card style={{ backgroundColor: '#9B59B6', height: '176px' }}>
            <CardBody>
              <Row>
                <Col md={6} xs={6}>
                  <FaClipboardCheck
                    style={{ fontSize: '100px', color: 'white' }}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <CardText
                    className="font-weight-bold head text-light"
                    style={{ fontSize: '40px', marginTop: 20 }}
                  >
                    31
                  </CardText>
                  <CardText
                    className="font-weight-bold  para text-light"
                    style={{ fontSize: '15px' }}
                  >
                    Registrations
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" xs="12">
          <Card style={{ backgroundColor: '#F58F84', height: '176px' }}>
            <CardBody>
              <Row>
                <Col md={6} xs={6}>
                  <IoIosPaper style={{ fontSize: '100px', color: 'white' }} />
                </Col>
                <Col md={6} xs={6}>
                  <CardText
                    className="font-weight-bold head text-light"
                    style={{ fontSize: '40px', marginTop: 20 }}
                  >
                    31
                  </CardText>
                  <CardText
                    className="font-weight-bold r para text-light"
                    style={{ fontSize: '15px' }}
                  >
                    Enrollments
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" xs="12">
          <Card style={{ backgroundColor: '#4B77BE', height: '176px' }}>
            <CardBody>
              <Row>
                <Col md={6} xs={6}>
                  <FaUserGraduate
                    style={{ fontSize: '100px', color: 'white' }}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <CardText
                    className="font-weight-bold head text-light"
                    style={{ fontSize: '40px', marginTop: 20 }}
                  >
                    31
                  </CardText>
                  <CardText
                    className="font-weight-bold  para text-light"
                    style={{ fontSize: '15px' }}
                  >
                    Enrollments from top scorer
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" xs="12">
          <Card style={{ backgroundColor: '#E68364', height: '176px' }}>
            <CardBody>
              <Row>
                <Col md={6} xs={6}>
                  <RiMoneyDollarCircleFill
                    style={{ fontSize: '100px', color: 'white' }}
                  />
                </Col>
                <Col md={6} xs={6}>
                  <CardText
                    className="font-weight-bold head text-light"
                    style={{ fontSize: '40px', marginTop: 20 }}
                  >
                    31
                  </CardText>
                  <CardText
                    className="font-weight-bold  para text-light"
                    style={{ fontSize: '15px' }}
                  >
                    Rewards Received
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12" xs="12">
          <Card className="h-120 mt-4 mb-4 ">
            <AffiliateCard />
            {/* <Scrollbars style={{ width: '100%', height: 400 }}>
              <CardBody style={{ width: '120%' }}>
                <Table columns={cols} data={data} />
              </CardBody>
            </Scrollbars> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default affiliate;
