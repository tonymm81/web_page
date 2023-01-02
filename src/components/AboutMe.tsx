import { Container } from "@mui/material"
import '../App.css'

//this component is not done yet.
function AboutMe(props : any){
    props.setHeadliner("Information about me")

    return(<Container className="Aboutme"></Container>)
}



export default AboutMe;