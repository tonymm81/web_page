import { Alert, Box, Button, Container, Dialog, FormControl, FormHelperText, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Tab, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import '../App.css'
import { fi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, set } from "date-fns";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
//icons import
import LogIn from "./LogIn";
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DOMPurify from 'dompurify';
import React from "react";
// version 186
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DoneAllIcon from '@mui/icons-material/DoneAll';


interface WarningTexts extends Employee_data { }
interface WarningTextsemployer extends Employer_data { }
//this component is work time application. LOgIN component belongs to this component
function Work_time(props?: any) {
    const [tabSelectorValue, setTabSelectorValue] = React.useState('1');
    const Apierror = useRef<string>("");
    const [who_is_logging, setWho_is_logging] = useState<string>("") // this is for api calls from server
    const update_permission = useRef<boolean>(false); // this is because react component looping
    const [user_id, setUser_id] = useState<number>(0) // this we need to save data correct relation in database
    const [database_id, setDatabase_id] = useState<number>(0)
    const [description_temp, setDescription_temp] = useState("")
    const [jobhours_temp, setJobhours_temp] = useState<Number>(0)
    const show_button = useRef<boolean>(false);
    const [show_manual, setShow_manual] = useState<boolean>(true);
    const [add_workid_only, setAdd_workid_only] = useState<boolean>(false);
    const [chosen_employee, setChosen_employee] = useState<string>("");
    const textHandleremployer: Employer_data = useRef<Employer_data>({});
    const [working_hours, setWorkinghours] = useState([0, 0, 0]);// make here a list or object, where we can save payments, before and after taxes
    const [timenow, setTimenow] = useState<Date>(new Date())
    const [workID, setWorkID] = useState<Working_place_ids[]>([])
    const [employees_names_database, setEmplyees_names_database] = useState<[]>([])
    const [selectedID, setSelectedID] = useState<string>("")
    const [employeeView, setEmployeeView] = useState<boolean>(true)
    const [loginVIEW, setLogInVIEW] = useState<boolean>(true);
    const [warningHandling, setWarningHandling] = useState<WarningTexts>({})
    const [warningHandlingemployer, setWarningHandlingemployer] = useState<WarningTextsemployer>({})
    const [saveEmployeeData, setSaveEmployeeData] = useState<Employee_data[]>([])
    const [employeeName, setEmployeeName] = useState<string>("")
    const [saveEmployerData, setSaveEmployerData] = useState<Employer_data[]>([])
   
    const apiCall = async (metod_where?: string, who_is_using?: string, employee_id?: number, what_delete?: string, working_id_ids?: number, new_data?: Employee_data | Employer_data): Promise<void> => {
        console.log("coming values", metod_where, who_is_using, employee_id, what_delete, working_id_ids, new_data)
        Apierror.current = ""
        let worktimeUrl = ''
        if ((who_is_using === "employee") && (metod_where === "GET")) { // employee side wnats to them data
            worktimeUrl = `/api/WorkTime/employeedata/${employee_id}`;
        }
        if ((who_is_using === "employee") && (metod_where === "PUT")) { // employee side wnats to them data
            worktimeUrl = `/api/WorkTime/employeedata/${employee_id}`;
        }
        if ((who_is_using === "employee") && (metod_where === "DELETE")) { // employee side wnats to them data
            worktimeUrl = `/api/WorkTime/employeedata/${employee_id}`;
        }
        if ((who_is_using === "employee") && (metod_where === "POST")) { // if employee posting, id not needed
            worktimeUrl = `/api/WorkTime/employeedata`;
        }
        if ((who_is_using === "employer") && (metod_where === "GET")) { // employer needs all data
            worktimeUrl = `/api/WorkTime/employerdata`;
        }
        if ((who_is_using === "employer") && (metod_where === "PUT")) { // employer needs all data
            worktimeUrl = `/api/WorkTime/employerdata/${employee_id}`;
        }
        if ((who_is_using === "employer") && (metod_where === "POST")) { // employer needs all data
            worktimeUrl = `/api/WorkTime/employerdata`;
        }
        if ((who_is_using === "employer") && (metod_where === "DELETE")) { // employer needs all data
            worktimeUrl = `/api/WorkTime/employerdata/?what_delete=${what_delete}&Employee_id=${employee_id}&working_id_ids=${working_id_ids}`;
        }
        let settings: fetchSettings = {
            method: metod_where || "GET",
            headers: {

                'Authorization': `Bearer ${props.token}`,

            }
        };
        if (metod_where === "POST") {

            settings = {
                ...settings,
                headers: {
                    ...settings.headers,
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(new_data)
            }

        }
        if (metod_where === "PUT") {

            settings = {
                ...settings,
                headers: {
                    ...settings.headers,
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(new_data)
            }

        }

        try {
            console.log("connection path", worktimeUrl, metod_where)
            const connection = await fetch(worktimeUrl, settings);
            const recieved = await connection.json()

            if (connection.status === 200) {
                if (who_is_logging === "employee") {
                    setSaveEmployeeData([])

                    setSaveEmployeeData([...recieved.employeework])
                    setWorkID([...recieved.employee_work_places])
                    if (recieved.get_payment_information[0]) {// if employee is new, lets avoid object empty error
                        let templist = ([...working_hours]) // here we save the payment information
                        templist[2] = recieved.get_payment_information[0]
                        templist[1] = recieved.get_payment_information[1]
                        templist[0] = recieved.get_payment_information[2][0]._sum.hours_employee
                        setWorkinghours(templist)
                    }
                }
                if (who_is_logging === "employer") {
                    setSaveEmployerData([])
                    setSaveEmployerData([...recieved.employerdata[0]])
                    setSaveEmployeeData([...recieved.employerdata[1]])
                    setEmplyees_names_database(recieved.employerdata[2])
                    setWorkID(recieved.employerdata[3])
                    //console.log("testing emplyer save data", recieved.employerdata)
                }

            } else {

                let errorMessage: string = "";

                switch (connection.status) {

                    case 400: errorMessage = "Error post of get routes"; break;
                    case 401: setLogInVIEW(true); break;
                    default: errorMessage = "Palvelimella tapahtui odottamaton virhe"; break;

                }
                Apierror.current = errorMessage

            }

        } catch (e) {

            //Apierror.current = e | "" 

        }

    }


    const textfieldsHandlerEmployer = (e: React.ChangeEvent<HTMLInputElement>): void => { // user input saves the data  here.
        textHandleremployer.current[e.target.name] = DOMPurify.sanitize(e.target.value)
    }

    const employeeField = (e?: React.FormEvent, value?: any | null): void => {
        e?.preventDefault();//This unction is error handling and data saving. If some information is missing the error helper text shows it.
        show_button.current = false
        let employeewarnings: WarningTexts = {}

        if (description_temp === "") {
            employeewarnings = { ...employeewarnings, description: "Please enter description" }
        }
        if (jobhours_temp === 0) {
            employeewarnings = { ...employeewarnings, jobID: "Please enter job hours" }
        }
        if (selectedID.length === 0) {
            employeewarnings = { ...employeewarnings, jobID: "Please choose job id" }
        }
        if (Object.entries(employeewarnings).length > 0) {
            setWarningHandling({ ...employeewarnings }) //here we save the possible errors for helper text
        } else {
            setWarningHandling([])
            let savetemp: Employee_data = {
                datetime: timenow,
                hours_employee: Number(jobhours_temp),
                description: DOMPurify.sanitize(description_temp),
                jobID: selectedID,
                employee_name: employeeName,
                employee_worktime_id: Number(user_id)
            }

            apiCall("POST", "employee", user_id, "", 0, savetemp)
            update_permission.current = true
            setDescription_temp("")
            setJobhours_temp(0)
            setSelectedID("")
            setTimenow(new Date())
            alert("Data saved!")


        }
    }
    useEffect(() => {
        if (update_permission.current === true) {
            setSaveEmployeeData([...saveEmployeeData]);
            update_permission.current = false

        }
    }, [saveEmployeeData])

    const employerField = (e?: React.FormEvent, value?: any | null): void => {
        e?.preventDefault(); // this function is error handling and data saving. This is employer view data saving.
        let employerwarnings: WarningTextsemployer = {}
        if (chosen_employee === undefined) {
            employerwarnings = { ...employerwarnings, employee: "Please choose employees name" }
        }
        if (textHandleremployer.current.workIDs === undefined) {
            employerwarnings = { ...employerwarnings, workIDs: "Please enter the work id" }
        }
        if (!add_workid_only) {
            if (textHandleremployer.current.payment === undefined) {
                employerwarnings = { ...employerwarnings, payment: "Please give the payment" }
            }
            if (textHandleremployer.current.Taxs === undefined) {
                employerwarnings = { ...employerwarnings, vat: "Please give tax precent" }
            }
        }
        if (Object.entries(employerwarnings).length > 0) {
            setWarningHandlingemployer({ ...employerwarnings }) //here we save the possible errors for helper text
        } else {

            let savetempEmployer: Employer_data = {
                payment: textHandleremployer.current.payment,
                vat: textHandleremployer.current.Taxs,
                employee_name: chosen_employee,
                employee_work_id: user_id,
                workIDS: DOMPurify.sanitize(textHandleremployer.current.workIDs)
            }
            setAdd_workid_only(false)
            apiCall("POST", "employer", 8, "", 0, savetempEmployer)
            textHandleremployer.current = {}
            alert("Data saved!")

        }

    }
    const editSavedData = (idx: number): void => { //here user can edit the saved data
        show_button.current = true //this disabled save data button and enabling save changes button
        let temp_object: Employee_data[] = [...saveEmployeeData]
        setDatabase_id(Number(temp_object[idx].employee_id_auto))
        setDescription_temp(String(temp_object[idx].description))
        setJobhours_temp(Number(temp_object[idx].hours_employee))
        setTimenow(temp_object[idx].datetime!)
        setSelectedID(temp_object[idx].jobID!)

    }
    const confirm_update = (): void => {// this will save the edited data to server database
        apiCall("PUT", "employee", database_id, "", 0, {
            datetime_emp: timenow,
            hours_employee: jobhours_temp,
            description: description_temp,
            jobID: selectedID
        })
    }
    const deleteSavedData = (employee_field_auto_id: number, who?: string, what?: string, working_id_ids?: number): void => { // here user can delete selected data
        var r = window.confirm("Are you sure you want to delete this?")
        if (who === "employee") {
            if (r) {
                apiCall("DELETE", "employee", employee_field_auto_id)
                apiCall("GET", "employee", employee_field_auto_id)
            }
        } if (who === "employer") {
            if (what === "Workid_delete") {
                apiCall("DELETE", "employer", employee_field_auto_id, "Workid_delete", working_id_ids)
            } else {
                apiCall("DELETE", "employer", employee_field_auto_id, "Delete_all", working_id_ids)
            }
            //apiCall("GET", "employee", employee_field_auto_id )
        }

    }


    const save_selected_employee = (e: any): void => {// we have to save employers id also from select box
        e?.preventDefault();
        setChosen_employee(e.target.value as string)
        try {
            for (let i = 0; i < employees_names_database.length; i++) {
                if (String(e.target.value) === employees_names_database[i]['user_name']) {
                    setUser_id(employees_names_database[i]['user_id'] as number)

                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        localStorage.setItem("last_path", "/Work_time")
        if (props.headLiner === "Working time application") {

        } else {
            props.setHeadliner("Working time application")//this will change the headliner
            localStorage.setItem("last_path", "/Work_time")
            props.setAllowForecast(true)
        }
    }, [])
    useEffect(() => {
        if (employeeView) {
            if (who_is_logging === "employee") {
                apiCall("GET", "employee", user_id)
            }
        } if (!employeeView) {
            apiCall("GET", "employer")
        }
    }, [employeeView, loginVIEW])

    const HandleTabsPosition = (event: React.SyntheticEvent, newValue: string) => {//version 186
        setTabSelectorValue(newValue);
      };
    
    const changeHoursAccepted = (idx: number): void => { //here user can edit the saved data
        apiCall("PUT", "employer", idx, "", 0)

    }
    return (

        <Container className="workingtime"> {/*'in this view is two ifclauses. second shows the login component text fields'*/}
            <Typography variant="h5">{Apierror.current}</Typography>
            <Button variant="contained"
                color="inherit"
                onClick={() => { setLogInVIEW(true) }}
                startIcon={<LogoutIcon />}
                sx={{margin:2}}
                disabled={loginVIEW}>Log out</Button> {/*'and second shows wich user is logged in. employee and employer has own views'*/}
            <Button variant="contained"
                color="inherit"
                onClick={() => { setShow_manual(true) }}
                sx={{margin:2}}
            >Show manual</Button>

            {loginVIEW ?

                <LogIn setEmployeeView={setEmployeeView}
                    setLogInVIEW={setLogInVIEW}
                    setWho_is_logging={setWho_is_logging}
                    setToken={props.setToken}
                    setEmployeeName={setEmployeeName}
                    setUser_id={setUser_id} />

                :

                (employeeView) ?
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
                                onChange={(e) => { setDescription_temp(e.target.value) }}
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
                                onChange={(e) => { setJobhours_temp(Number(e.target.value)) }}
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
                                    onChange={(e: SelectChangeEvent) => { setSelectedID(e.target.value) }}
                                >
                                    {workID.map((num, idx) => { return <MenuItem value={num.workplace_id} key={idx}> {num.workplace_id}</MenuItem> })}

                                </Select>
                                <FormHelperText>{warningHandling.jobID}</FormHelperText>
                            </FormControl>

                            <DateTimePicker
                                label="choose here date and time"
                                className='worktimeFields'
                                value={timenow}
                                disableMaskedInput={true}
                                disableFuture={true}
                                onChange={(choosedTime: Date | null) => setTimenow(choosedTime!)}
                                renderInput={(params: any) => <TextField {...params}
                                    fullWidth={true}
                                    sx={{ marginBottom: "10px" }}


                                />}
                            />

                            <Button variant="contained"
                                color="inherit"
                                startIcon={<SaveIcon />}
                                type="submit"
                                disabled={show_button.current}
                            >Save the new data</Button>

                            <Button variant="contained"
                                color="inherit"
                                startIcon={<SaveIcon />}
                                onClick={confirm_update}
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
                                onChange={(e: any) => { save_selected_employee(e) }}
                            >
                                {employees_names_database.map((num, idx) => { return <MenuItem value={num['user_name']} key={idx}> {num['user_name']}</MenuItem> })}

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
                                disabled={add_workid_only}
                                fullWidth={true}
                                onChange={textfieldsHandlerEmployer}
                                error={Boolean(warningHandlingemployer.payment)}
                                helperText={warningHandlingemployer.payment} />

                            <TextField
                                className='worktimeFields'
                                label="Give here employee tax precent"
                                type="number"
                                name="Taxs"
                                variant="outlined"
                                fullWidth={true}
                                onChange={textfieldsHandlerEmployer}
                                disabled={add_workid_only}
                                error={Boolean(warningHandlingemployer.vat)}
                                helperText={warningHandlingemployer.vat} />



                            <Button variant="contained"
                                color="inherit"
                                startIcon={<SaveIcon />}
                                type="submit"
                            >Submit and save</Button></>
                        <Button variant="contained"
                            color="inherit"
                            startIcon={<SaveIcon />}
                            onClick={() => { setAdd_workid_only(true) }}
                            disabled={add_workid_only}
                        >Add only working id to employee
                        </Button>
                        <Typography variant="h5" color={"white"}>Employees work place id:s
                        </Typography>
                        {workID?.map((work: Working_place_ids, index: number) => {
                            return (
                                <List >
                                    <ListItem key={index} className="listViewItemsWorkTime">

                                        <ListItemText>Work places {work.workplace_id} person name {work.employee_name}

                                            <IconButton
                                                onClick={() => { deleteSavedData(Number(work.employee_id), "employer", "Workid_delete", work.working_id_ids) }}
                                                edge="end">
                                                <DeleteForeverIcon />
                                            </IconButton>

                                        </ListItemText>
                                    </ListItem>
                                </List>
                            )
                        })}
                        <Typography variant="h5" color={"white"}>Employees info</Typography>
                        {saveEmployerData.map((emp: Employer_data, idxn: number) => {
                            return (
                                <List>
                                    <ListItem key={idxn} className="listViewItemsWorkTime" >

                                        <ListItemText > Employee name : {emp.employee_name} ,
                                            Employee payment :  {emp.payment} €/h,
                                            Employee tax precent {emp.vat} %,


                                        </ListItemText>
                                        <IconButton
                                            onClick={() => { deleteSavedData(Number(emp.employer_work_id), "employer", "Delete_all", emp.empoyer_data_id) }}
                                            edge="end">
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ListItem>
                                </List>

                            )
                        })}
                    </form>

            }

            {!loginVIEW ?
                 <Box sx={{ width: '100%', typography: 'body1', margin: "5px" }}>
                 <TabContext value={tabSelectorValue} >
                   <Box sx={{ borderBottom: 1, borderColor: 'divider', margintop: "50px" }} className="workTimeTabs">
                     <TabList onChange={HandleTabsPosition} aria-label="lab API tabs example">
                       <Tab label="Non accepted hours" value="1" className="workTimeTabs" />
                       <Tab label="accepted hours" value="2" className="workTimeTabs" />
                       
                     </TabList>
                   </Box>
                <List>
                    <Typography variant="h5" color={"white"}>Employees work time writings</Typography>
                    
                    {saveEmployeeData.map((item: Employee_data, idx: number) => {

                        return (
                            <><TabPanel value="1">
                                {!item.IsHoursAccepted ?
                                <ListItem key={idx} className="listViewItemsWorkTime">

                                    <ListItemText> <strong>employee name : </strong>{item.employeeName} Work id : {item.jobID} ,
                                        Working hours :  {item.hours_employee} ,
                                        Time:   {String(item.datetime_emp)} ,
                                        description : {item.description}

                                    </ListItemText>
                                    <ListItemIcon>
                                    <IconButton
                                            onClick={() => { changeHoursAccepted(Number(item.employee_id_auto)); } }
                                            edge="start"
                                            disabled={employeeView}>
                                            <DoneAllIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => { editSavedData(idx); } }
                                            edge="start"
                                            disabled={!employeeView}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => { deleteSavedData(Number(item.employee_id_auto), "employee"); } }
                                            edge="start"
                                            disabled={!employeeView}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>: <></>}
                            </TabPanel><TabPanel value="2">
                                {item.IsHoursAccepted ?
                                    <ListItem key={idx} className="listViewItemsWorkTime">

                                        <ListItemText> <strong>employee name : </strong>{item.employeeName} Work id : {item.jobID} ,
                                            Working hours :  {item.hours_employee} ,
                                            Time:   {String(item.datetime_emp)} ,
                                            description : {item.description}

                                        </ListItemText>
                                        <ListItemIcon>
                                            <IconButton
                                                onClick={() => { editSavedData(idx); } }
                                                edge="start"
                                                disabled={!employeeView}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => { deleteSavedData(Number(item.employee_id_auto), "employee"); } }
                                                edge="start"
                                                disabled={!employeeView}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem> : <></>}
                                </TabPanel></>
                        );

                    })}

                </List></TabContext> </Box>: <p></p>}
            <Dialog open={show_manual}> <Typography variant="h5" style={{padding:10}}> Welcome to my worktime app</Typography>
                <Typography variant="body1" className="div_tag">Dont use this app any real work or real person information saving.
                    It is made only hobbies and also show what i can do with my coding skills</Typography>
                <Typography variant="body2" className="div_tag"> Here employee can make new user name and password. After making new log in
                    account details you can log in witn jane_smith and password test (employer view). There you can
                    select the created employee details and add workingplace ids and payment
                    Information and tax precent. Other wise you can add more working id:S specific employee.
                    You can delete them or all employee data with specific employees name.</Typography>
                <Typography variant="body2" className="div_tag">log in employee side john_smith and password is test or those details what you just made.
                    when logged in employee side you can add job description,
                    jobhours, and work place id what employer just create. you can choose the
                    datetime and after saving program shows the writings to loggen employee</Typography>
                <Button variant="contained" style={{margin: 5}} onClick={() => { setShow_manual(false) }}>Close</Button></Dialog>
        </Container>)
}


export default Work_time;