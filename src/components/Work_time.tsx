import { Button, Container } from "@mui/material";
import { useState } from "react";
import '../App.css'

function Work_time (props?:any){
    props.setHeadliner("Working time application")
    const [addWorkTime, setAddWorkTime] = useState<Working_time[]>([])

    return(
    <Container className="workingtime">
        <Button variant="contained" color="inherit">employee sign in</Button>
        <Button variant="contained" color="inherit">employer sign in</Button>
        
    </Container>)
}


export default Work_time;