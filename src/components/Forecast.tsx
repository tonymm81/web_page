import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Backdrop, Button, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function Forecast (props?:any){
    if (props.headLiner === "Forecast"){//headliner

    }else{
        props.setHeadliner("Forecast")
    }
    const weahter_api = process.env.REACT_APP_API_KEY
    
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const locationSearch : React.MutableRefObject<boolean> = useRef(false);
    const savePermission : React.MutableRefObject<boolean> = useRef(true);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({Whole_forecast : {}})
    const userInput : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const userInputcountry : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [backdrop, setBackdrop] = useState<boolean>(false)
    const [forecastSaved, setForecastSaved] = useState<Forecast_needed[]>([])//{temp_min:0, temp_max:0, wind:0, timeStamp : new Date(),
    const lat : React.MutableRefObject<undefined> = useRef();
    const lon : React.MutableRefObject<undefined> = useRef();

    const get_location = async (city_name : string, country_code : string) : Promise<any> => {
        if (!locationSearch.current) {
        try{
            const returndata = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${5}&appid=${weahter_api}`)
            const locationinfo = await returndata.json()
            locationSearch.current= true
            lat.current = locationinfo[0]['lat']
            lon.current = locationinfo[0]['lon']
            setUserchoose(locationinfo[0]['name'])
            
        }catch(error){
            console.log(error)
        }
        }
        
    }

    const get_forecast = async () : Promise<any> => { //here we get apicall and save the data

        if (!fullForecastSearch.current){
            try {
            
                const connectionFC = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat.current}&lon=${lon.current}&appid=${weahter_api}&units=metric`); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
                const apidataFC = await connectionFC.json();
                if(apidataFC['cod'] === '404'){
                    setFullForecast({
                        ...fullForecast,
                        Whole_forecast : {},
                        errors : true,
                        errorText : "City not found"
                    })
                    
                }else{
                setFullForecast({ 
                    ...fullForecast,
                    Whole_forecast : apidataFC,
                    errors: false,
                    errorText : ""
                })}
                fullForecastSearch.current = true
                props.setAllowForecast(false)
                
                
        } catch (error){
            setFullForecast({
                ...fullForecast,
                Whole_forecast : {},
                errors : true,
                errorText : `Error happened ${error}`
            })
            fullForecastSearch.current = false
            
        }
        }
        
        setBackdrop(true)
    }
useEffect(() => {
    if (props.allowForecast){
       
        get_location("Tampere", "FI")
       //get_forecast()
       setTimeout(() => get_forecast(), 1000)
         
    }   
}, [userchoose])// if town name changes lets get new forecast from api

useEffect(() => {
    if(props.allowForecast && !fullForecastSearch.current){
        //locationSearch.current = false
        get_location("Tampere", "FI")
        setTimeout(() => get_forecast(), 1000)
        
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
          get_location(temp, userInputcountry.current!.value)
          setTimeout(() => get_forecast(), 1000)
    }

    const saveNeededData = () : void =>{ // here we save all needed data from api. This Object is easier to handle in graphics components
        //setForecastSaved([])
        let TempSaveValue : Forecast_needed[] = [...forecastSaved]
        let i = 0
        try{
            let listLenght = fullForecast.Whole_forecast['list'].length
            for (i = 0; i < listLenght;){
                TempSaveValue[i] = {...TempSaveValue[i], temp_min : fullForecast.Whole_forecast['list'][i]['main']['temp_min']
                                    ,temp_max : fullForecast.Whole_forecast['list'][i]['main']['temp_max']
                                    , wind : fullForecast.Whole_forecast['list'][i]['wind']['speed']
                                    , timeStamp : fullForecast.Whole_forecast['list'][i]['dt_txt']
                                    , icon : fullForecast.Whole_forecast['list'][i]['weather'][0]['icon']
                                    , shorDescription : fullForecast.Whole_forecast['list'][i]['weather'][0]['main']
                                    , visibility : fullForecast.Whole_forecast['list'][i]['visibility']}
                                    i = i+1
            }
            if (TempSaveValue && forecastSaved.length === 0){ // This allows to save data only once.
                setForecastSaved( [...TempSaveValue])
                savePermission.current = false
                
                TempSaveValue = []
            }
        }catch(error){
            console.log(`ei ${error}`)
        } 
    }
    
    function getIconUrl(code: string): string {
        return `http://openweathermap.org/img/wn/${code}.png`; //weahter api icon
      } 
    if (fullForecastSearch.current){
        if (savePermission.current && forecastSaved.length === 0){
            setTimeout(() => saveNeededData(), 1000)
            
        }
    }
    
    return( 
    <Container maxWidth="xl"  className='forecast'> {/*'here we printout whe weatherforecast with icons to list component Here is also textfield.'*/}
       
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
                                            {`Min temp: ${item.temp_min} C and temp max : ${item.temp_max} ,Time ${item.timeStamp}`}
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