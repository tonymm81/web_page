import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

import { Button, Container, TextField, Typography } from '@mui/material';


function Forecast (props?:any){
    props.setHeadliner("Forecast")
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({})
    const userInput : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [errorhelper, setErrorhelper] = useState<string>("")

    const whole_forecast = async () : Promise<any> => {
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
                errorText : 'Error happened ${error}'
            })
            fullForecastSearch.current = false
            
        }
        }


        

    }
useEffect(() => {
    if (props.allowForecast){
        whole_forecast()
    }
}, [userchoose])

useEffect(() => {
    if(props.allowForecast){
        whole_forecast()
    }
}, [])

    console.log(fullForecast.Whole_forecast)
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
    variant="contained"> Search! </Button>
    {Object.entries(whole_forecast).map((data, idx) => {return <p>{userchoose}</p>})}
    </Container>
    )
}


export default Forecast;