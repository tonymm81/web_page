import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Alert, Backdrop, Button, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";

function Forecast (props?:any){
    if (props.headLiner === "Forecast"){//headliner

    }else{
        props.setHeadliner("Forecast")
    }
    
    const [what_city, setWhat_city] = useState<string>("tampere")
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const locationSearch : React.MutableRefObject<boolean> = useRef(false);
    const savePermission : React.MutableRefObject<boolean> = useRef(true);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({Whole_forecast : {}})
    const userInput : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const userInputcountry : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [backdrop, setBackdrop] = useState<boolean>(false)
    const [forecastSaved, setForecastSaved] = useState<Forecast_needed[]>([])//{temp_min:0, temp_max:0, wind:0, timeStamp : new Date(),
   

   
    const get_forecast_from_server = async (userchoose : string) : Promise<any> => {
        setBackdrop(false)
        setFullForecast({Whole_forecast : {}, errors : false, errorText : ""})
        if(userchoose === what_city){
            if (!locationSearch.current) {
                //
                let url = `/api/forecast/forecast_saved`
                try{
                    const response = await fetch(url, {method : "GET"}) // get data from backend
                    const response_json = await response.json()
                    if (response.status === 200){
                        console.log("get old forecast")
                        setForecastSaved([...response_json])
                        
                        }else{
                            setFullForecast({Whole_forecast : {}, errors : true, errorText : `server error ${response.status}`})
                        }
                    }catch(error){
                        console.log(error)
                        setFullForecast({Whole_forecast : {}, errors : true, errorText : `could not find old city ${error}`})
                        
                    }
                }}else{
                    try{
                        let url = `/api/forecast/forecast?city_name=${userchoose}&country_code=fi`
                        const response = await fetch(url, {method : "GET"}) // get data from backend
                        const response_json = await response.json()
                        if (response.status === 200){
                            console.log("get new forecast")
                            setForecastSaved([...response_json])
                            //setWhat_city(forecastSaved[0].town_or_city)
                        }else{
                            setFullForecast({Whole_forecast : {}, errors : true, errorText : `server error ${response.status}`})
                        }
                        }catch(error){
                            console.log(error)
                            setFullForecast({Whole_forecast : {}, errors : true, errorText : `could not find new city ${error}`})
                        } 
                }
        //saveNeededData()
        setBackdrop(true)
        setWhat_city(forecastSaved[0].town_or_city)
    }

   
useEffect(() => {
    if (props.allowForecast){
        get_forecast_from_server(userchoose)
       
         
    }   
}, [userchoose])// if town name changes lets get new forecast from api

useEffect(() => {
    if(props.allowForecast && !fullForecastSearch.current){
       
        get_forecast_from_server(userchoose)
        
        
    }
}, [])
    
    const userTextFieldInput = (e:any):void => { // when user feeds an input, it handles here and also some error handling
        let valueToCheck = userInput.current!.value
        valueToCheck.toLowerCase()
        var temp =""
        for (let i = 0; i <= valueToCheck.length; i++){
            var aaa = /ä/g;
            var ooo = /ö/g;
            var johhoh = /å/g;
    
            temp = valueToCheck.replace(aaa, "a").replace(ooo, "o").replace(johhoh, "o")        
            
          }
          setUserchoose(temp)
          savePermission.current=true
          props.setAllowForecast(true)
          setBackdrop(false)
          fullForecastSearch.current=false
          locationSearch.current=false
          get_forecast_from_server(temp)
          //setWhat_city(temp)
    }

    
    function getIconUrl(code: string): string {
        return `http://openweathermap.org/img/wn/${code}.png`; //weahter api icon
      } 
    if (fullForecastSearch.current){
        if (savePermission.current && forecastSaved.length === 0){
            //setTimeout(() => saveNeededData(), 1000)
            
        }
    }
    console.log(forecastSaved)
    return( 
    <Container maxWidth="xl"  className='forecast'> {/*'here we printout whe weatherforecast with icons to list component Here is also textfield.'*/}
         {(Boolean(fullForecast.errors))
        ? <Alert severity="error">{fullForecast.errorText}</Alert>
        : (fullForecast.errors)} 
        <Typography variant="h4">Get forecast. Now viewing {userchoose} forecast.</Typography>
        <TextField
          variant="outlined"
          label="Give city or town name what you want to search (Default Tampere)"
          inputRef={userInput}
          fullWidth
          error={fullForecast.errors}
          helperText={fullForecast.errorText}
        />
        <TextField
          variant="outlined"
          label="Please  enter countrycode"
          inputRef={userInputcountry}
          fullWidth
          error={fullForecast.errors}
          helperText={fullForecast.errorText}
        />
     {backdrop? 
    <><Button color='inherit'
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={userTextFieldInput}> Search! </Button><>
                        <List>
                            {forecastSaved.map((item: Forecast_needed, index: number) => {
                                return (
                                    <ListItem key={index} className="listViewItems">
                                        <ListItemText>
                                            {`Min temp: ${item.temp_min} C and temp max : ${item.temp_max} ,Time ${String(format(new Date(item.timestamp), "y-m-d h"))}`}
                                            {` Wind :${item.wind} Meters per second and : ${item.shorDescription} , Visibility: ${item.visibility} meters`}
                                            <ListItemIcon><img src={getIconUrl(String(item.icon))} alt={String(index)}/></ListItemIcon>
                                        </ListItemText>
                                    </ListItem>

                                );
                            })}
                        </List>
                    </></>
    
    :<Backdrop open={true}>
         <CircularProgress color="inherit" />
       </Backdrop> } 
        
    </Container>
    )
}


export default Forecast;