import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from '@mui/icons-material/Login';
import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Checkbox, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DOMPurify from 'dompurify';

interface textfieldErrors extends LogINuser { } //this is for error handling.

function LogIn(props?: any) { //this function is the login view where user can log in to page.

    const textHandler: LogINuser = useRef<LogINuser>({});
    const [employerChecked, setEmployerChecked] = useState<boolean>(false);
    const [errorhandling, setErrorhandling] = useState<textfieldErrors>({})
    const [errorhandling_new_usr, setErrorhandling_new_usr] = useState<textfieldErrors>({})
    const navigate: NavigateFunction = useNavigate();
    const [hideNewUser, setHideNewUser] = useState<boolean>(true)
    const textAreaHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {//this is for textfield handling
        textHandler.current[e.target.name] = DOMPurify.sanitize(e.target.value);
    }
    const addUser = async (e?: React.FormEvent, value?: any | null): Promise<void> => {
        let errors: textfieldErrors = {}
        setErrorhandling_new_usr({})
        e?.preventDefault();
        if (textHandler.current.newusrName) {  // if username and password is given lets move on
            if ((textHandler.current.newpassWD) && ( textHandler.current.newpassWD === textHandler.current.newRetypedpassWD )){
                let IsEmployer = ""
                if (employerChecked){
                    IsEmployer = "employer"
                }
                else {
                    IsEmployer = "employee"
                }
                const connection_sign = await fetch("/api/signin/signin", { // post request what check in user has finded
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: textHandler.current?.newusrName,
                        password: textHandler.current?.newpassWD,
                        user_error: "none",
                        who_is_logging: IsEmployer

                    })
                });

                if (connection_sign.status === 200) {
                    //console.log("ok")//add this status to graphics
                    alert("New user saved!")
                    setHideNewUser(true)
                    textHandler.current = {}
                } else {
                    errors = { ...errors, error: "Give username and password" }
                    setErrorhandling_new_usr(errors)
                }
            } else {
                errors = { ...errors, error: "Give username and password" }
                setErrorhandling_new_usr(errors)
            }
        } else {
            errors = { ...errors, error: "Give username and password" }
            setErrorhandling_new_usr(errors)
        }
    }
    const checkUser = async (e?: React.FormEvent, value?: any | null): Promise<void> => {//when button pressed, here we check the possible errors or save the data
        e?.preventDefault();

        let errors: textfieldErrors = {}
        setErrorhandling({})
        if (textHandler.current.usrName) {  // if username and password is given lets move on
            if (textHandler.current.passWD) {
                const connection = await fetch("/api/auth/login", { // post request what check in user has finded
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: textHandler.current?.usrName,
                        password: textHandler.current?.passWD
                    })
                });
                if (connection.status === 200) { // if not giving errors, lets take token annd who is logged
                    let { token, username, who_is_logging, user_id } = await connection.json();
                    props.setToken(token)
                    props.setEmployeeName(username)
                    props.setWho_is_logging(who_is_logging)
                    props.setUser_id(user_id)

                    localStorage.setItem("token", token);
                    errors = {}
                    if (who_is_logging === "employer") {
                        props.setEmployeeView(false) // employer side of webpage

                    } else {
                        props.setEmployeeView(true) // employee side of the webside
                    }
                    navigate("/Work_time")
                    props.setLogInVIEW(false) // after successed login, lets navigate out from login component
                }
                else {
                    errors = { ...errors, error: "wrong username or password" };
                    setErrorhandling(errors)
                }

            }
            else {
                errors = { ...errors, error: "wrong username or password" };
                setErrorhandling(errors)
            }



        } else {
            errors = { ...errors, error: "wrong username or password" };
            setErrorhandling(errors)
        }



        if (textHandler.current.usrName === undefined || textHandler.current.passWD === null) {
            errors = { ...errors, error: "Give username and password" }
            setErrorhandling(errors)

        }

        if (Object.entries(errors).length > 0) {
            setErrorhandling({ ...errors }) //here we save the possible errors for helper text
        }

    }
    const IsEmployer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployerChecked(event.target.checked);
      };

    return (<>
        {hideNewUser ?  
        <form onSubmit={checkUser}>
            <Typography variant="body1" display="inline" style={{ padding: 10 }}>Hey! This is demo login. If you want to log in with employer account use
                <strong> username jane_smith and password test</strong>. Employee view use <strong> john_smith for username
                    and same test password.</strong> Employee has to make user name and pass word so employer can make him
                working place id and payment info. After that employee can login and mark his work time details to application.
                data will saved on server database with secured route.
                Please dont save here any real person information or backaccount information.
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
                startIcon={<LoginIcon />} sx={{margin:2}}>Log in</Button>
                 <Button
                variant="contained"
                color="inherit"
                onClick={()=>setHideNewUser(false)}
                startIcon={<AddCircleOutlineIcon />} sx={{margin:2}}>Add new user</Button>
        </form>
        :
        <form onSubmit={addUser}>
            <Typography variant="body1">Here you can add <strong> new employee.</strong> When you have entered the username and password. please login after you enter the new user data.Notice
                that employer have to give the payment details to new employee before he or she can use the worktime app.
            </Typography>
            <Checkbox
                checked={employerChecked}
                onChange={IsEmployer}
                inputProps={{ 'aria-label': 'controlled' }}
                title="Are you employer"
                /><strong> Are you emplooyer?</strong>
            <TextField
                label="Give new user name"
                name="newusrName"
                variant="outlined"
                fullWidth={true}
                className='worktimeFields'
                onChange={textAreaHandler}
                error={Boolean(errorhandling_new_usr.error)}
                helperText={errorhandling_new_usr.error}
            />
            <TextField
                className='worktimeFields'
                label="Give new password"
                name="newpassWD"
                variant="outlined"
                type="password"
                fullWidth={true}
                onChange={textAreaHandler}
                error={Boolean(errorhandling_new_usr.error)}
                helperText={errorhandling_new_usr.error}
            />
            <TextField
                className='worktimeFields'
                label="Retype your new password"
                name="newRetypedpassWD"
                variant="outlined"
                type="password"
                fullWidth={true}
                onChange={textAreaHandler}
                error={Boolean(errorhandling_new_usr.error)}
                helperText={errorhandling_new_usr.error}
            />
            <Button
                variant="contained"
                color="inherit"
                type="submit"
                startIcon={<LoginIcon />} sx={{margin:2}}>Save user</Button>
             <Button
                variant="contained"
                color="inherit"
                onClick={()=>setHideNewUser(true)}
                startIcon={<CancelIcon />} sx={{margin:2}}>cancel</Button>
        </form>}
    </>
    )
}



export default LogIn;