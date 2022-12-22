import { Button, Container, Select, TextField } from "@mui/material";
import { useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';
import LoginIcon from '@mui/icons-material/Login';
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers'


function Work_time (props?:any){
    props.setHeadliner("Working time application")
    const [addWorkTime, setAddWorkTime] = useState<Working_time[]>([])
    const [timenow, setTimenow] = useState<Date>(new Date())

    return(
    <Container className="workingtime">
         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Button variant="contained" 
            color="inherit"
            startIcon={<LoginIcon/>} >employee sign in
            </Button>
        <Button variant="contained" 
            color="inherit"
            startIcon={<LoginIcon/>}>employer sign in
            </Button>

        <TextField
            label="Give here job description"
            name="jobDescription"
            variant="outlined"
            />
        <TextField
            label="Write here how much hours you use this project"
            name="jobHours"
            variant="outlined"
            />

        <Select
           label="Choose the job id" 
        />

<DateTimePicker 
            label="choose here date and time"
            value={timenow}
            disableMaskedInput={true}
            disableFuture={true}
            onChange={(choosedTime : Date | null) => setTimenow(choosedTime!)}
            renderInput={(params : any) => <TextField {...params} 
                                            fullWidth={true}
                                            sx={{marginBottom : "10px"}}
                                            
                                            />}
        />
     </LocalizationProvider>   
     <Button variant="contained"
        color="inherit"
        startIcon={<SaveIcon/>}
        >Save the data</Button>
    </Container>)
}


export default Work_time;