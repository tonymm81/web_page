import { Container } from "@mui/material"
import '../App.css'

//this component is not done yet.
function AboutMe(props : any){
    if (props.headLiner === "Information about me"){

    }else{
        props.setHeadliner("Information about me")
        props.setAllowForecast(true)
    }
    return(<Container className="Aboutme"></Container>)
}



export default AboutMe;