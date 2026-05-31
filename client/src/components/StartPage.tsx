//import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Avatar, Box, Button, CircularProgress, Container, Dialog, Grow, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import type { Dispatch, SetStateAction } from 'react';
import { useRef, useState } from 'react';
//import {Captcha} from "./Captcha";
import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { Link, Navigate, useNavigate } from 'react-router-dom';
//import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import NightsStayIcon from '@mui/icons-material/NightsStay';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BadgeIcon from '@mui/icons-material/Badge';
import InfoIcon from '@mui/icons-material/Info';






interface AppProps { }
interface AppState { }


const sitekey_capcha = import.meta.env.VITE_GOOGLE_CAPTCHA_SITEKEY


interface Props {
  captcha: boolean
  setHeadliner: Dispatch<SetStateAction<string>>
  setCaptcha: Dispatch<SetStateAction<boolean>>
  setAllowForecast: Dispatch<SetStateAction<boolean>>
  headliner: string
  setTokenSecondary: Dispatch<SetStateAction<string>>
  refreshReCaptcha: boolean
}



const StartPage: React.FC<Props> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [testStart, setDTestStart] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);// version 197


  useEffect(() => {
    localStorage.setItem("last_path", "/StartPage");
    if (props.headliner !== "Toni Mäenpää's home page") {
      props.setHeadliner("Toni Mäenpää's home page");
      props.setAllowForecast(true);
    }
    if (props.captcha === false) {
      setDTestStart(true);
    } else {
      // jos captcha on päällä sivun alussa, pysäytetään animaatio kunnes verifioidaan
      setDTestStart(false);
    }
  }, []);
  useEffect(() => {
    console.log("captcha prop:", props.captcha);
    console.log("executeRecaptcha available:", !!executeRecaptcha);
  }, [props.captcha, executeRecaptcha]);



   useEffect(() => {
  let mounted = true;
  let retries = 0;
  const maxRetries = 5;

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runCaptcha = async () => {
    if (!mounted) return;
    if (!props.captcha) return;
    if (isFetching) return;

    // odotetaan executeRecaptchaia kunnes se on valmis tai retryt loppuu
    while (mounted && !executeRecaptcha && retries < maxRetries) {
      //console.log("executeRecaptcha not ready, retry", retries + 1);
      retries++;
      // eksponentiaalinen backoff: 500ms, 1000ms, 2000ms...
      await wait(500 * Math.pow(2, retries - 1));
    }

    if (!mounted) return;
    if (!executeRecaptcha) {
      //console.warn("executeRecaptcha still not ready after retries");
      setErrorMsg("Captcha service not ready. Click Start verification to try again.");
      return;
    }

    try {
      setErrorMsg(null);
      setIsFetching(true);
      // pysäytetään animaatio kun verifiointi alkaa
      setDTestStart(false);

      //console.log("Calling executeRecaptcha");
      const token = await executeRecaptcha("captcha_check");
     // console.log("Got token:", token);
      await close_captcha(token ?? "");
    } catch (err) {
      //console.error("executeRecaptcha or close_captcha error:", err);
      setErrorMsg("Captcha verification failed. Please try again.");
      setDTestStart(false);
    } finally {
      if (mounted) setIsFetching(false);
    }
  };

  runCaptcha();

  return () => { mounted = false; };
}, [props.captcha, executeRecaptcha, attempt]);


  const close_captcha = async (res: boolean | string): Promise<void> => {
    try {
      console.log("Sending token to server...");
      const gettequest = await fetch("/api/auth/login/getsSecondary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Response_from_google: res }),
      });
      const tokenSecondary = await gettequest.json();
      console.log("Server status:", gettequest.status, "response:", tokenSecondary, "responseRaw", gettequest);
      if (gettequest.status === 200) {
        props.setTokenSecondary(tokenSecondary);
        props.setCaptcha(false); // sulkee dialogin
        setDTestStart(true);
        localStorage.setItem("tokensecondary", tokenSecondary);
        navigate("/");
      } else {
        setErrorMsg("Captcha failed server verification. Please refresh and try again.");
        console.log("vitun captcha", gettequest);
      }
    } catch (err) {
      console.error("close_captcha fetch error", err);
      setErrorMsg("Network error while verifying captcha. Please try again.");
    }
  };
  
  const handleManualRetry = () => {
    setAttempt((a) => a + 1);
  };
  //console.log("ENV SITEKEY:", import.meta.env.VITE_GOOGLE_CAPTCHA_SITEKEY);
  //onsole.log("Provider reCaptchaKey (runtime):", document.querySelector('script[data-recaptcha-provider]') ? true : false);
  //console.log("window.grecaptcha:", !!window.grecaptcha);


  return (

    <Container className='start_image' >

      <Button variant="contained"
        color="inherit"
        startIcon={<QuizIcon />} onClick={() => { setOpenDialog(true) }}> Information about page </Button>

      <Container className='StartInfo'>
        <List>
          <Grow in={testStart}>
            <ListItem className='startpageList' >
              <Stack direction="row" spacing={2}>
                <ListItemButton
                  component={Link}
                  to="/Forecast">
                  <ListItemAvatar>Fc
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="Forecast page" secondary="This page lets you search for weather forecasts by typing in any location.  
                                                                  It uses a free weather API with a limit of one request every 3 minutes.">

                </ListItemText>
                <ListItemButton
                  component={Link}
                  to="/Forecast">
                  <ListItemIcon><NightsStayIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
          <Grow
            in={testStart}
            style={{ transformOrigin: '0 0 0' }}
            {...(testStart ? { timeout: 1000 } : {})}
          >
            <ListItem className='startpageList' >
              <Stack direction="row" spacing={2}>
                <ListItemButton
                  component={Link}
                  to="/Work_time">
                  <ListItemAvatar>Wt
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="Work time page" secondary="Here you can create a new user and set a password for them.  
                                                                After that, log in as an employer, choose an employee and save their payment details.  
                                                                When the employee logs in, they can record their work time: hours, description, date and work ID.  
                                                                Employees can also see how much they have earned based on the saved hours.  
                                                                In the employer view, you can see all work time registrations made by employees.
                                                                ">

                </ListItemText>
                <ListItemButton
                  component={Link}
                  to="/Work_time">
                  <ListItemIcon> <EditIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
          <Grow
            in={testStart}
            style={{ transformOrigin: '0 0 0' }}
            {...(testStart ? { timeout: 2000 } : {})}
          >
            <ListItem className='startpageList' >
              <Stack direction="row" spacing={2}>
                <ListItemButton
                  component={Link}
                  to="/Projects">
                  <ListItemAvatar>Pp
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="My projects page" secondary="Here in  my projects page I present you couple of my own projects. I will update this view 
                                                                          soon, because projects are behind buttons and by clicking them dialog opens, and you see
                                                                          full description with images.">

                

                </ListItemText>
                <ListItemButton
                  component={Link}
                  to="/Projects">
                  <ListItemIcon> <CodeIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
          <Grow
            in={testStart}
            style={{ transformOrigin: '0 0 0' }}
            {...(testStart ? { timeout: 3000 } : {})}
          >
            <ListItem className='startpageList' >
              <Stack direction="row" spacing={2}>
                <ListItemButton
                  component={Link}
                  to="/News_page">
                  <ListItemAvatar>Np
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="News page" secondary="I built this news page so users can search for news by keyword or browse top news from a selected country.  
                                                              This service uses a free news API, which allows one search every 3 minutes.  
                                                              If the keyword returns results, the news items are listed with an image and a link to the original source.
                                                              ">

                </ListItemText>
                <ListItemButton
                  component={Link}
                  to="/News_page">
                  <ListItemIcon>  <LibraryBooksIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
          <Grow
            in={testStart}
            style={{ transformOrigin: '0 0 0' }}
            {...(testStart ? { timeout: 4000 } : {})}
          >
            <ListItem className='startpageList' >
              <Stack direction="row" spacing={8}>
                <ListItemButton
                  component={Link}
                  to="/AboutMe">
                  <ListItemAvatar>Am
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="About me" secondary="Here you can read more about me, my background, my interests and my studies.
">

                </ListItemText>
                <ListItemButton

                  component={Link}
                  to="/AboutMe">
                  <ListItemIcon>   <InfoIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
          <Grow
            in={testStart}
            style={{ transformOrigin: '0 0 0' }}
            {...(testStart ? { timeout: 5000 } : {})}
          >
            <ListItem className='startpageList'  >
              <Stack direction="row" spacing={2}>
                <ListItemButton
                  component={Link}
                  to="/Portfolio">
                  <ListItemAvatar>Pf
                  </ListItemAvatar>
                </ListItemButton>
                <ListItemText primary="My portfolio page" secondary="Here is my portfolio page. There are a few more projects here, most of which I created during my studies.  
                                                                    Some features are still missing, but I will update them later.  
                                                                    On this page you can find my graphical projects, one game project, and a few programming projects.
                                                                    " >

                </ListItemText>
                <ListItemButton
                  component={Link}
                  to="/Portfolio">
                  <ListItemIcon>   <BadgeIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Stack>
            </ListItem>
          </Grow>
        </List>
      </Container>
      <Dialog open={openDialog} ><Typography variant="body1" sx={{ margin: "5px" }} >This is the demo page. The page does not save anything to local storage except the token and route.  
                                                                                      There is a Forecast view where you can search for weather based on a chosen city or town.  
                                                                                      There is also a Working Time application, where an employer can log in and fill in the required information.  
                                                                                      In the employee view, employees can save job hours, date and time, and a job description.  
                                                                                      There is also a Projects view where you can explore my project code.  
                                                                                      The News page lets you search for news.  
                                                                                      The last page contains information about me.  
                                                                                      In the menu bar, there is a drawer for navigating between pages, and a link to this webpage’s source code.
</Typography>
        <Button variant="contained" color="inherit" onClick={() => { setOpenDialog(false) }}>Close</Button>
      </Dialog>


      
     
             <Dialog open={props.captcha} disableEscapeKeyDown>
      <Box sx={{ p: 2, minWidth: 320 }}>
        <Typography sx={{ marginBottom: 2 }}>
          Hello. I have on this site two different free api services. I am sorry to interrupt but i have to test
          that you are not robot who is hammering my site apicalls. After test you can use my like you want.
        </Typography>

        {isFetching ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={24} />
            <Typography>Verifying, please wait...</Typography>
          </Box>
        ) : errorMsg ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography color="error">{errorMsg}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" onClick={handleManualRetry}>Try again</Button>
              <Button variant="outlined" onClick={() => window.location.reload()}>Refresh page</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "text.secondary" }}>Preparing captcha verification...</Typography>
            <Button size="small" onClick={handleManualRetry}>Start verification</Button>
          </Box>
        )}
      </Box>
    </Dialog>
    </Container>

  )
}


export default StartPage;