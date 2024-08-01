import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Backdrop, Button, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";



function Forecast(props?: any) {
   

    const what_city = useRef<string | undefined>("")
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({ Whole_forecast: {} })
    const userInput: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const userInputcountry: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [backdrop, setBackdrop] = useState<boolean>(false)
    const [forecastSaved, setForecastSaved] = useState<Forecast_needed[]>([])//{temp_min:0, temp_max:0, wind:0, timeStamp : new Date(),
    const [searchTime, setSearchTime] = useState<number>(0)
    const [searchBoolean, setSearchBoolean] = useState<boolean>(true)
    const [searchCounter, setSearchCounter] = useState<number>(0)
    //const [searchBooleanClient, setSearchBooleanClient] = useState<boolean>(true)
    

    const get_forecast_from_server = async (userchoose: string): Promise<any> => {
        let permissionToGetNewSearch  
        if (props.allowForecast){ 
        try{
            let url = `/api/forecast/forecastTimerule?forecast_timestamp=${props.forecast_timestamp}`
            const responsePermission = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
            const responsePermission_json = await responsePermission.json()
            if (responsePermission.status === 200){
                permissionToGetNewSearch = responsePermission_json.permissionTimerule[0]
                console.log("test the timestamp", responsePermission_json.permissionTimerule[0])
                setSearchTime(responsePermission_json.permissionTimerule[1])
            }
        }
        catch(e){
            console.log("error to get timestamp", e)
        }
        setBackdrop(false)
        setFullForecast({ Whole_forecast: {}, errors: false, errorText: "" })

        if (permissionToGetNewSearch === false) {
            let url = `/api/forecast/forecast_saved`
            try {
                const response = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
                const response_json = await response.json()
                if (response.status === 200) {
                    setForecastSaved([...response_json[0]])
                    setSearchTime(response_json[1][1])
                    setSearchBoolean(response_json[1][0])
                    setSearchBoolean(true)
                    if (response_json[0][0]?.town_or_city !== undefined){
                        what_city.current = response_json[0][0].town_or_city
                        setUserchoose(response_json[0][0].town_or_city)
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
        } if (permissionToGetNewSearch) {
            try {
                let url = `/api/forecast/forecast?city_name=${userchoose}&country_code=fi&forecast_timestamp=${props.forecast_timestamp}`
                const response = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
                const response_json = await response.json()
                console.log("allow new search", permissionToGetNewSearch)
                if (response.status === 200) {
                    setForecastSaved([...response_json[0]])
                    setSearchTime(response_json[1][1])
                    setSearchBoolean(response_json[1][0])
                    console.log("waht search", response_json[2])
                    //setWhat_city(response_json[0][0].town_or_city)
                    if (response_json[0][0]?.town_or_city !== undefined){
                        console.log("not undefined")
                        props.setForecast_timestamp(new Date())
                        console.log("reset time stamp",response_json[3])
                        what_city.current = response_json[0][0].town_or_city
                        setUserchoose(response_json[0][0].town_or_city)
                        setSearchCounter(0)
                    }else{
                        what_city.current = "Empty"
                        setUserchoose("Empty")
                        console.log("that was empty search")
                        
                    }
                } else {
                    setFullForecast({ Whole_forecast: {}, errors: true, errorText: `server error ${response.status}` })
                }
            } catch (error) {
                console.log(error)
                setFullForecast({ Whole_forecast: {}, errors: true, errorText: `could not find new city ${error}` })
            }
        }

        setBackdrop(true)
        if (forecastSaved[0]?.town_or_city) {
            //setWhat_city(forecastSaved[0].town_or_city)
            what_city.current = forecastSaved[0].town_or_city
        }
        props.setAllowForecast(false)
    }
    }


    useEffect(() => {
        if (props.allowForecast) {
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
        let valueToCheck = userInput.current!.value
        valueToCheck.toLowerCase()
        var temp = ""
        for (let i = 0; i <= valueToCheck.length; i++) {
            var aaa = /ä/g;
            var ooo = /ö/g;
            var johhoh = /å/g;

            temp = valueToCheck.replace(aaa, "a").replace(ooo, "o").replace(johhoh, "o")

        }
        setUserchoose(temp)
        what_city.current = temp
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
            {!searchBoolean ? <Typography variant="body2">Now viewing old search</Typography> : <></>}
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
                                    <ListItem key={index} className="listViewItems">
                                        <Stack direction="row" spacing={2} key={index}>
                                        <ListItemIcon ><img src={getIconUrl(String(item.icon))} alt={String(index)} /></ListItemIcon>
                                        <ListItemText key={index}>
                                            <Typography variant="h5">{`Time ${String(format(new Date(item.timestamp), "y-m-d h"))}`}</Typography>
                                            <Typography variant="body1"> {`Min temp: ${item.temp_min} C and temp max : ${item.temp_max} and city: ${item.town_or_city}`}</Typography>
                                            <Typography variant="body2"> {` Wind :${item.wind} Meters per second and description is : ${item.shorDescription} , Visibility: ${item.visibility} meters`}</Typography>
                                            
                                           
                                        </ListItemText>
                                        
                                        </Stack>
                                    </ListItem>

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