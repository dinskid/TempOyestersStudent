import React, { useEffect, useState } from 'react';
// import axios from '../../../../helpers/axiosInstance;'
import axios from '../../../../helpers/axiosInstance';
import Line from '../../../../components/charts/Line';
import { ThemeColors } from '../../../../helpers/ThemeColors';
import { Table, Card, CardBody, CardTitle } from 'reactstrap';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import Fade from 'react-reveal/Fade';
import NoData from './no-data.svg';
import './styles.css';

export default function QuizResults(props) {
  const colors = ThemeColors();
  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartTooltip = {
    backgroundColor: ThemeColors().foregroundColor,
    titleFontColor: ThemeColors().primaryColor,
    borderColor: ThemeColors().separatorColor,
    borderWidth: 0.5,
    bodyFontColor: ThemeColors().primaryColor,
    bodySpacing: 10,
    xPadding: 15,
    yPadding: 15,
    cornerRadius: 0.15,
  };
  const chartOptions = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            // min: 0,
            // max: 100,
            padding: 0,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
    },
  };

  const headers = ['Quiz name', 'Your score', 'Max score', 'Min score', 'Avg score', 'Time left', 'Your rank', 'Re-attempt']

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem('STUDENTID');
    console.log(id);
    axios.get(`/student/result/getQuizResults/${id}`)
      .then(results => {
        setLoading(false);
        if ('data' in results) {
          console.log(results.data);
          setData(results.data);
        } else {
          NotificationManager.error('There was an error fetching your details. Please try again.', 'Error', 3000, null, null, '');
          console.log('data object not present in the response')
        }
      })
      .catch(e => {
        setLoading(false);
        NotificationManager.error('There was an error fetching your details. Please try again.', 'Error', 3000, null, null, '');
        console.log(e)
      })
  }, []);

  useEffect(() => { // to set the graph data
    if (data) {
      const X = [0]
      const Y = ['']
      data.map(item => {
        X.push(item.quiz_name);
        Y.push(item.percentage);
      })

      setGraphData({
        labels: X,
        datasets: [
          {
            lineTension: 0,
            label: '',
            data: Y,
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false,
          }
        ]
      });

    }
  }, [data]);

  return (
    <>
      {
        (loading || !data) ? <div className="loading" />
          : <>{
            data.length <= 0 ?
              // no data
              <div
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Fade left cascade>
                  <img
                    src={NoData}
                    alt="you don't have any sessions yet logo"
                    style={{
                      width: '30vh',
                      height: '30vh',
                    }}
                  />{' '}
                </Fade>
                <Fade right casecade effect="delayOut">
                  <h1
                    style={{
                      // marginBottom: '20px',
                      textAlign: 'center',
                      color: 'purple',
                      fontSize: '35px',
                    }}
                  >
                    No data
                    </h1>
                  <h3 style={{ textAlign: 'center' }}>
                    You have not participated in any quiz
                    </h3>
                </Fade>
              </div>

              :
              <>
                <Card className="mb-5">
                  <CardBody>
                    <CardTitle className="font-weight-bold">Quiz Results</CardTitle>
                    <div className="chart-container">
                      {
                        graphData && <Line data={graphData} options={chartOptions} />
                      }
                    </div>
                  </CardBody>
                </Card>

                <Card className="quiz-results-table-card mb-5">
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          {
                            headers.map((item, idx) => <th key={idx}>{item}</th>)
                          }
                        </tr>
                      </thead>
                      <tbody className="quiz-results-tbody">
                        {
                          data && data.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{item.quiz_name}</td>
                                <td>{item.score}</td>
                                <td>{item.max}</td>
                                <td>{item.min}</td>
                                <td>{item.average}</td>
                                <td>{item.remaining_time}</td>
                                <td>{item.rank}</td>
                                <td>
                                  <button
                                    className="btn btn-primary p-1"
                                    onClick={() => {
                                      NotificationManager.warning('Contact your tutor to unlock it', 'Prohibited', 5000, null, null, '');
                                    }}
                                  >
                                    Re-attempt
                    </button>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </>

          }</>
      }
    </>
  )
}
