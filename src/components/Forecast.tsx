import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

import { Backdrop, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



function Forecast (props?:any){
    props.setHeadliner("Forecast")
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({Whole_forecast : {}})
    const userInput : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [backdrop, setBackdrop] = useState<boolean>(false)
    const [forecastSaved, setForecastSaved] = useState<Forecast_needed[]>([])

    const get_forecast = async () : Promise<any> => {
        if (!fullForecastSearch.current){
            try {
            
                const connectionFC = await fetch(`https://xamkbit.azurewebsites.net/saaennuste/${userchoose}`);
                const apidataFC = await connectionFC.json();
                
                setFullForecast({
                    ...fullForecast,
                    Whole_forecast : apidataFC,
                    errors: false,
                    errorText : ""
                })
                fullForecastSearch.current = true
                props.setAllowForecast(false)
                saveNeededData()
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
       get_forecast()
    }
}, [userchoose])

useEffect(() => {
    if(props.allowForecast){
        get_forecast()
    }
}, [])
    let datatesting = Object.keys(fullForecast.Whole_forecast)

    const saveNeededData = () : void =>{
        let TempSaveValue : Forecast_needed[] = []
        let i = 0
        console.log("testiä",TempSaveValue[0], fullForecast.Whole_forecast['list'].length)
        try{
            let listLenght = 40//fullForecast.Whole_forecast['list'].length
            for (i = 0; i < listLenght; i++){
                TempSaveValue[i] = {...TempSaveValue[i], temp_min : fullForecast.Whole_forecast['list'][i]['main']['temp_min']
                                    ,temp_max : fullForecast.Whole_forecast['list'][i]['main']['temp_max']
                                    , wind : fullForecast.Whole_forecast['list'][i]['wind']['speed']
                                    , timeStamp : fullForecast.Whole_forecast['list'][i]['dt_txt']
                                    , icon : fullForecast.Whole_forecast['list'][i]['weather'][0]['icon']
                                    , shorDescription : fullForecast.Whole_forecast['list'][i]['weather'][0]['main']
                                    , visibility : fullForecast.Whole_forecast['list'][i]['sys']['visibility']}
                                    console.log("inside", TempSaveValue[i])
            }
            setForecastSaved(TempSaveValue)
             
        }catch(error){
            console.log(`ei ${error}`)
        }
        console.log("temp save", forecastSaved) 
    }
    
    function getIconUrl(code: string): string {
        return `http://openweathermap.org/img/wn/${code}.png`;
      } 
    //{Object.entries(fullForecast.Whole_forecast['list']).map((data, idx) => {return <p key={idx}>{data[idx]}</p>})}
    console.log(fullForecast.Whole_forecast)
    
    //let test = fullForecast.Whole_forecast['list'].map((item : Forecast_json, index : number) => {return(item.Whole_forecast[index])})
    //console.log(Object.keys(fullForecast.Whole_forecast).map(( array : string, idx: number, all : any) => {return(all[idx] )}))
    return(
    <Container maxWidth="xl"  className='forecast'>
       
        <Typography variant="h4">Get forecast. Now viewing {userchoose} forecast.</Typography>
        <TextField
          variant="outlined"
          label="Give city or town name what you want to search"
          inputRef={userInput}
          fullWidth
          error={fullForecast.errors}
          helperText={fullForecast.errorText}
        />
     {backdrop? 
    <Button color='inherit'
    variant="contained"
    startIcon={<SearchIcon/>} > Search! </Button>
    
    :<Backdrop open={true}>
         <CircularProgress color="inherit" />
       </Backdrop> }
        
    </Container>
    )
}


export default Forecast;