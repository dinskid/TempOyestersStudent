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
  import { useTable, usePagination, useSortBy } from 'react-table';
  import {FaClipboardCheck} from 'react-icons/fa'
  import {FaUserGraduate} from 'react-icons/fa'
  import {IoIosPaper} from 'react-icons/io'
  import {RiMoneyDollarCircleFill} from 'react-icons/ri'
  import {TiSocialInstagram} from 'react-icons/ti'
  import {IoLogoWhatsapp} from 'react-icons/io'
  import {AiFillLinkedin} from 'react-icons/ai'
  import {MdEmail} from 'react-icons/md'
  import './mystyle.css'
  import { Scrollbars } from 'react-custom-scrollbars';
  import data from '../../../../data/data';
  /* import data1 from '../../../../data/data2'; */

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      prepareRow,
      headerGroups,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 6 },
      },
      useSortBy,
      usePagination
    );
  
    return (
      <>
      
        <table {...getTableProps()} className="r-table table">
          <thead style={{position: 'sticky'}}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    key={`th_${columnIndex}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? 'sorted-desc'
                          : 'sorted-asc'
                        : ''
                    } style={{fontSize:'20px', position:'sticky'}}
                  >
                    {column.render('Header')}
                    <span />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`td_${cellIndex}`}
                      {...cell.getCellProps({
                        className: cell.column.cellClass,
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
  
        {/* <DatatablePagination
          page={pageIndex}
          pages={pageCount}
          canPrevious={canPreviousPage}
          canNext={canNextPage}
          pageSizeOptions={[4, 10, 20, 30, 40, 50]}
          showPageSizeOptions={false}
          showPageJump={false}
          defaultPageSize={pageSize}
          onPageChange={(p) => gotoPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          paginationMaxSize={pageCount}
        /> */}
      </>
    );
  }
function affiliate() {
    const cols = [
        {
          Header: 'Course',
          accessor: 'c_name',
          cellClass: 'text-muted w-15',
          Cell: (props) => <p>{props.value}</p>,
          sortType: 'basic',
        },
        {
          Header: 'Student Name',
          accessor: 's_name',
          cellClass: 'text-muted w-15',
          Cell: (props) => <p>{props.value}</p>,
          sortType: 'basic',
        },
        {
          Header: 'Email ID',
          accessor: 'email',
          cellClass: 'text-muted w-15',
          Cell: (props) => <><p className="mt-1">{props.value}</p></>,
          sortType: 'basic',
        },
        {
          Header: 'Contact',
          accessor: 'contact',
          cellClass: 'text-muted w-10',
          Cell: (props) =><> <p style={{}}>{props.value}</p></>,
          sortType: 'basic',
        },
        {
          Header: 'Link',
          accessor: 'Link',
          cellClass: 'text-muted w-20',
          Cell: (props) =><> <Row> <p style={{}}>{props.value}</p><Badge className="mb-2 ml-2" style={{borderRadius:'0px' , height:'20px',cursor:'pointer'}} onClick={() =>  navigator.clipboard.writeText(props.value)}>Copy Link</Badge></Row></>,
          sortType: 'basic',
        },
        {
          Header: 'Share on',
          accessor: 'share',
          cellClass: 'text-muted w-20',
          Cell: (props) => <><Row><p className="mt-1">{props.value}</p><TiSocialInstagram className="mb-1 ml-2" style={{fontSize:'25px', color:'#ED4956', cursor: 'pointer'}}/><IoLogoWhatsapp className="mb-1 ml-2" style={{fontSize:'25px', color:'#10B418', cursor: 'pointer'}}/><AiFillLinkedin className="mb-1 ml-2" style={{fontSize:'25px', color:'#0A66C2', cursor: 'pointer'}}/><MdEmail className="mb-1 ml-2" style={{fontSize:'25px', color:'#F14236', cursor: 'pointer'}}/></Row></>,
          sortType: 'basic',
        },
        {
          Header: 'Course Purchased',
          accessor: 'purchased',
          cellClass: 'text-muted w-30',
        Cell: (props) => {if(props.value == 'Yes'){ return <Badge color="primary" style={{fontSize:'10px', borderRadius:'10px', marginLeft:'60px'}}>{props.value}</Badge> }
        else{ return <Badge color="danger" style={{fontSize:'10px', borderRadius:'10px', marginLeft:'60px'}}>{props.value}</Badge>
      } },
          sortType: 'basic',
        },
      ]
    const cols1 = [
        
        
        

      ]

    return (
        <div>
            {/* <table {...getTableProps()} className="r-table table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      key={`th_${columnIndex}`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? 'sorted-desc'
                            : 'sorted-asc'
                          : ''
                      }
                    >
                      {column.render('Header')}
                      <span />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={`td_${cellIndex}`}
                        {...cell.getCellProps({
                          className: cell.column.cellClass,
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table> */}
            <Row>
                <Col md={3} xs={12}>
                    <Card style={{backgroundColor: '#9B59B6'}}>
                        <CardBody>
                            <Row>
                                <Col md={6} xs={6}>
                                    <FaClipboardCheck style={{fontSize:'100px',color:'white'}}/>
                                </Col>
                                <Col md={6} xs={6}>
                                    <CardText className="font-weight-bold head text-light">31</CardText>
                                    <CardText className="font-weight-bold text-center para text-light">Registrations</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card style={{backgroundColor:'#F58F84'}}>
                        <CardBody>
                            <Row>
                                <Col md={6} xs={6}>
                                    <IoIosPaper style={{fontSize:'100px',color:'white'}}/>
                                </Col>
                                <Col md={6} xs={6}>
                                    <CardText className="font-weight-bold head text-light">31</CardText>
                                    <CardText className="font-weight-bold text-center para text-light">Enrollments</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card style={{backgroundColor:'#4B77BE'}}>
                        <CardBody>
                            <Row>
                                <Col md={6} xs={6}>
                                    <FaUserGraduate style={{fontSize:'100px',color:'white'}}/>
                                </Col>
                                <Col md={6} xs={6}>
                                    <CardText className="font-weight-bold head text-light">31</CardText>
                                    <CardText className="font-weight-bold text-center para text-light">Enrollments from top scorer</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card style={{backgroundColor:'#E68364'}}>
                        <CardBody>
                            <Row>
                                <Col md={6} xs={6}>
                                    <RiMoneyDollarCircleFill style={{fontSize:'100px',color:'white'}}/>
                                </Col>
                                <Col md={6} xs={6}>
                                    <CardText className="font-weight-bold head text-light">31</CardText>
                                    <CardText className="font-weight-bold text-center para text-light">Rewards Received</CardText>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="12" xs="12">
                    <Card className="h-120 mt-4 mb-4 ">
                        <Scrollbars style={{ width: '100%', height: 400 }}>
                            <CardBody style={{width:'120%'}}>
                                <Table columns={cols} data={data} /> 
                            </CardBody>
                        </Scrollbars>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col md="12" xs="12">
                    <Card className="h-120 mt-4 mb-4 ">
                        <Scrollbars style={{ width: '100%', height: 400 }}>
                            <CardBody style={{width:'100%'}}>
                                <Table columns={cols1} data={data1} /> 
                            </CardBody>
                        </Scrollbars>
                    </Card>
                </Col>
            </Row> */}
        </div>
    )
}

export default affiliate
