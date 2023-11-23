import { Alert, Button, Container, FormControl, FormHelperText, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, set } from "date-fns";
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
    const Apierror = useRef<string>("");
    const [who_is_logging, setWho_is_logging] = useState<string>("") // this is for api calls from server
    const update_permission = useRef<boolean>(false); // this is because react component looping
    const [user_id, setUser_id] = useState<number>(0) // this we need to save data correct relation in database
    const [description_temp, setDescription_temp] = useState("")
    const [jobhours_temp, setJobhours_temp] = useState<Number>(0)
    const show_button = useRef<boolean>(false);
    const [chosen_employee, setChosen_employee] = useState<string>("");
    const update_calculate = useRef<boolean>(false);
    const textHandleremployer : Employer_data  = useRef<Employer_data>({});
    const [working_hours, setWorkinghours] = useState([0,0,0]);// make here a list or object, where we can save payments, before and after taxes
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState<Working_place_ids[]>([])
    const [employees_names_database, setEmplyees_names_database] = useState<[]>([])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW,setLogInVIEW] = useState<boolean>(true);
    const [warningHandling, setWarningHandling] = useState<WarningTexts>({})
    const [warningHandlingemployer, setWarningHandlingemployer] = useState<WarningTextsemployer>({})
    const [saveEmployeeData, setSaveEmployeeData] = useState<Employee_data[]>([])
    const [employeeName, setEmployeeName] = useState<string>("")
    const [saveEmployerData, setSaveEmployerData] = useState<Employer_data[]>([])
    if(props.headLiner === "Working time application"){

    }else{
        props.setHeadliner("Working time application")//this will change the headliner
        props.setAllowForecast(true)
    }
    const apiCall = async (metod_where? : string, who_is_using? : string, employee_id? : number, new_data? : Employee_data | Employer_data) : Promise<void> => {
        Apierror.current = ""
       let worktimeUrl = ''
        if((who_is_using === "employee" && metod_where === "GET") || (metod_where === "PUT") || (metod_where === "DELETE")){ // employee side wnats to them data
        
            worktimeUrl = `/api/WorkTime/employeedata/${employee_id}`;
        }
        if((who_is_using === "employee") && (metod_where === "POST")){ // if employee posting, id not needed
        
            worktimeUrl = `/api/WorkTime/employeedata`;
        }
        if (who_is_using === "employer"){ // employer needs all data
            worktimeUrl =  `/api/WorkTime/employerdata`;
        }
        let settings : fetchSettings = { 
          method : metod_where || "GET",
          headers : {
          
            'Authorization' : `Bearer ${props.token}`,
            
          }
        };
        if (metod_where === "POST") {

            settings = {
              ...settings,
              headers : {
                ...settings.headers,
                'Content-Type' : 'application/json',
                
              },
              body : JSON.stringify(new_data)
            }
            
          }
          
        try {
        console.log("connection path", worktimeUrl, metod_where)
          const connection = await fetch(worktimeUrl, settings);
          const recieved = await connection.json()
    
          if (connection.status === 200) {
           // console.log("piisaako status")
           if (who_is_logging === "employee"){
                setSaveEmployeeData([...recieved.employeework])
                setWorkID([...recieved.employee_work_places])
                //console.log("did it save in client side", who_is_logging)
           }
           if (who_is_logging === "employer"){
                setSaveEmployerData([...recieved.employer_data])
                setSaveEmployeeData([...recieved.allEmployees])
                setEmplyees_names_database(recieved.employee_names)
                //console.log("testing emplyer save data", employees_names_database)
           }
    
          } else {
    
            let errorMessage :string = "";
    
            switch (connection.status) {
    
              case 400 : errorMessage = "Error post of get routes"; break;
              case 401 : setLogInVIEW(true); break;
              default : errorMessage = "Palvelimella tapahtui odottamaton virhe"; break;
    
            }
            Apierror.current = errorMessage
    
          }
    
        } catch (e : any) {
    
         Apierror.current = e
    
        }
    
      }
    
    
    const textfieldsHandlerEmployer  = (e : React.ChangeEvent<HTMLInputElement>) : void =>{ // user input saves the data  here.
        textHandleremployer.current[e.target.name] = e.target.value
        }   
         
    const employeeField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();//This unction is error handling and data saving. If some information is missing the error helper text shows it.
        show_button.current= false
        let employeewarnings : WarningTexts = {}

        if (description_temp === ""  ){
            employeewarnings = {...employeewarnings, description : "Please enter description"}
        }
        if (jobhours_temp === 0 ){
            employeewarnings = {...employeewarnings, jobID : "Please enter job hours"}
        }
        if (selectedID.length === 0){
            employeewarnings = {...employeewarnings, jobID : "Please choose job id"}
        }
        if( Object.entries(employeewarnings).length >0 ){
            setWarningHandling({...employeewarnings}) //here we save the possible errors for helper text
        }else{
            setWarningHandling([])
            let savetemp : Employee_data = {
                datetime : timenow,
                hours_employee : Number(jobhours_temp),
                description : description_temp,
                jobID : selectedID,
                employee_name : employeeName,
                employee_worktime_id : Number(user_id)
            }
            
            apiCall("POST", "employee", user_id, savetemp)
            update_permission.current = true
            setDescription_temp("")
            setJobhours_temp(0)
            setSelectedID("")
            setTimenow(new Date())
            alert("Data saved!")
           
            
        }
    }
     useEffect (() =>{
        if(update_permission.current===true){
            setSaveEmployeeData([...saveEmployeeData]);
            update_permission.current=false
            count_hours_taxes()
        }
    }, [saveEmployeeData])

    const employerField = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault(); // this function is error handling and data saving. This is employer view data saving.
        let employerwarnings : WarningTextsemployer = {}
        if (chosen_employee === undefined){
            employerwarnings = {...employerwarnings, employee : "Please choose employees name"}
        }
        if (textHandleremployer.current.workIDs === undefined){
            employerwarnings = {...employerwarnings, workIDs : "Please enter the work id"}
        }
        if (textHandleremployer.current.payment === undefined){
            employerwarnings = {...employerwarnings, payment : "Please give the payment"}
        }
        if (textHandleremployer.current.Taxs === undefined){
            employerwarnings = {...employerwarnings, vat : "Please give tax precent"}
        }
        if( Object.entries(employerwarnings).length >0 ){
            setWarningHandlingemployer({...employerwarnings}) //here we save the possible errors for helper text
        }else{
            
            let savetempEmployer : Employer_data = {
                payment : textHandleremployer.current.payment,
                vat : textHandleremployer.current.Taxs,
                employee_name : chosen_employee,
                employee_work_id : user_id,
                workIDS : textHandleremployer.current.workIDs
            }
            
            apiCall("POST", "employer", 8, savetempEmployer)
            textHandleremployer.current = {}
            alert("Data saved!")
            
        }
       
    }
    const editSavedData = (idx:number) : void =>{ //here user can edit the saved data
        show_button.current = true //this disabled save data button and enabling save changes button
        let temp_object : Employee_data[]= [...saveEmployeeData]
        setDescription_temp(String(temp_object[idx].description))
        setJobhours_temp(Number(temp_object[idx].hours_employee))
        setTimenow(temp_object[idx].datetime!)
        setSelectedID(temp_object[idx].jobID!)
        //apiCall("PUT", "employee", temp_object[idx].employee_id_auto, temp_object)
        //setSaveEmployeeData([...saveEmployeeData.filter((saveEmployeeData : Employee_data, idxe : Number) => idxe !== Number(idx))])//When editing data, lets  remove old version


    }
    const deleteSavedData = (employee_field_auto_id : number) : void =>{ // here user can delete selected data
        var r = window.confirm("Are you sure you want to delete this?")
        if (r){
            apiCall("DELETE", "employee", employee_field_auto_id )
            apiCall("GET", "employee", employee_field_auto_id )
            update_calculate.current=true
        }
        count_hours_taxes()
    }

    const count_hours_taxes = () : void =>{
        let i = 0
        setWorkinghours([0,0,0])
        let templist = ([...working_hours])// making a templist to save working hours from interface
        update_calculate.current=true
        let tempval = 0
        let tempval2 = 0
        try {
            for(i = 0; i < Object.entries(saveEmployeeData).length; i = i +1){
                tempval = saveEmployeeData[i].hours_employee! 
                tempval2 = tempval + tempval2
                }
            templist[0] = tempval2
            templist[1] = Number(saveEmployerData[0].payment) * tempval2 //calculate the hours from view
            templist[2] = (100 - Number(saveEmployerData[0].vat)) / 100 * templist[1]
            setWorkinghours(templist)
            }
        catch (error){
            console.log("Object is empty!! ", error)
        }
    }
    const save_selected_employee = (e:any) : void => {
        e?.preventDefault();
        setChosen_employee(e.target.value as string)
        for (let i = 0 ; i < employees_names_database.length; i++){
            if (String(e.target.value) === employees_names_database[i]['user_name']){
                setUser_id(employees_names_database[i]['user_id'] as number)
                
            } 
        }    
    }

    useEffect (() => {
        if(update_calculate.current === true){
            setWorkinghours([...working_hours])
            update_calculate.current=false
            
        }
    }   ,[working_hours])

    useEffect (() => {
        if (employeeView){
            apiCall("GET", "employee", user_id)
        }else{
            apiCall("GET", "employer")
        }
    }, [employeeView, loginVIEW, user_id])
    
    return(
        
    <Container className="workingtime"> {/*'in this view is two ifclauses. second shows the login component text fields'*/}
        <Typography variant="h5">{Apierror.current}</Typography>
         <Button variant="contained"    
            color="inherit"
            onClick={() => {setLogInVIEW(true)}}
            startIcon={<LogoutIcon/>}
            disabled={loginVIEW}>Log out</Button> {/*'and second shows wich user is logged in. employee and employer has own views'*/}
            
        {loginVIEW?
        
        <LogIn  setEmployeeView={setEmployeeView} 
                setLogInVIEW={setLogInVIEW} 
                setWho_is_logging={setWho_is_logging} 
                setToken={props.setToken}
                setEmployeeName={setEmployeeName}
                setUser_id={setUser_id}/>
                
        :
        
        (employeeView)? 
        <form onSubmit={employeeField} >
         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Typography variant="h4">Welcome user {employeeName}</Typography> {/*Here is employee field view*/}
       
        <TextField
            label="Give here job description"
            value={description_temp}
            name="jobDescription"
            variant="outlined"
            fullWidth={true}
            className='worktimeFields'
            onChange={(e) => {setDescription_temp(e.target.value)}}
            error={Boolean(warningHandling.description)}
            helperText={warningHandling.description}
            />
        <TextField
            className='worktimeFields'
            label="Write here how much hours you use this project"
            value={jobhours_temp}
            name="jobHours"
            type="number"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {setJobhours_temp(Number(e.target.value))}}
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
            {workID.map((num, idx) =>  {return <MenuItem value={num.workplace_id} key={idx}> {num.workplace_id}</MenuItem>})}
           
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
        disabled={show_button.current}
        >Save the data</Button>

<Button variant="contained"
        color="inherit"
        startIcon={<SaveIcon/>}
        type="submit"
        disabled={!show_button.current}
        >Save changes</Button>
        
     </LocalizationProvider>  {/*Here page shows payment and hours counted based on user given input.*/}
            <Typography>Working hours: {working_hours[0]} h
                        Payment so far: {working_hours[1]} € 
                        payment after taxes: {working_hours[2]} €
            </Typography>      
     </form>
    :
    <form onSubmit={employerField}>
    <Typography variant="h4">Welcome employer {employeeName}</Typography> {/*Here is employer field view*/}

    <>            <FormControl error={Boolean(warningHandlingemployer.employee)} fullWidth={true}>
                    <InputLabel id="employeeName">choose employee name</InputLabel>
                        <Select
                            id="employeeNameSelector"
                            label="Choose wich eployee" 
                            value={chosen_employee}
                            name="employeeName"
                            fullWidth={true}
                            className='worktimeFields'
                            defaultValue=""
                            onChange={(e :any) => {save_selected_employee(e)}}
                             >
            {employees_names_database.map((num, idx) =>  {return <MenuItem value={num['user_name']} key={idx}> {num['user_name']}</MenuItem>})}
           
                        </Select>
                        <FormHelperText>{warningHandlingemployer.employee}</FormHelperText>
                    </FormControl>
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
                        {saveEmployerData.map( (emp:Employer_data, idxn : number) => {
                            return(
                                <List>
                                    <ListItem key={idxn} className="listViewItems" >
       
                        <ListItemText > Employee name : {emp.employee_name} ,
                                        Employee payment :  {emp.payment} €/h,
                                        Employee tax precent {emp.vat} %,
                                        
            
                        </ListItemText>
                                    </ListItem>
                                </List>
                            )
                        })} 
                        </form> 
                        
                        } 
                        
                        {!loginVIEW?
                        <List>

{saveEmployeeData.map( (item : Employee_data, idx : number) => {

   return (
       <ListItem key={idx} className="listViewItems" >
       
       <ListItemText > employee name : {item.employeeName}Work id : {item.jobID} ,
         Working hours :  {item.hours_employee} ,
            Time:   {String(item.datetime_emp)} ,
            description : {item.description}
            
           </ListItemText>
           <ListItemIcon>
               <IconButton 
                   onClick={() => {editSavedData(idx)}}
                   edge="start"
                   disabled={!employeeView}>
                   <EditIcon />
               </IconButton>
               <IconButton 
                   onClick={() => {deleteSavedData(Number(item.employee_id_auto))}}
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