import { Button, Container, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';
import LoginIcon from '@mui/icons-material/Login';
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers'
import LogIn from "./LogIn";


function Work_time (props?:any){
    props.setHeadliner("Working time application")
    const [addWorkTime, setAddWorkTime] = useState<Working_time[]>([])
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState([1020, 1300, 1502])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW,setLogInVIEW] = useState<boolean>(false);

   

    return(
    <Container className="workingtime">
         <Button variant="contained" 
            color="inherit"
            startIcon={<LoginIcon/>}
            className='worktimeFields'
            onClick={() => {setEmployeeView(true)}}>employee sign in
            </Button>
        <Button variant="contained" 
            color="inherit"
            startIcon={<LoginIcon/>}
            className='worktimeFields'
            onClick={() => {setEmployeeView(false)}}>employer sign in
            </Button>
        
        <LogIn/> 
        
        {employeeView? 
         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
       
       
        <TextField
            label="Give here job description"
            name="jobDescription"
            variant="outlined"
            fullWidth={true}
            className='worktimeFields'
            />
        <TextField
            className='worktimeFields'
            label="Write here how much hours you use this project"
            name="jobHours"
            variant="outlined"
            fullWidth={true}
            
            />

        <Select
           label="Choose the job id" 
           value={selectedID}
           fullWidth={true}
           className='worktimeFields'
           onChange={(e : SelectChangeEvent) => { setSelectedID(e.target.value) }}
        >
            {workID.map((num) =>  {return <MenuItem value={num} key={num}> {num}</MenuItem>})}
           
        </Select>

<DateTimePicker 
            label="choose here date and time"
            className='worktimeFields'
            value={timenow}
            disableMaskedInput={true}
            disableFuture={true}
            onChange={(choosedTime : Date | null) => setTimenow(choosedTime!)}
            renderInput={(params : any) => <TextField {...params} 
                                            fullWidth={true}
                                            sx={{marginBottom : "10px"}}
                                            
                                            />}
        />

<Button variant="contained"
        color="inherit"
        startIcon={<SaveIcon/>}
        >Save the data</Button>
        
     </LocalizationProvider>   
    :
    <><TextField
                    className='worktimeFields'
                    label="Enter here employee name"
                    name="employeeName"
                    variant="outlined"
                    fullWidth={true} />
                    <TextField
                        className='worktimeFields'
                        label="Give here workID"
                        name="workIDs"
                        variant="outlined"
                        fullWidth={true} />
                    <TextField
                        className='worktimeFields'
                        label="Give here employee payment"
                        name="payment"
                        variant="outlined"
                        fullWidth={true} />
                    <TextField
                        className='worktimeFields'
                        label="Give here employee tax precent"
                        name="Taxs"
                        variant="outlined"
                        fullWidth={true} />
                    <Button variant="contained"
                            color="inherit"
                            startIcon={<SaveIcon />}
                        >Submit and save</Button></> }
        </Container>) 
}


export default Work_time;