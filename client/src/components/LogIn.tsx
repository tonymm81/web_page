import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from '@mui/icons-material/Login';
import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


interface textfieldErrors extends LogINuser {} //this is for error handling.

function LogIn(props?:any) { //this function is the login view where user can log in to page.
    
    const textHandler : LogINuser  = useRef<LogINuser>({});
    const [errorhandling, setErrorhandling] = useState<textfieldErrors>({})
    const navigate : NavigateFunction = useNavigate();
    const textAreaHandler = (e : React.ChangeEvent<HTMLInputElement>) : void =>{//this is for textfield handling
        textHandler.current[e.target.name] = e.target.value
    }

    const checkUser = async (e? : React.FormEvent, value?:any | null) : Promise<void> =>{//when button pressed, here we check the possible errors or save the data
        e?.preventDefault();

        let errors : textfieldErrors = {}

        if(textHandler.current.usrName){  // if username and password is given lets move on
            if(textHandler.current.passWD){
                const connection = await fetch("/api/auth/login", { // post request what check in user has finded
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        userName : textHandler.current?.usrName,
                        password : textHandler.current?.passWD
                    })
                });
                if (connection.status === 200){ // if not giving errors, lets take token annd who is logged
                    let {token, user} = await connection.json();
                    props.setToken(token)
                    props.setWho_is_logging(user)
                    console.log("login", token)
                    localStorage.setItem("token", token);
                    errors = {}
                    if (user === "employer"){
                        props.setEmployeeView(false) // employer side of webpage

                    }else{
                        props.setEmployeeView(true) // employee side of the webside
                    }
                    navigate("/Work_time")
                    props.setLogInVIEW(false) // after successed login, lets navigate out from login component
                }
                
                
                }
            else {errors = {...errors, error:"wrong username or password"};}
    }
        
        if (textHandler.current.usrName === undefined || textHandler.current.passWD === null)
        {
            errors = {...errors, error:"Give username and password"}
            
        }
    
        if( Object.entries(errors).length >0 ){
            setErrorhandling({...errors}) //here we save the possible errors for helper text
        }
        
    }


    return(<> 
    <form onSubmit={checkUser}>
    <Typography>Hey! This is demo login. If you want to log in with employer account use 
        username employer and password test. Employee view use employee for username 
        and same password. (Nothing will be saved on browser or server)
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