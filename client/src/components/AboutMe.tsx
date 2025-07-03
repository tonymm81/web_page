import { Box, Container, Link, Stack, Typography } from "@mui/material"
import '../App.css'
import profilePicture from '../photos/profilePicture.gif'
import { useEffect } from "react"

//this component is not done yet.
function AboutMe(props : any){
   
    useEffect(() => {
        
        if (props.headLiner === "Information about me"){

        }else{
            props.setHeadliner("Information about me")
            localStorage.setItem("last_path", "/AboutMe")
            props.setAllowForecast(true)
        }
    }, [])
    return(<Container className="Aboutme">
        <Box className="AboutMeBox">
            <Stack direction="column" spacing={2} key={"aboutMe"}>
            <Typography variant="h3">My story</Typography>
            <Typography variant="body1">I have worked in plumbing intrusty 21 years. 
                I have studied programming about 5 years and it's one of my hobby also.
                 More I learn this became more interesting. Programming is nice, fun, fascionating 
                job and my dream is that I find a job where I can build programs, debug them and 
                do the testing. I have done IOT projects also and hardware side is huge. 
                Now I am studying a grade witch hopefully helps me to get this dreamed job 
                Bachelor of Business Administration -Business information tchnology is the degree. 
                I gradiuate from school and my avarage grade is 3.92 / 5.00. 
                </Typography>
                <Typography variant="body1">
                I am also good team player in job. 
                I am working at this moment in Opentext oy and my role is Associate consultant. 
                My daily work is system integration and I really like my job and work place. 
                I have a great team and its really nice to work with them daily.
                </Typography>
                <Typography variant="body1">
                My hobbies are excercise and drum playing.I have two blackmetal bands and we have also <br/>
                puplished records. Bands are Uhrilahja and Musta Suru. If you are interested to know <br/>
                more about me, I put the links and email address down belove<br/>
                <Link href="www.linkedin.com/in/toni-mäenpää-404461222" rel="noopener"
                target="_blank" variant="button" color="inherit" >Linkeldin </Link>
                Email : tonimaenpaa81(at).gmail.com
                </Typography>
                </Stack>
            
        </Box>
        <img src={profilePicture} alt="profile" className="profilePic"/>
    
    </Container>)
}



export default AboutMe;