import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Backdrop, Button, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography, Zoom } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";
import DOMPurify from 'dompurify';


function Forecast(props?: any) {
   

    const what_city = useRef<string | undefined>("")
    const [userchoose, setUserchoose] = useState<string>("")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({ Whole_forecast: {} })
    const userInput: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const userInputcountry: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [backdrop, setBackdrop] = useState<boolean>(false)
    const [forecastSaved, setForecastSaved] = useState<Forecast_needed[]>([])//{temp_min:0, temp_max:0, wind:0, timeStamp : new Date(),
    const [searchTime, setSearchTime] = useState<number>(0)
    const [searchBoolean, setSearchBoolean] = useState<boolean>(true)
    const [searchCounter, setSearchCounter] = useState<number>(0)
    const [searchemptyClient, setSearchemptyClient] = useState<boolean>(false)
    

    const get_forecast_from_server = async (userchoose: string): Promise<any> => {
        let permissionToGetNewSearch: boolean = false
        let timeDifference = 0
        console.log("user choose", userchoose)
        setFullForecast({ Whole_forecast: {}, errors: false, errorText: "" })
        if (props.allowForecast){ 
        try{
            setBackdrop(false)
            let url = `/api/forecast/forecastTimerule?forecast_timestamp=${props.forecast_timestamp}&searchemptyClient=${searchemptyClient}&${searchCounter}`
            const responsePermission = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
            const responsePermission_json = await responsePermission.json()
            if (responsePermission.status === 200){
                permissionToGetNewSearch = responsePermission_json.permissionTimerule[0]
                setSearchTime(responsePermission_json.permissionTimerule[1])
                timeDifference = responsePermission_json.permissionTimerule[1]
                props.setAllowForecast(false)
            }
        }
        catch(e){
            console.log("error to get timestamp", e)
        }
        if ((permissionToGetNewSearch === false) || (userchoose.length === 0)) {
            let url = `/api/forecast/forecast_saved`
            try {
                const response = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
                const response_json = await response.json()
                if (response.status === 200) {
                    setForecastSaved([...response_json[0]])
                    setSearchBoolean(permissionToGetNewSearch)
                    if (response_json[0][0]?.town_or_city !== undefined){
                        what_city.current = response_json[0][0].town_or_city
                        setUserchoose(response_json[0][0].town_or_city)
                        //setSearchCounter(0)
                        setFullForecast({ Whole_forecast: {}, errors: false, errorText: "" })

                        
                    }else{
                        what_city.current = "Empty"
                        setUserchoose("Empty")
                    }
                    
                } else {
                    setFullForecast({ Whole_forecast: {}, errors: true, errorText: `server error ${response.status}` })
                }
            } catch (error) {
                setFullForecast({ Whole_forecast: {}, errors: true, errorText: `could not find old city ${error}` })

            }
        } if ((permissionToGetNewSearch) && (userchoose.length > 0)) {
            try {
                console.log("permission given")
                let url = `/api/forecast/forecast?city_name=${userchoose}&country_code=fi&forecast_timestamp=${props.forecast_timestamp}`
                const response = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
                const response_json = await response.json()
                console.log("allow new search", permissionToGetNewSearch)
                if (response.status === 200) {
                    setForecastSaved([...response_json[0]])
                    setSearchTime(timeDifference)
                    setSearchBoolean(permissionToGetNewSearch)
                    
                    //setWhat_city(response_json[0][0].town_or_city)
                    if (response_json[0][0]?.town_or_city !== undefined){
                        console.log("not undefined")
                        props.setForecast_timestamp(new Date())
                        
                        what_city.current = response_json[0][0].town_or_city
                        setUserchoose(response_json[0][0].town_or_city)
                        setSearchCounter(0)
                        setSearchemptyClient(false)
                    }else{
                        what_city.current = "Empty"
                        setUserchoose("Empty")
                        console.log("that was empty search")
                        
                    }
               
                } 
                if (response.status === 404){
                    setSearchCounter(searchCounter + 1)
                    setSearchemptyClient(true)
                    setFullForecast({ Whole_forecast: {}, errors: true, errorText: `City not found please try again` })
                }else {
                    //setFullForecast({ Whole_forecast: {}, errors: true, errorText: `server error ${response.status}` })
                }
            } catch (error) {
                console.log(error)
                setFullForecast({ Whole_forecast: {}, errors: true, errorText: `could not find new city ${error}` })
            }
        }

        
        if (forecastSaved[0]?.town_or_city) {
            //setWhat_city(forecastSaved[0].town_or_city)
            //what_city.current = forecastSaved[0].town_or_city
        }
        setBackdrop(true)

    }else{
        console.log("nou permission at all")
        setBackdrop(true)
    }
    //props.setAllowForecast(false)

    }


   useEffect(() => {
        if (props.allowForecast) {
            props.setAllowForecast(true)
            get_forecast_from_server(userchoose)
            

        }
    }, [userchoose])// if town name changes lets get new forecast from api
    

    useEffect(() => {
        props.setAllowForecast(true)

        get_forecast_from_server(userchoose)
        what_city.current = "nothing"
        if (props.headLiner === "Forecast") {//headliner

        } else {
            props.setHeadliner("Forecast")
            localStorage.setItem("last_path", "/Forecast")
        }
    }, [])

    const userTextFieldInput = (e: any): void => { // when user feeds an input, it handles here and also some error handling
        props.setAllowForecast(true)
        //let valueToCheck = userInput.current!.value
        const valueToCheck = DOMPurify.sanitize(userInput.current!.value);
        valueToCheck.toLowerCase()
        var temp = ""
        for (let i = 0; i <= valueToCheck.length; i++) {
            var aaa = /ä/g;
            var ooo = /ö/g;
            var johhoh = /å/g;

            temp = valueToCheck.replace(aaa, "a").replace(ooo, "o").replace(johhoh, "o")

        }
        setUserchoose(temp)
        //what_city.current = temp
        props.setAllowForecast(true)
        setBackdrop(false)
        get_forecast_from_server(temp)
    }


    function getIconUrl(code: string): string {
        return `http://openweathermap.org/img/wn/${code}.png`; //weahter api icon
    }

    return (
        <Container maxWidth="xl" className='forecast'> {/*'here we printout whe weatherforecast with icons to list component Here is also textfield.'*/}
            
            {(Boolean(fullForecast.errors))
                ? <Alert severity="error">{fullForecast.errorText}</Alert>
                : (fullForecast.errors)}
            <Typography variant="h4">Get forecast. Now viewing {what_city.current} forecast.</Typography>
            <Typography variant="body2">You can search with key word only once per 3 minutes. This is free api service. Time from last search {(searchTime / 60000).toFixed(2)} min</Typography>
            {!searchBoolean ? <Typography variant="body1">Now viewing old search</Typography> : <></>}
            <TextField
                variant="outlined"
                label="Give city or town name what you want to search (Default Tampere)"
                inputRef={userInput}
                fullWidth

                sx={{
                    '& .MuiInputBase-input': {
                        backgroundColor: 'gray',
                    }, '& + &': {
                        marginTop: '1rem',
                    },
                }}
                error={fullForecast.errors}
                helperText={fullForecast.errorText}
            />
            <TextField
                variant="outlined"
                label="Please  enter countrycode"
                inputRef={userInputcountry}
                disabled={true}
                fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        backgroundColor: 'gray',
                    }, '& + &': {
                        marginTop: '1rem',
                    },
                }}
                error={fullForecast.errors}
                helperText={fullForecast.errorText}
            />
            {backdrop ?
                <><Button 
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={userTextFieldInput}> Search! </Button><>
                        <List>
                            {forecastSaved.map((item: Forecast_needed, index: number) => {
                                return (
                                    <Zoom in={backdrop} key={index} style={{ transitionDelay: backdrop ? `${index === 0 ? index : index+1}00ms` : '0ms' }}>
                                    <ListItem key={index} className="listViewItems">
                                        <Stack direction="row" spacing={2} key={index}>
                                        <ListItemIcon ><img src={getIconUrl(String(item.icon))} alt={String(index)} /></ListItemIcon>
                                        <ListItemText key={index}>
                                            <Typography variant="h5">{`Date ${String(format(new Date(item.timestamp), "yyyy-MM-dd hh"))} and time ${String(format(new Date(item.timestamp), "hh:mm"))}`}</Typography>
                                            <Typography variant="body1"> {`Min temp: ${item.temp_min} C and temp max : ${item.temp_max} and city: ${item.town_or_city}`}</Typography>
                                            <Typography variant="body2"> {` Wind :${item.wind} Meters per second and description is : ${item.shorDescription} , Visibility: ${item.visibility} meters`}</Typography>
                                            
                                           
                                        </ListItemText>
                                        
                                        </Stack>
                                    </ListItem>
                                    </Zoom>

                                );
                            })}
                        </List>
                    </></>

                : <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>}

        </Container>
    )
}


export default Forecast;