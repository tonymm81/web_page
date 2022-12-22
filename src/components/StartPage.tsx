import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Button, Container } from '@mui/material';
import { ContactEmergency } from '@mui/icons-material';


function StartPage(props:any){
    props.setHeadliner("Welcome to my web page!")

return(
<Container className='start_image' >
    <Button variant="contained" color ="inherit"> Information about page </Button>
</Container>

)
}


export default StartPage;