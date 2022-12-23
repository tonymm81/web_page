import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import List_box from './components/List_box';
import { Container, Typography } from '@mui/material';
import StartPage from './components/StartPage';
import Forecast from './components/Forecast'
import Work_time from './components/Work_time';
import LogIn from './components/LogIn';



const App : React.FC = () : React.ReactElement => {
  const [headliner, setHeadliner] = useState<string>("Welcome to my web page!")
  const [allowForecast, setAllowForecast] = useState<boolean>(true)
  return (
   <Container className='App'>
    <Typography className='headliner' variant="h2">{headliner}</Typography>
    
    <List_box/> 
    <Routes>
      <Route path="/" element={ <StartPage setHeadliner={setHeadliner}/> } />
      <Route path="/Forecast" element={<Forecast 
                                      setHeadliner={setHeadliner}
                                      setAllowForecast={setAllowForecast}
                                      allowForecast={allowForecast}
                                      />} />
      <Route path="/Work_time" element={<Work_time setHeadliner={setHeadliner} />} />
      <Route path="/LogIn" element={<LogIn/>} />
    </Routes>
   </Container>
  );
}

export default App;
