import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from '@mui/icons-material/Login';
import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


interface textfieldErrors extends LogINuser {} //this is for error handling.

function LogIn(props?:any) {
    // here are the values
    const[employeeUSRname, setEmployeeUSRname] = useState<string>("employee");
    const[employerUSRname, setEmployerUsrname] = useState<string>("employer");
    const[passWD, setPassWD] = useState<string>("test");
    const textHandler : LogINuser  = useRef<LogINuser>({});
    const [errorhandling, setErrorhandling] = useState<textfieldErrors>({})
    const navigate : NavigateFunction = useNavigate();

    const textAreaHandler = (e : React.ChangeEvent<HTMLInputElement>) : void =>{//this is for textfield handling
        textHandler.current[e.target.name] = e.target.value
    }

    const checkUser = (e? : React.FormEvent, value?:any | null) :void =>{//when button pressed, here we check the possible errors or save the data
        e?.preventDefault();

        let errors : textfieldErrors = {}

        if(textHandler.current.usrName === employeeUSRname){
            if(textHandler.current.passWD === passWD){
                props.setEmployeeView(true) // this will select witch view will show.
                errors = {}
                
                }
            else {errors = {...errors, error:"wrong username or password"};}
    }
        else if (textHandler.current.usrName === employerUSRname){
            if(textHandler.current.passWD === passWD){
                props.setEmployeeView(false)
                errors = {...errors, error:""};
                errors = {}
            }else{
                errors = {...errors, error:"wrong username or passwrod"};
            }
       
        }else{
            errors = {...errors, error:"wrong username or passwrod"};
            
            
        }

        if (textHandler.current.usrName === undefined || textHandler.current.passWD === null)
        {
            errors = {...errors, error:"Give username and password"}
            
        }

       
    
        if( Object.entries(errors).length >0 ){
            setErrorhandling({...errors}) //here we save the possible errors for helper text
        }else{
            navigate("/Work_time")
            props.setLogInVIEW(false)//if login succes, then login view disappear.
            

        }
        
    }


    return(<> 
    <form onSubmit={checkUser}>
    <Typography>Hey! This is demo login. If you want to log in with employer account use 
        username employer and pass word test. Employee view use employee for user name 
        and same password.
    </Typography>
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
        type="password"
        fullWidth={true}
        onChange={textAreaHandler}
        error={Boolean(errorhandling.error)}
        helperText={errorhandling.error}
        />
        <Button
        variant="contained"
        color="inherit"
        type="submit"
        startIcon={<LoginIcon/>}>Log in</Button>
        </form>
        </>)
}



export default LogIn;