import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";


interface textfieldErrors extends LogINuser {}

function LogIn(props?:any) {

    const[employeeUSRname, setEmployeeUSRname] = useState<string>("employee");
    const[employerUSRname, setEmployerUsrname] = useState<string>("employer");
    const[passWD, setPassWD] = useState<string>("test");
    const textHandler : LogINuser  = useRef<LogINuser>({});
    const [errorhandling, setErrorhandling] = useState<textfieldErrors>({})
    const navigate : NavigateFunction = useNavigate();

    const textAreaHandler = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
        textHandler.current[e.target.name] = e.target.value
    }

    const checkUser = (e? : React.FormEvent, value?:any | null) :void =>{
        e?.preventDefault();

        let errors : textfieldErrors = {}

        if(textHandler.current.usrName === employeeUSRname){
            if(textHandler.current.passWD === passWD){
                props.setEmployeeView(true)
                errors = {...errors, error:""};
                }
            else {errors = {...errors, error:"wrong username or password"};}
    }
        else if (textHandler.current.usrName === employerUSRname){
            if(textHandler.current.passWD === passWD){
                props.setEmployeeView(false)
                errors = {...errors, error:""};
            }else{
                errors = {...errors, error:"wrong username or passwrod"};
            }
       
        }else{
            errors = {...errors, error:"wrong username or passwrod"};
            console.log("eeeeeeeiiiiiiiii", textHandler.current.passwd)
            
        }
        setErrorhandling({...errors})
        console.log(errorhandling.error?.length)
        if(errorhandling.error?.length === 0 || errorhandling.error === undefined){
            navigate("/Work_time")
            props.setLogInVIEW(false)
            console.log("pitäs navikoida")
        }
        
    }


    return(<> 
    <form onSubmit={checkUser}>
    <TextField
        label="Give user name"
        name="usrName"
        variant="outlined"
        fullWidth={true}
        className='worktimeFields'
        onChange={textAreaHandler}
        error={Boolean(errorhandling.error)}
        helperText={errorhandling.error}
        />
    <TextField
        className='worktimeFields'
        label="Give your password"
        name="passWD" 
        variant="outlined"
        fullWidth={true}
        onChange={textAreaHandler}
        error={Boolean(errorhandling.error)}
        helperText={errorhandling.error}
        />
        <Button
        variant="contained"
        color="inherit"
        type="submit">Log in</Button>
        </form>
        {/*check how to hide passwd*/}</>)
}



export default LogIn;