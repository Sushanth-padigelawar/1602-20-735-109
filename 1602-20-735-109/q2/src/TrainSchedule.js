import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        // Get the authorization token first
        const authResponse = await axios.post('http://20.244.56.144/train/auth', {
          companyName: 'Abcd',
          clientID: '6acbf5ba-c3ca-40ea-860d-6a59218888fa',
          ownerName: 'Harshith',
          ownerEmail: 'sreeharshithvajinepalli7@gmail.com',
          rollNo: '160120733054',
          clientSecret: 'FFHyEoMLDLLEhEqi'
        });

        const token = authResponse.data.access_token;

        // Use the obtained token to fetch train data
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const trainResponse = await axios.get('http://20.244.56.144:80/train/trains', { headers });
        const data = trainResponse.data;

        setTrains(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <Container>
      <h1>Train Schedules</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Train Name</TableCell>
                <TableCell>Train Number</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Seat Availability (Sleeper)</TableCell>
                <TableCell>Seat Availability (AC)</TableCell>
                <TableCell>Price (Sleeper)</TableCell>
                <TableCell>Price (AC)</TableCell>
                <TableCell>Delay (Minutes)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trains && trains.length > 0 && trains.map((train, index) => (
                <TableRow key={index}>
                  <TableCell>{train.trainName}</TableCell>
                  <TableCell>{train.trainNumber}</TableCell>
                  <TableCell>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</TableCell>
                  <TableCell>{train.seatsAvailable.sleeper}</TableCell>
                  <TableCell>{train.seatsAvailable.AC}</TableCell>
                  <TableCell>{train.price.sleeper}</TableCell>
                  <TableCell>{train.price.AC}</TableCell>
                  <TableCell>{train.delayedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TrainSchedule;