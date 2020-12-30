import React, { useEffect, useState } from 'react';
import {
  Row,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  NavLink,
  CardBody,
  Card,
  Col,
  Badge,
  Button,
} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { TiSocialInstagram } from 'react-icons/ti';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AiFillLinkedin } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import classnames from 'classnames';
import { useTable, usePagination, useSortBy } from 'react-table';
import axiosInstance from '../../../../helpers/axiosInstance';

const visitsData = [
  {
    visits_from_instagram: 10,
    visits_from_linkedin: 13,
    visits_from_whatsapp: 20,
    visits_from_email: 30,
  },

  {
    visits_from_instagram: 10,
    visits_from_linkedin: 13,
    visits_from_whatsapp: 20,
    visits_from_email: 30,
  },

  {
    visits_from_instagram: 10,
    visits_from_linkedin: 13,
    visits_from_whatsapp: 20,
    visits_from_email: 30,
  },

  {
    visits_from_instagram: 10,
    visits_from_linkedin: 13,
    visits_from_whatsapp: 20,
    visits_from_email: 30,
  },
];

const uniqueVisitsData = [
  {
    unique_visits_from_email: 12,
    unique_visits_from_instagram: 23,
    unique_visits_from_linkedin: 42,
    unique_visits_from_whatsapp: 21,
  },
  {
    unique_visits_from_email: 12,
    unique_visits_from_instagram: 23,
    unique_visits_from_linkedin: 42,
    unique_visits_from_whatsapp: 21,
  },
  {
    unique_visits_from_email: 12,
    unique_visits_from_instagram: 23,
    unique_visits_from_linkedin: 42,
    unique_visits_from_whatsapp: 21,
  },
  {
    unique_visits_from_email: 12,
    unique_visits_from_instagram: 23,
    unique_visits_from_linkedin: 42,
    unique_visits_from_whatsapp: 21,
  },
];

const AvgSessionData = [
  {
    avg_session_duration_from_instagram: 11,
    avg_session_duration_from_email: 21,
    avg_session_duration_from_linkedin: 23,
    avg_session_duration_from_whatsapp: 32,
  },
  {
    avg_session_duration_from_instagram: 11,
    avg_session_duration_from_email: 21,
    avg_session_duration_from_linkedin: 23,
    avg_session_duration_from_whatsapp: 32,
  },
  {
    avg_session_duration_from_instagram: 11,
    avg_session_duration_from_email: 21,
    avg_session_duration_from_linkedin: 23,
    avg_session_duration_from_whatsapp: 32,
  },
  {
    avg_session_duration_from_instagram: 11,
    avg_session_duration_from_email: 21,
    avg_session_duration_from_linkedin: 23,
    avg_session_duration_from_whatsapp: 32,
  },
];
const countryWiseData = [
  {
    country_visits_from_email: 12,
    country_visits_from_instagram: 23,
    country_visits_from_linkedin: 42,
    country_visits_from_whatsapp: 21,
  },
  {
    country_visits_from_email: 12,
    country_visits_from_instagram: 23,
    country_visits_from_linkedin: 42,
    country_visits_from_whatsapp: 21,
  },
  {
    country_visits_from_email: 12,
    country_visits_from_instagram: 23,
    country_visits_from_linkedin: 42,
    country_visits_from_whatsapp: 21,
  },
  {
    country_visits_from_email: 12,
    country_visits_from_instagram: 23,
    country_visits_from_linkedin: 42,
    country_visits_from_whatsapp: 21,
  },
];

const cityWiseData = [
  {
    city_wise_visits_from_email: 12,
    city_wise_visits_from_instagram: 23,
    city_wise_visits_from_linkedin: 42,
    city_wise_visits_from_whatsapp: 21,
  },
  {
    city_wise_visits_from_email: 12,
    city_wise_visits_from_instagram: 23,
    city_wise_visits_from_linkedin: 42,
    city_wise_visits_from_whatsapp: 21,
  },
  {
    city_wise_visits_from_email: 12,
    city_wise_visits_from_instagram: 23,
    city_wise_visits_from_linkedin: 42,
    city_wise_visits_from_whatsapp: 21,
  },
  {
    city_wise_visits_from_email: 12,
    city_wise_visits_from_instagram: 23,
    city_wise_visits_from_linkedin: 42,
    city_wise_visits_from_whatsapp: 21,
  },
];
const affiliate2 = [
  {
    student_name: 'First Student',
    course_name: 'Angular',
    email_id: 'johndoe@gmail.com',
    contact: '9764010025',
    course_purchase: 'No',
    class: 'text-muted w-10 danger badge-sm',
  },
  {
    student_name: 'First Student',
    course_name: 'Angular',
    email_id: 'johndoe@gmail.com',
    contact: '9764010025',
    course_purchase: 'No',
    class: 'text-muted w-10 danger badge-sm',
  },
  {
    student_name: 'First Student',
    course_name: 'Angular',
    email_id: 'johndoe@gmail.com',
    contact: '9764010025',
    course_purchase: 'YES',
    class: 'text-muted w-10 danger badge-sm',
  },
  {
    student_name: 'First Student',
    course_name: 'Angular',
    email_id: 'johndoe@gmail.com',
    contact: '9764010025',
    course_purchase: 'No',
    class: 'text-muted w-10 danger badge-sm',
  },
  {
    student_name: 'First Student',
    course_name: 'Angular',
    email_id: 'johndoe@gmail.com',
    contact: '9764010025',
    course_purchase: 'YES',
    class: 'text-muted w-10 danger badge-sm',
  },
];

