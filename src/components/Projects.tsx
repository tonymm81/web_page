import { Box, Button, Container } from "@mui/material";
import '../App.css'



function Projects(props?:any){
    props.setHeadliner("My Projects")

    return(<Container className="projects" >    
    <Box>Weatherstation 
        <Button variant="contained" color="inherit">Link to project's code</Button>
    </Box>
    <Box>Table project 
        <Button variant="contained" color="inherit">Link to project's code</Button>
    </Box>
    <Box>Working place automation 
        <Button variant="contained" color="inherit">Link to project's code</Button>
    </Box>

    


    </Container>)
}

export default Projects;