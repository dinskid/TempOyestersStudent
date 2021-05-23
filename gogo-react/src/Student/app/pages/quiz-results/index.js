import React, { useEffect, useState } from 'react';
// import axios from '../../../../helpers/axiosInstance;'
import axios from '../../../../helpers/axiosInstance';
import Line from '../../../../components/charts/Line';
import { ThemeColors } from '../../../../helpers/ThemeColors';
import { Table, Card, CardBody, CardTitle } from 'reactstrap';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';

export default function QuizResults(props) {
  const colors = ThemeColors();
  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState(null);

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

  const headers = ['Quiz name', 'Your score', 'Max score', 'Min score', 'Time left', 'Avg score', 'Your rank', 'Re-attempt']

  useEffect(() => {
    const id = localStorage.getItem('STUDENTID');
    console.log(id);
    axios.get(`/student/result/getQuizResults/${id}`)
      .then(results => {
        if ('data' in results) {
          console.log(results.data);
          setData(results.data);
        } else {
          console.log('data object not present in the response')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, []);

  useEffect(() => { // to set the graph data
    if (data) {
      const X = []
      const Y = []
      data.map(item => {
        X.push(item.quiz_name);
        Y.push(item.score); // to be replaced by percentage
      })

      // testing
      X.push('paper 2')
      X.push('paper 3')
      X.push('paper 4')
      X.push('paper 5')
      Y.push(30)
      Y.push(50)
      Y.push(70)
      Y.push(60)
      // end testing

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
      <Card className="mb-5">
        <CardBody>
          <CardTitle>Quiz Results</CardTitle>
          <div className="chart-container">
            {
              graphData && <Line data={graphData} options={chartOptions} />
            }
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                {
                  headers.map((item, idx) => <th key={idx}>{item}</th>)
                }
              </tr>
            </thead>
            <tbody>
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
  )
}
