import Backgroung_img from '../photos/img_start.jpg'
import '../App.css'
import { Button } from '@mui/material';
import { ContactEmergency } from '@mui/icons-material';


function StartPage(props:any){
    props.setHeadliner("Welcome to my web page!")

return(
<img src={Backgroung_img} alt="start" className='start_image'/>

)
}


export default StartPage;