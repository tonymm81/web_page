import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers'
//icons import
import LogIn from "./LogIn";
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';

interface WarningTexts extends Employee_data {}
interface WarningTextsemployer extends Employer_data {}

function Work_time (props?:any){
    props.setHeadliner("Working time application")//this will change the headliner
    const textHandler : Employee_data  = useRef<Employee_data>({});
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState([" it talo id: 1020","jätelaitos id: 1300", "joku laitos id: 1502"])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW,setLogInVIEW] = useState<boolean>(true);
    const [warningHandling, setWarningHandling] = useState<WarningTexts>({})
    const [warningHandlingemployer, setWarningHandlingemployer] = useState<WarningTextsemployer>({})
    const [saveEmployeeData, setSaveEmployeeData] = useState<Employee_data[]>([])
    const [employeeName, setEmployeeName] = useState<string>("mister test")
 
    const textfieldsHandler  = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
        textHandler.current[e.target.name] = e.target.value
         }   
         
    const employeeField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();
        console.log("employee")
        let employeewarnings : WarningTexts = {}

        if (textHandler.current.jobDescription === undefined){
            employeewarnings = {...employeewarnings, description : "Please enter description"}
            console.log("no job description")
        }
        if (textHandler.current.jobHours === undefined){
            employeewarnings = {...employeewarnings, hours_employee : "Please enter job hours"}
            console.log("no job hours")
        }
        if (selectedID.length === 0){
            employeewarnings = {...employeewarnings, hours_employee : "Please choose job id"}
            console.log("no job id")
        }
        if( Object.entries(employeewarnings).length >0 ){
            setWarningHandling({...employeewarnings}) //here we save the possible errors for helper text
        }else{
            console.log("no errors")
            setSaveEmployeeData([timenow, 
                textHandler.current.jobHours, 
                textHandler.current.jobDescription,
                textHandler.current.jobID,
                employeeName])
            alert("Data saved!")
        }
    }

    const employerField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();
        console.log("employer")
        let employerwarnings : WarningTextsemployer = {}
        if (textHandler.current.employeeName === undefined){
            employerwarnings = {...employerwarnings, employee : "Please enter employees name"}
            console.log("no name given")
        }
        if (textHandler.current.workIDs === undefined){
            employerwarnings = {...employerwarnings, workIDS : "Please enter the work id"}
            console.log("no job id")
        }
        if (textHandler.current.payment === undefined){
            employerwarnings = {...employerwarnings, payment : "Please give the payment"}
            console.log("no payment")
        }
        if (textHandler.current.Taxs === undefined){
            employerwarnings = {...employerwarnings, vat : "Please give tax precent"}
            console.log("no vat")
        }
        if( Object.entries(employerwarnings).length >0 ){
            setWarningHandlingemployer({...employerwarnings}) //here we save the possible errors for helper text
        }else{
            console.log("no errors")
            setSaveEmployeeData([timenow, 
                textHandler.current.payment, 
                textHandler.current.Taxs,
                textHandler.current.employeeName,
                textHandler.current.workIDs])
            alert("Data saved!")
        }
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
        <Typography variant="h4">Welcome employee {employeeName}</Typography>
       
        <TextField
            label="Give here job description"
            name="jobDescription"
            variant="outlined"
            fullWidth={true}
            className='worktimeFields'
            onChange={textfieldsHandler}
            error={Boolean(warningHandling.description)}
            helperText={warningHandling.description}
            />
        <TextField
            className='worktimeFields'
            label="Write here how much hours you use this project"
            name="jobHours"
            variant="outlined"
            fullWidth={true}
            onChange={textfieldsHandler}
            error={Boolean(warningHandling.hours_employee)}
            helperText={warningHandling.hours_employee}
            />
        <FormControl error={Boolean(warningHandling.jobID)}>
        <InputLabel id="jobID">choose job id</InputLabel>
        <Select
           id="jobID"
           label="Choose the job id" 
           value={selectedID}
           fullWidth={true}
           className='worktimeFields'
           defaultValue=""
           onChange={(e : SelectChangeEvent) => { setSelectedID(e.target.value) }}
        >
            {workID.map((num) =>  {return <MenuItem value={num} key={num}> {num}</MenuItem>})}
           
        </Select>
        <FormHelperText>{warningHandling.jobID}</FormHelperText>
      </FormControl>

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
                    onChange={textfieldsHandler}
                    error={Boolean(warningHandlingemployer.employee)}
                    helperText={warningHandlingemployer.employeee}/>
                    <TextField
                        className='worktimeFields'
                        label="Give here workID"
                        name="workIDs"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandler}
                        error={Boolean(warningHandlingemployer.workIDS)}
                        helperText={warningHandlingemployer.workIDS} />

                    <TextField
                        className='worktimeFields'
                        label="Give here employee payment"
                        name="payment"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandler} 
                        error={Boolean(warningHandlingemployer.payment)}
                        helperText={warningHandlingemployer.payment}/>

                    <TextField
                        className='worktimeFields'
                        label="Give here employee tax precent"
                        name="Taxs"
                        variant="outlined"
                        fullWidth={true} 
                        onChange={textfieldsHandler}
                        error={Boolean(warningHandlingemployer.vat)}
                        helperText={warningHandlingemployer.vat}/>

                    

                    <Button variant="contained"
                            color="inherit"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >Submit and save</Button></>
                        </form> } 
        </Container>) 
}


export default Work_time;