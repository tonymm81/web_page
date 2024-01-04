import { Box, Button, Container, Link, Typography } from "@mui/material"
import '../App.css'
import profilePicture from '../photos/profilePicture.gif'

//this component is not done yet.
function AboutMe(props : any){
    if (props.headLiner === "Information about me"){

    }else{
        props.setHeadliner("Information about me")
        props.setAllowForecast(true)
    }
    return(<Container className="Aboutme">
        <Box className="AboutMeBox">
            <Typography variant="h3">Hello!</Typography>
            <p>I have worked in plumbing intrusty 21 years. <br/>
                I have study programming about 4 years and it's my hobby also.<br/>
                 More i learn this became more interesting. Programming is nice, fun, fascionating <br/>
                job and my dream is that i find a job where i can build programs, debug them and <br/>
                do the testing. I have done IOT projects also and hardware side is huge. <br/>
                Now i am studying a grade witch hopefully helps me to get this dreamed job <br/>
                Bachelor of Business Administration - Data procressing is the grade. <br/>
                My hobbies are excercise and drum playing. I am also good team player <br/>
                in job. I have two blackmetal bands and we have also puplish records<br/>
                Bands are Uhrilahja and Musta Suru. If you are interested to know <br/>
                more about me i put the links and email address down belove<br/>
                <Link href="www.linkedin.com/in/toni-mäenpää-404461222" rel="noopener"
                target="_blank" variant="button" color="inherit" >Linkeldin </Link>
                Email : tonimaenpaa81(at).gmail.com

            </p>
        </Box>
        <img src={profilePicture} alt="profile" className="profilePic"/>
    
    </Container>)
}



export default AboutMe;