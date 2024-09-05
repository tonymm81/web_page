import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import List_box from './components/List_box';
import { Box, Button, Container, Dialog, Rating, TextField, Typography } from '@mui/material';
import StartPage from './components/StartPage';
import Forecast from './components/Forecast'
import Work_time from './components/Work_time';
import LogIn from './components/LogIn';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import News_page from './components/News_page'
import Portfolio from './components/Portfolio';
import StarIcon from '@mui/icons-material/Star';
import Footer from './components/Footer';
import DOMPurify from 'dompurify';

// this is the main program.Only routes shown here

const App: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(String(localStorage.getItem("token")));
  const [tokenSecondary, setTokenSecondary] = useState<string>(String(localStorage.getItem("tokensecondary")));
  const [headliner, setHeadliner] = useState<string>("Welcome to my web page!")
  const [allowForecast, setAllowForecast] = useState<boolean>(true)
  const [captcha, setCaptcha] = useState<boolean>(true)
  const [feedBackDialog, setFeedBackDialog] = useState<boolean>(false)
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [forecast_timestamp, setForecast_timestamp] = useState<Date>(new Date());
  const [news_timestamp, setNews_timestamp] = useState<Date>(new Date());
  const [browser_path, setBrowser_path] = useState<string>();
  localStorage.setItem("last_path", "/");
  const feedbackInput: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
  const FeedbackName: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

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
  const sendFeedback = async () : Promise<void> =>{
    //here some apicall to save the feedback from user
    console.log(value)
    const connfeedbackConnection = await fetch("/api/feedback/saveFeedback", { // post request what check in user has finded
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSecondary}`
      },
      body: JSON.stringify({
        feedbackName: DOMPurify.sanitize(String(FeedbackName.current?.value)),
        feedback: DOMPurify.sanitize(String(feedbackInput.current?.value)),
        timeFeedback : new Date(),
        feedbackRate : Number(value)
      })
  });
  console.log(connfeedbackConnection)
  if (connfeedbackConnection.status === 200){
  setFeedBackDialog(false)
  }else{
    alert("something went wrong")
  }
  }
  const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
  
  return (
<>
    <Container className='App'>

      <Typography className='headliner' variant="h3">{headliner}</Typography>

      <List_box setFeedBackDialog={setFeedBackDialog} />
      
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
      <Container className='DialogContainer' key={"dialogContainer"}>
      <Dialog open={feedBackDialog} className='feedbackDialog' fullWidth={true}>
          <Box
          sx={{
            width: 250,
            display: 'flex',
            alignItems: 'center',
          }}
        >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
               )}
           </Box>
        <TextField multiline={true} label={"write your feedback here"} sx={{margin:"10px"}} inputRef={feedbackInput} >
        </TextField>
        <TextField multiline={true} label={"Give your nickname if you want"} sx={{margin:"10px"}} inputRef={FeedbackName} >
          
        </TextField>
      <Button variant="contained" sx={{margin:"5px"}} onClick={()=> sendFeedback()}>send feedback
      </Button>
        <Button variant="contained" sx={{margin:"5px"}} onClick={()=> setFeedBackDialog(false)}>cancel
          </Button>
      </Dialog>
      </Container>
    </Container>
    <Container className='appFooter' key={"footerContainer"}>
     
      <Footer/>
      
    </Container>
    </>
  );
}

export default App;