const affiliateData = [
  {
    Header: 'Student Name',
    accessor: 'student_name',
    cellClass: 'text-muted w-15',
    Cell: (props) => <p className="ml-2">{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Course Name',
    accessor: 'course_name',
    cellClass: 'text-muted w-15',
    Cell: (props) => <p className="ml-4">{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Email Id',
    accessor: 'email_id',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Contact',
    accessor: 'contact',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Course Purchases',
    accessor: 'course_purchase',
    cellClass: 'text-muted w-20',
    Cell: (props) => {
      if (props.value == 'YES') {
        return (
          <Badge
            color="info"
            style={{
              fontSize: '10px',
              borderRadius: '10px',
              marginLeft: '60px',
            }}
          >
            {props.value}
          </Badge>
        );
      } else {
        return (
          <Badge
            color="danger"
            style={{
              fontSize: '10px',
              borderRadius: '10px',
              marginLeft: '60px',
            }}
          >
            {props.value}
          </Badge>
        );
      }
    },
    sortType: 'basic',
  },
];

const visits = [
  {
    Header: 'Visits from instagram',
    accessor: 'visits_from_instagram',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Visits from WhatsApp',
    accessor: 'visits_from_whatsapp',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Visits from Linkedin',
    accessor: 'visits_from_linkedin',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Visits from Email',
    accessor: 'visits_from_email',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
];

const uniqueVisits = [
  {
    Header: 'Unique Visits from instagram',
    accessor: 'unique_visits_from_instagram',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Unique Visits from WhatsApp',
    accessor: 'unique_visits_from_whatsapp',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Unique Visits from Linkedin',
    accessor: 'unique_visits_from_linkedin',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Unique Visits from Email',
    accessor: 'unique_visits_from_email',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
];

const AvgSessionDuration = [
  {
    Header: 'Avg Session Duration from instagram',
    accessor: 'avg_session_duration_from_instagram',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
  },
  {
    Header: 'Avg Session Duration from WhatsApp',
    accessor: 'avg_session_duration_from_whatsapp',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
  },
  {
    Header: 'Avg Session Duration from linkedin',
    accessor: 'avg_session_duration_from_linkedin',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
  },
  {
    Header: 'Avg Session Duration from Email',
    accessor: 'avg_session_duration_from_email',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
  },
];

const countryWise = [
  {
    Header: 'Country Visits from instagram',
    accessor: 'country_visits_from_instagram',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Country Visits from WhatsApp',
    accessor: 'country_visits_from_whatsapp',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Country Visits from Linkedin',
    accessor: 'country_visits_from_linkedin',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'Country Visits from Email',
    accessor: 'country_visits_from_email',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
];

const cityWise = [
  {
    Header: 'City wise Visits from instagram',
    accessor: 'city_wise_visits_from_instagram',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'City wise Visits from WhatsApp',
    accessor: 'city_wise_visits_from_whatsapp',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'City wise Visits from Linkedin',
    accessor: 'city_wise_visits_from_linkedin',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
  {
    Header: 'City wise Visits from Email',
    accessor: 'city_wise_visits_from_email',
    cellClass: 'text-muted w-20',
    Cell: (props) => <p style={{ marginLeft: '80px' }}>{props.value}</p>,
    sortType: 'basic',
  },
];

const Table = ({ columns, data }) => {
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
      </table>
    </>
  );
};

const AffiliateCard = () => {
  const [activeFirstTab6, setActiveFirstTab6] = useState('20');
  const [error, setError] = useState(null);

  const links = [
    {
      Header: 'Link',
      accessor: 'link',
      cellClass: 'text-muted w-20',
      Cell: (props) => (
        <>
          {' '}
          <Row style={{ width: '200px' }}>
            {' '}
            <p style={{}}>{props.value}</p>
            <Badge
              className="mb-2 ml-2"
              style={{ borderRadius: '0px', height: '20px', cursor: 'pointer' }}
              onClick={() => navigator.clipboard.writeText(props.value)}
            >
              Copy Link
            </Badge>
          </Row>
        </>
      ),
      sortType: 'basic',
    },
    {
      Header: 'RefId',
      accessor: 'refid',
      cellClass: 'text-muted w-10',
      Cell: (props) => <p>{props.value}</p>,
      sortType: 'basic',
    },
    {
      Header: 'Course Name',
      accessor: 'course_name',
      cellClass: 'text-muted w-15',
      Cell: (props) => <p style={{ marginLeft: '10px' }}>{props.value}</p>,
      sortType: 'basic',
    },
    {
      Header: 'Course Id',
      accessor: 'courseid',
      cellClass: 'text-muted w-15',
      Cell: (props) => <p style={{ marginLeft: '30px' }}>{props.value}</p>,
      sortType: 'basic',
    },
    {
      Header: 'Share On',
      accessor: 'share_on',
      cellClass: 'text-muted w-25',
      Cell: (props) => (
        <>
          <Row>
            <p className="mt-1">{props.value}</p>
            <TiSocialInstagram
              className="mb-1 ml-2"
              style={{ fontSize: '25px', color: '#ED4956', cursor: 'pointer' }}
            />
            <IoLogoWhatsapp
              className="mb-1 ml-2"
              style={{ fontSize: '25px', color: '#10B418', cursor: 'pointer' }}
            />
            <AiFillLinkedin
              className="mb-1 ml-2"
              style={{ fontSize: '25px', color: '#0A66C2', cursor: 'pointer' }}
            />
            <MdEmail
              className="mb-1 ml-2"
              style={{ fontSize: '25px', color: '#F14236', cursor: 'pointer' }}
            />
          </Row>
        </>
      ),
      sortType: 'basic',
    },

    {
      Header: 'Platform',
      accessor: 'platform',
      cellClass: 'text-muted w-20',
      Cell: (props) => <p>{props.value}</p>,
      sortType: 'basic',
    },
  ];

  const linksData = [
    {
      link: 'Google.com',
      refid: 12,
      courseid: 2,
      platform: 'zoom',
      course_name: 'React',
      share_on: 'Share On: ',

      class: 'text-muted w-10 danger badge-sm',
    },
    {
      link: 'Google.com',
      refid: 12,
      courseid: 2,
      platform: 'zoom',
      course_name: 'React',
      share_on: 'Share On: ',

      class: 'text-muted w-10 danger badge-sm',
    },
    {
      link: 'Google.com',
      refid: 12,
      courseid: 2,
      platform: 'zoom',
      course_name: 'React',
      share_on: 'Share On: ',

      class: 'text-muted w-10 danger badge-sm',
    },
    {
      link: 'Google.com',
      refid: 12,
      courseid: 2,
      platform: 'zoom',
      course_name: 'React',
      share_on: 'Share On: ',

      class: 'text-muted w-10 danger badge-sm',
    },
  ];

  useEffect(() => {
    const getLinkData = async () => {
      try {
        const result = await axiosInstance.get(`/referal`);
        console.log(result);
        if (result.data.success) {
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('unable to find referal details');
          }
        }
      } catch (err) {
        try {
          setError(err.resonse.data.error);
        } catch (e) {
          setError('Unable to find referal link details');
        }
      }
    };
    getLinkData();
  }, []);
  return (
    <>
      <Row>
        <Col md="12" xs="12">
          <Card className="h-100 pl-4  ">
            <Nav tabs className="card-header-tabs ">
              <NavItem style={{ marginTop: '40px', marginLeft: 0 }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '20',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('20')}
                >
                  <h6>Links</h6>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginTop: '40px', MarginLeft: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '21',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('21')}
                >
                  <h6>Affiliates</h6>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '22',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('22')}
                >
                  <h6>Visits</h6>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '23',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('23')}
                >
                  <h6>Unique Visits</h6>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '24',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('24')}
                >
                  <h6>Avg Session Duration</h6>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '25',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('25')}
                >
                  <h6>Country Wise Visits</h6>
                </NavLink>
              </NavItem>

              <NavItem style={{ marginTop: '40px' }}>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab6 === '26',
                    'nav-link': true,
                  })}
                  onClick={() => setActiveFirstTab6('26')}
                >
                  <h6>City Wise Visits</h6>
                </NavLink>
              </NavItem>
            </Nav>
            <Scrollbars style={{ width: '100%', height: 400 }}>
              <CardBody>
                <TabContent activeTab={activeFirstTab6}>
                  <TabPane tabId="20">
                    <Table columns={links} data={linksData} />{' '}
                  </TabPane>

                  <TabPane tabId="21">
                    <Table columns={affiliateData} data={affiliate2} />{' '}
                  </TabPane>

                  <TabPane tabId="22">
                    <Table columns={visits} data={visitsData} />{' '}
                  </TabPane>

                  <TabPane tabId="23">
                    <Table columns={uniqueVisits} data={uniqueVisitsData} />{' '}
                  </TabPane>

                  <TabPane tabId="24">
                    <Table columns={AvgSessionDuration} data={AvgSessionData} />{' '}
                  </TabPane>

                  <TabPane tabId="25">
                    <Table columns={countryWise} data={countryWiseData} />{' '}
                  </TabPane>

                  <TabPane tabId="26">
                    <Table columns={cityWise} data={cityWiseData} />{' '}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Scrollbars>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AffiliateCard;
