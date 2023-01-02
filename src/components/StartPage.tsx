import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Button, Container, Dialog } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useState } from 'react';

function StartPage(props:any){
    props.setHeadliner("Welcome to my web page!")
    const [openDialog, setOpenDialog] = useState<boolean>(false);
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
    menu bar there is drawer where user can navigate to another pages. in menubar is also link to this webpages code.
    <Button variant="contained" color="inherit" onClick={() => {setOpenDialog(false)}}>Close</Button>
    </Dialog>

</Container>

)
}


export default StartPage;