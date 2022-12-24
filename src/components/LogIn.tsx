import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function LogIn(props?:any) {

    const[employeeUSRname, setEmployeeUSRname] = useState<string>("employee");
    const[employerUSRname, setEmployerUsrname] = useState<string>("employer");
    const[passWD, setPassWD] = useState<string>("test");



    return(<> <TextField
        label="Give user name"
        name="usrName"
        variant="outlined"
        fullWidth={true}
        className='worktimeFields'
        />
    <TextField
        className='worktimeFields'
        label="Give your password"
        name="passWD" 
        variant="outlined"
        fullWidth={true}
        
        />
        <Button
        variant="contained"
        color="inherit">Log in</Button>

        {/*check how to hide passwd*/}</>)
}



export default LogIn;