import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Button, Container, Dialog, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import {Captcha} from "./Captcha";
import { useEffect } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

interface AppProps {}
interface AppState {}

interface Props {
    captcha : boolean
  setHeadliner : Dispatch<SetStateAction<string>>
  setCaptcha : Dispatch<SetStateAction<boolean>>
  setAllowForecast : Dispatch<SetStateAction<boolean>>
  headliner : string
  setTokenSecondary : Dispatch<SetStateAction<string>>
}



const StartPage: React.FC<Props> = (props : Props) : React.ReactElement => {
    const [dialogStart, setDialogStart ]= useState<boolean>(true)
    const navigate : NavigateFunction = useNavigate();
    console.log(props.captcha)
    if (props.headliner === "Welcome to my web page!"){//headliner

    }else{
        props.setHeadliner("Welcome to my web page!")
        props.setAllowForecast(true)
    }
    
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const close_captcha = async (res: boolean) : Promise<void> => {
        console.log(res)
        if (res === true){
            setDialogStart(false)
            console.log(dialogStart)
            const gettequest = await fetch("/api/auth/login/getsSecondary", {method:"POST"})
            const tokenSecondary = await gettequest.json();
            console.log(tokenSecondary)
            props.setTokenSecondary(tokenSecondary)
            props.setCaptcha(false)
            navigate("/")
        }else{
            alert("please try again")
        }
    }
    
 //in this component here we have dialog box and buttons. Short information about a page.
return(
    
<Container className='start_image' >

    <Button variant="contained" 
    color ="inherit"
    startIcon={<QuizIcon/>} onClick={() => {setOpenDialog(true)}} > Information about page </Button>
    <Dialog open={openDialog} >This is the web page. Demo page. Page wont save anything to local store. There is Forecast
    view where you can search forecast based on choosed city or town. There is working time application also. There
    user can log in as employer and fill up the needed information. In employee view employee can save jod hours and datetime and
    job description. There is also my projects view where you can watch my projects code. Last page is information about me. And in 
    menu bar there is drawer where user can navigate to another pages. in menubar is also link to this webpages code. And this website
    are not oprimazed to mobile devices. I do that later after i finish that course in the school :)
    <Button variant="contained" color="inherit" onClick={() => {setOpenDialog(false)}}>Close</Button>
    </Dialog>


    <Dialog open={props.captcha}><Typography variant="body1">Hello. I have this site 2 different free api services. Sorry but i have to test
                                                            that you are not robot who i shammering my site apicalls. After test you can use my
                                                            like you want
                                                            </Typography> <Captcha validate={(res)=>{close_captcha(res)}}/>
        Enter the code and continue</Dialog>
</Container>

)
}


export default StartPage;