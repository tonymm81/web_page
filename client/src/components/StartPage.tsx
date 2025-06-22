import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Avatar, Button, Container, Dialog, Grow, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
//import {Captcha} from "./Captcha";
import { useEffect } from 'react';
import { Link, Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BadgeIcon from '@mui/icons-material/Badge';
import InfoIcon from '@mui/icons-material/Info';






interface AppProps { }
interface AppState { }


const sitekey_capcha = process.env.REACT_APP_GOOGLE_CAPTCHA_SITEKEY


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
  const [dialogStart, setDialogStart] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate();
  //console.log(props.captcha)
  const [testStart, setDTestStart] = useState<boolean>(true)
  useEffect(() => {
    localStorage.setItem("last_path", "/StartPage")
    if (props.headliner === "Toni Mäenpää's web page") {//headliner

    } else {
      props.setHeadliner("Toni Mäenpää's web page")

      props.setAllowForecast(true)
    }
    if (props.captcha === false) {
      setDTestStart(true)
    }
  }, [])

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const close_captcha = async (res: boolean | string): Promise<void> => {// here we check the googles token and make request to server
    setDialogStart(false)
    //props.setCaptcha(false)// remembre to remove this 
    const gettequest = await fetch("/api/auth/login/getsSecondary", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "Response_from_google": res })
    })
    const tokenSecondary = await gettequest.json();
    if (gettequest.status === 200) {
      props.setTokenSecondary(tokenSecondary)
      props.setCaptcha(false)
      setDTestStart(true)
      localStorage.setItem("tokensecondary", tokenSecondary);
      navigate("/")
    } else {
      alert("Capcha failed. Please try again and refresh you browser ")
    }
    //props.setCaptcha(false)// remembre to comment out this 
    //setDTestStart(true)
  }

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
                <ListItemText primary="Forecast page" secondary="i made this page that user can search forecast by search word. 
                                                                This is a free api weatherservise so you can do one search per 3 minutes.">

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
                <ListItemText primary="Work time page" secondary="Here you can create new user and password to him/her. After that log in employer mode and 
                                                                        choose employee and save the payment details and when the employee log in, he/she can
                                                                        can save the work time details like hours, description, date and choose the work id
                                                                        and employee sees, how much employee have payment based on saved hours
                                                                        in employer view you can see what work time registrations emploees have made ">

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
                <ListItemText primary="News page" secondary="I make this news page, where user can search news based on keyword or search top news
                                            from selected country. This is free api and there is also limited search one search per 3 minutes.
                                            If keyword show results, the news will print out to list with image and link to orginal source">

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
                <ListItemText primary="About me" secondary="Here I made some information about my self.">

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
                <ListItemText primary="My portfolio page" secondary="Here is my portfolio page. There is couple of projects more. This projects i have made in
                                                                          school. There is some mising features in page, but i will update those later. There you can
                                                                          check my graphical projects and one game project and aslo couple programming projects" >

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
      <Dialog open={openDialog} ><Typography variant="body1" sx={{ margin: "5px" }} >This is the demo page. Page wont save anything to local store except token and route. There is Forecast
        view where you can search forecast based on choosed city or town. There is working time application also. There
        user can log in as employer and fill up the needed information. In employee view employee can save jod hours and datetime and
        job description. There is also my projects view where you can watch my projects code. There is also news page where user can search news. Last page is information about me. And in
        menu bar there is drawer where user can navigate to another pages. in menubar is also link to this webpages code.</Typography>
        <Button variant="contained" color="inherit" onClick={() => { setOpenDialog(false) }}>Close</Button>
      </Dialog>


      <Dialog open={props.captcha}><Typography variant="body1" sx={{ margin: "5px" }} >Hello. I have on this site two different free api services. I am sorry to interrupt but i have to test
        that you are not robot who is hammering my site apicalls. After test you can use my
        like you want.
      </Typography>  <ReCAPTCHA
          sitekey={String(sitekey_capcha)}
          onChange={(e: any) => { close_captcha(e) }}
        />
      </Dialog>


    </Container>

  )
}


export default StartPage;