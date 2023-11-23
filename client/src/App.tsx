import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import List_box from './components/List_box';
import { Container, Typography } from '@mui/material';
import StartPage from './components/StartPage';
import Forecast from './components/Forecast'
import Work_time from './components/Work_time';
import LogIn from './components/LogIn';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import News_page from './components/News_page'

// this is the main program.Only routes shown here

const App : React.FC = () : React.ReactElement => {
  const [token, setToken] = useState<string>(String(localStorage.getItem("token")));
  const [tokenSecondary, setTokenSecondary] = useState<string>(String(localStorage.getItem("token")));
  const [headliner, setHeadliner] = useState<string>("Welcome to my web page!")
  const [allowForecast, setAllowForecast] = useState<boolean>(true)
  const [captcha, setCaptcha] = useState<boolean>(true)
  return (
    
   <Container className='App'>
    
    <Typography className='headliner' variant="h3">{headliner}</Typography>
    
    <List_box/> 
    <Routes>
      <Route path="/" element={ <StartPage setHeadliner={setHeadliner}
                                  headliner={headliner}
                                  setAllowForecast={setAllowForecast}
                                  captcha={captcha} 
                                  setCaptcha={setCaptcha} 
                                  setTokenSecondary={setTokenSecondary} /> } />
      <Route path="/Forecast" element={<Forecast 
                                      setHeadliner={setHeadliner}
                                      setAllowForecast={setAllowForecast}
                                      allowForecast={allowForecast}
                                      tokenSecondary={tokenSecondary} />} />
      <Route path="/Work_time" element={<Work_time setHeadliner={setHeadliner} 
                                                  setAllowForecast={setAllowForecast}
                                                  setToken={setToken}
                                                  token={token}/>} />
      <Route path="/LogIn" element={<LogIn setToken={setToken} />} />
      <Route path="/Projects" element={<Projects setHeadliner={setHeadliner} 
                                                setAllowForecast={setAllowForecast}/>} />

      <Route path="/News_page" element={<News_page setHeadliner={setHeadliner} 
                                              setAllowForecast={setAllowForecast}
                                              tokenSecondary={tokenSecondary}/>} />
      <Route path="/AboutMe" element={<AboutMe setHeadliner={setHeadliner} 
                                              setAllowForecast={setAllowForecast}/>} />
    </Routes>
   </Container>
   
  );
}

export default App;
