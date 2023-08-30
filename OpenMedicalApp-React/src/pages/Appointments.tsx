import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

function Appointments() {
  // Sample data for the chart
  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Appointments',
        data: [15, 20, 18, 25, 22],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [] = useState(0);

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h1>Appointments</h1>
          <p>This page displays the weekly appointment schedule.</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={8}>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="appointment-list">
            <h3>Upcoming Appointments</h3>
            <ul>
              <li>Patient: John Doe - Time: 10:00 AM</li>
              <li>Patient: Jane Smith - Time: 2:30 PM</li>
              <li>Patient: Alex Johnson - Time: 3:45 PM</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointments;
