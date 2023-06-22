import { Button, Container, FormControl, FormHelperText, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from "date-fns";
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers'
//icons import
import LogIn from "./LogIn";
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface WarningTexts extends Employee_data {}
interface WarningTextsemployer extends Employer_data {}
//this component is work time application. LOgIN component belongs to this component
function Work_time (props?:any){
    if(props.headLiner === "Working time application"){

    }else{
            props.setHeadliner("Working time application")//this will change the headliner
            props.setAllowForecast(true)
    }
    const textHandler : Employee_data  = useRef<Employee_data>({});
    const update_permission = useRef<boolean>(false);
    const textHandleremployer : Employer_data  = useRef<Employer_data>({});
    const [working_hours, setWorkinghours] = useState([0,0,0]);// make here a list or object, where we can save payments, before and after taxes
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState([" it talo id: 1020","jätelaitos id: 1300", "joku laitos id: 1502"])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW,setLogInVIEW] = useState<boolean>(true);
    const [warningHandling, setWarningHandling] = useState<WarningTexts>({})
    const [warningHandlingemployer, setWarningHandlingemployer] = useState<WarningTextsemployer>({})
    const [saveEmployeeData, setSaveEmployeeData] = useState<Employee_data[]>([{datetime : new Date(), 
                                                                                hours_employee : 8, 
                                                                                description : "Some job", 
                                                                                jobID :"id:00", 
                                                                                employeeName:"test"}])
    const [employeeName, setEmployeeName] = useState<string>("mister test")
    const [saveEmployerData, setSaveEmployerData] = useState<Employer_data[]>([{payment: 0, vat : 0, employee : "", workIDS : ""}])
 
    const textfieldsHandler  = (e : React.ChangeEvent<HTMLInputElement>) : void =>{ // user input saves the data  here.
        textHandler.current[e.target.name] = e.target.value
         }   

    const textfieldsHandlerEmployer  = (e : React.ChangeEvent<HTMLInputElement>) : void =>{ // user input saves the data  here.
        textHandleremployer.current[e.target.name] = e.target.value
        }   
         
    const employeeField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();//This unction is error handling and data saving. If some information is missing the error helper text shows it.
        console.log("employee") 
        let employeewarnings : WarningTexts = {}

        if (textHandler.current.jobDescription === undefined){
            employeewarnings = {...employeewarnings, description : "Please enter description"}
            console.log("no job description")
        }
        if (textHandler.current.jobHours === undefined){
            employeewarnings = {...employeewarnings, jobID : "Please enter job hours"}
            console.log("no job hours")
        }
        if (selectedID.length === 0){
            employeewarnings = {...employeewarnings, jobID : "Please choose job id"}
            console.log("no job id")
        }
        if( Object.entries(employeewarnings).length >0 ){
            setWarningHandling({...employeewarnings}) //here we save the possible errors for helper text
        }else{
            setWarningHandling([])
            console.log("no errors", saveEmployeeData)
            let savetemp : Employee_data = {
                datetime : timenow,
                hours_employee : Number(textHandler.current.jobHours),
                description : textHandler.current.jobDescription,
                jobID : selectedID,
                employeeName : employeeName
            }
            textHandler.current.jobHours = "" 
            
            setTimeout(() => { setSaveEmployeeData([...saveEmployeeData, savetemp]); }, 2000);
            //useEffect(() => { setSaveEmployeeData([...saveEmployeeData, savetemp])}, [savetemp])
            count_hours_taxes()
            update_permission.current = true
            alert("Data saved!")
        }
    }

    const employerField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault(); // this function is error handling and data saving. This is employer view data saving.
        console.log("employer")
        let employerwarnings : WarningTextsemployer = {}
        if (textHandleremployer.current.employeeName === undefined){
            employerwarnings = {...employerwarnings, employee : "Please enter employees name"}
            console.log("no name given")
        }
        if (textHandleremployer.current.workIDs === undefined){
            employerwarnings = {...employerwarnings, workIDs : "Please enter the work id"}
            console.log("no job id")
        }
        if (textHandleremployer.current.payment === undefined){
            employerwarnings = {...employerwarnings, payment : "Please give the payment"}
            console.log("no payment")
        }
        if (textHandleremployer.current.Taxs === undefined){
            employerwarnings = {...employerwarnings, vat : "Please give tax precent"}
            console.log("no vat")
        }
        if( Object.entries(employerwarnings).length >0 ){
            setWarningHandlingemployer({...employerwarnings}) //here we save the possible errors for helper text
        }else{
            console.log("no errors in employer function")
            let savetempEmployer : Employer_data = {
                payment : textHandleremployer.current.payment,
                vat : textHandleremployer.current.Taxs,
                employee : textHandleremployer.current.employeeName,
                workIDS : textHandleremployer.current.workIDs
            }
            setSaveEmployerData([savetempEmployer])
                
            setEmployeeName(textHandleremployer.current.employeeName)
            setWorkID([...workID, textHandleremployer.current.workIDs])
            console.log(textHandleremployer.current.workIDs,saveEmployerData)
            textHandleremployer.current = {}
            alert("Data saved!")
        }
       
    }
    const editSavedData = (idx:Number) : void =>{
        console.log("jalla jalla") // this is not finished

    }
    const deleteSavedData = (idx:Number) : void =>{ // here user can delete selected data
        console.log("delle delle")
        var r = window.confirm("Are you sure you want to delete this?")
        if (r){
            setSaveEmployeeData([...saveEmployeeData.filter((saveEmployeeData : Employee_data, idxe : Number) => idxe !== Number(idx))])
            
        }

    }

    const count_hours_taxes = () : void =>{
        let i = 0
        let tempval = working_hours[0]
        console.log("laskenta", saveEmployeeData[1].hours_employee)
        for(i = 0; i < Object.entries(saveEmployeeData).length; i = i +1){
            tempval = saveEmployeeData[i].hours_employee! 
            console.log("loopp", saveEmployeeData[i].hours_employee!)
            working_hours[0] = tempval + working_hours[0]
        }
        
    }

    useEffect (() => {
        if(update_permission.current === true){
            count_hours_taxes()
            console.log("use!")
            update_permission.current = false
        }
    }   ,[])
    return(

    <Container className="workingtime"> {/*'in this view is two ifclauses. second shows the login component text fields'*/}
         <Button variant="contained"    
        color="inherit"
        onClick={() => {setLogInVIEW(true)}}
        startIcon={<LogoutIcon/>}>Log out</Button> {/*'and second shows wich user is logged in. employee and employer has own views'*/}
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
            type="number"
            variant="outlined"
            fullWidth={true}
            onChange={textfieldsHandler}
            error={Boolean(warningHandling.jobID)}
            helperText={warningHandling.jobID}
            />
        <FormControl error={Boolean(warningHandling.jobID)} fullWidth={true}>
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
            {workID.map((num, idx) =>  {return <MenuItem value={num} key={idx}> {num}</MenuItem>})}
           
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
            <Typography>Working hours: {working_hours[0]} h
                        Payment so far:{working_hours[1]} € 
                        payment after taxes:{working_hours[2]} €
            </Typography>      
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
                    onChange={textfieldsHandlerEmployer}
                    error={Boolean(warningHandlingemployer.employee)}
                    helperText={warningHandlingemployer.employeee}/>
                    <TextField
                        className='worktimeFields'
                        label="Give here workID"
                        name="workIDs"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandlerEmployer}
                        error={Boolean(warningHandlingemployer.workIDs)}
                        helperText={warningHandlingemployer.workIDs} />

                    <TextField
                        className='worktimeFields'
                        label="Give here employee payment"
                        type="number"
                        name="payment"
                        variant="outlined"
                        fullWidth={true}
                        onChange={textfieldsHandlerEmployer} 
                        error={Boolean(warningHandlingemployer.payment)}
                        helperText={warningHandlingemployer.payment}/>

                    <TextField
                        className='worktimeFields'
                        label="Give here employee tax precent"
                        type="number"
                        name="Taxs"
                        variant="outlined"
                        fullWidth={true} 
                        onChange={textfieldsHandlerEmployer}
                        error={Boolean(warningHandlingemployer.vat)}
                        helperText={warningHandlingemployer.vat}/>

                    
                                
                    <Button variant="contained"
                            color="inherit"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >Submit and save</Button></>
                        
                        </form> } 
                        
                        {!loginVIEW?
                        <List>

{saveEmployeeData.map( (item : Employee_data, idx : number) => {

   return (
       <ListItem key={idx} className="listViewItems" >
       
       <ListItemText >Work id : {item.jobID} ,
         Working hours :  {item.hours_employee} ,
            Time:   {String(item.datetime)} ,
            description : {item.description}
            
           </ListItemText>
           <ListItemIcon>
               <IconButton 
                   onClick={() => {editSavedData(idx)}}
                   edge="start">
                   <EditIcon />
               
               
               </IconButton>
               <IconButton 
                   onClick={() => {deleteSavedData(idx)}}
                   edge="start">
                   <DeleteForeverIcon />
               
               
               </IconButton>
               </ListItemIcon>
       </ListItem>
   );

} ) }

</List> : <p></p>}
        </Container>) 
}


export default Work_time;