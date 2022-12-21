import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import List_box from './components/List_box';
import { Container, Typography } from '@mui/material';
import StartPage from './components/StartPage';



const App : React.FC = () : React.ReactElement => {
  const [headliner, setHeadliner] = useState<string>("Welcome to my web page!")
  return (
   <Container className='App'>
    <Typography className='headliner' variant="h2">{headliner}</Typography>
    
    <List_box/>
    <StartPage/>
    
   </Container>
  );
}

export default App;
