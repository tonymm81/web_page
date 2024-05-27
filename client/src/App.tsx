import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, HashRouter  } from 'react-router-dom';
import List_box from './components/List_box';
import { Container, Typography } from '@mui/material';
import StartPage from './components/StartPage';
import Forecast from './components/Forecast'
import Work_time from './components/Work_time';
import LogIn from './components/LogIn';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import News_page from './components/News_page'
import Portfolio from './components/Portfolio';

// this is the main program.Only routes shown here

const App: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(String(localStorage.getItem("token")));
  const [tokenSecondary, setTokenSecondary] = useState<string>(String(localStorage.getItem("tokensecondary")));
  const [headliner, setHeadliner] = useState<string>("Welcome to my web page!")
  const [allowForecast, setAllowForecast] = useState<boolean>(true)
  const [captcha, setCaptcha] = useState<boolean>(true)
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [forecast_timestamp, setForecast_timestamp] = useState<Date>(new Date());
  const [news_timestamp, setNews_timestamp] = useState<Date>(new Date());
  const [browser_path, setBrowser_path] = useState<string>();
  localStorage.setItem("last_path", "/");

  useEffect(() => {
    if(browser_path === undefined){
      localStorage.setItem("last_path", "/");
      setBrowser_path("/")
    }else{
      setBrowser_path(String(localStorage.getItem("last_path")))
      console.log("app.tsx", browser_path, localStorage.getItem("last_path"))
      navigate(String(Boolean(browser_path) ? browser_path : "/"))
    }
  }, [])

  return (

    <Container className='App'>

      <Typography className='headliner' variant="h3">{headliner}</Typography>

      <List_box />
      
      <Routes>
        <Route path="/" element={<StartPage setHeadliner={setHeadliner}
          headliner={headliner}
          setAllowForecast={setAllowForecast}
          captcha={captcha}
          setCaptcha={setCaptcha}
          setTokenSecondary={setTokenSecondary}
          refreshReCaptcha={refreshReCaptcha} />} />
        <Route path="/Forecast" element={<Forecast
          setHeadliner={setHeadliner}
          setAllowForecast={setAllowForecast}
          allowForecast={allowForecast}
          tokenSecondary={tokenSecondary}
          forecast_timestamp={forecast_timestamp}
          setForecast_timestamp={setForecast_timestamp} />} />
        <Route path="/Work_time" element={<Work_time setHeadliner={setHeadliner}
          setAllowForecast={setAllowForecast}
          setToken={setToken}
          token={token} />} />
        <Route path="/LogIn" element={<LogIn setToken={setToken} />} />
        <Route path="/Projects" element={<Projects setHeadliner={setHeadliner}
          setAllowForecast={setAllowForecast} />} />

        <Route path="/News_page" element={<News_page setHeadliner={setHeadliner}
          setAllowForecast={setAllowForecast}
          tokenSecondary={tokenSecondary}
          news_timestamp={news_timestamp}
          setNews_timestamp={setNews_timestamp} />} />
        <Route path="/AboutMe" element={<AboutMe setHeadliner={setHeadliner}
          setAllowForecast={setAllowForecast} />} />
         <Route path="/Portfolio" element={<Portfolio setHeadliner={setHeadliner}
           />} />
      </Routes>
    </Container>

  );
}

export default App;
