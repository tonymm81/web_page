import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

import { Button, Container, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Forecast (props?:any){
    props.setHeadliner("Forecast")
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({Whole_forecast : {}})
    const userInput : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [errorhelper, setErrorhelper] = useState<string>("")

    const get_forecast = async () : Promise<any> => {
        if (!fullForecastSearch.current){
            try {
            
                const connectionFC = await fetch(`https://xamkbit.azurewebsites.net/saaennuste/${userchoose}`);
                const apidataFC = await connectionFC.json();
                
                setFullForecast({
                    ...fullForecast,
                    Whole_forecast : apidataFC,
                    errors: false
                })
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
        
        try{
            let listLenght = fullForecast.Whole_forecast['list']
            
        }catch(error){
            console.log(`ei ${error}`)
        }
    }
    
    function getIconUrl(code: string): string {
        return `http://openweathermap.org/img/wn/${code}.png`;
      } 
    //{Object.entries(fullForecast.Whole_forecast['list']).map((data, idx) => {return <p key={idx}>{data[idx]}</p>})}
    console.log(fullForecast.Whole_forecast)
    //let test = fullForecast.Whole_forecast['list'].map((item : Forecast_json, index : number) => {return(item.Whole_forecast[index])})
    console.log(Object.keys(fullForecast.Whole_forecast).map(( array : string, idx: number, all : any) => {return(all[idx] )}))
    return(
    <Container maxWidth="xl"  className='forecast'>
        
        <Typography variant="h4">Get forecast. Now viewing {userchoose} forecast.</Typography>
        <TextField
          variant="outlined"
          label="Give city or town name what you want to search"
          inputRef={userInput}
          fullWidth
          error={Boolean(errorhelper)}
          helperText={errorhelper}
        />
    <Button color='inherit'
    variant="contained"
    startIcon={<SearchIcon/>} > Search! </Button>
    
    </Container>
    )
}


export default Forecast;