import { Button, Container, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers'
//icons import
import LogIn from "./LogIn";
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';


function Work_time (props?:any){
    props.setHeadliner("Working time application")
    const textHandler : Employee_data  = useRef<Employee_data>({});
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState([" it talo id: 1020","jätelaitos id: 1300", "joku laitos id: 1502"])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW,setLogInVIEW] = useState<boolean>(true);

    const textfieldsHandler  = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
        textHandler.current[e.target.name] = e.target.value
         }   
         
    const employeeField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();
        console.log("employee")
    }

    const employerField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();
        console.log("employer")
    }

    return(
    <Container className="workingtime">
         <Button variant="contained" 
        color="inherit"
        onClick={() => {setLogInVIEW(true)}}
        startIcon={<LogoutIcon/>}>Log out</Button>
        {loginVIEW?
        
        <LogIn setEmployeeView={setEmployeeView} setLogInVIEW={setLogInVIEW}/>
        
        :
        

        (employeeView)? 
        <form onSubmit={employeeField} >
         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Typography variant="h4">Welcome employee test</Typography>
       
        <TextField
            label="Give here job description"
            name="jobDescription"
            variant="outlined"
            fullWidth={true}
            className='worktimeFields'
            onChange={textfieldsHandler}
            />
        <TextField
            className='worktimeFields'
            label="Write here how much hours you use this project"
            name="jobHours"
            variant="outlined"
            fullWidth={true}
            onChange={textfieldsHandler}
            />
        <InputLabel id="jobID">choose job id</InputLabel>
        <Select
           id="jobID"
           label="Choose the job id" 
           value={selectedID}
           fullWidth={true}
           className='worktimeFields'
           defaultValue="select job id here"
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
        type="submit"
        >Save the data</Button>
        
     </LocalizationProvider>  
     </form>
    :
    <form onSubmit={employerField}>
    <Typography variant="h4">Welcome employer test</Typography>
    <><TextField
                    className='worktimeFields'
                    label="Enter here employee name"
                    name="employeeName"
                    variant="outlined"
                    fullWidth={true} 
                    onChange={textfieldsHandler}/>

                    <TextField
                        className='worktimeFields'
                        label="Give here workID"
                        name="workIDs"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandler} />

                    <TextField
                        className='worktimeFields'
                        label="Give here employee payment"
                        name="payment"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandler} />

                    <TextField
                        className='worktimeFields'
                        label="Give here employee tax precent"
                        name="Taxs"
                        variant="outlined"
                        fullWidth={true} 
                        onChange={textfieldsHandler}/>

                    

                    <Button variant="contained"
                            color="inherit"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >Submit and save</Button></>
                        </form> } 
        </Container>) 
}


export default Work_time;