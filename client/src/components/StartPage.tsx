import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Button, Container, Dialog, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
//import {Captcha} from "./Captcha";
import { useEffect } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";


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
  const [dialogStart, setDialogStart] = useState<boolean>(true)
  const navigate: NavigateFunction = useNavigate();
  //console.log(props.captcha)
 
  useEffect(() => {
    localStorage.setItem("last_path", "/StartPage")
    if (props.headliner === "Welcome to my web page!") {//headliner

    } else {
      props.setHeadliner("Welcome to my web page!")
  
      props.setAllowForecast(true)
    }
}, [])

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const close_captcha = async (res: boolean | string): Promise<void> => {// here we check the googles token and make request to server
    setDialogStart(false)

    const gettequest = await fetch("/api/auth/login/getsSecondary", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "Response_from_google": res })
    })
    const tokenSecondary = await gettequest.json();
    if (gettequest.status === 200) {
      props.setTokenSecondary(tokenSecondary)
      props.setCaptcha(false)
      localStorage.setItem("tokensecondary", tokenSecondary);
      navigate("/")
    } else {
      alert("Capcha failed. Please try again and refresh you browser ")
    }

  }

  return (

    <Container className='start_image' >

      <Button variant="contained"
        color="inherit"
        startIcon={<QuizIcon />} onClick={() => { setOpenDialog(true) }}> Information about page </Button>
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