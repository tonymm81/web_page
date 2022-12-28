import { Container } from "@mui/material"
import '../App.css'


function AboutMe(props : any){
    props.setHeadliner("Information about me")

    return(<Container className="Aboutme"></Container>)
}



export default AboutMe;