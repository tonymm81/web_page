import React, { useRef, useState } from 'react';
import '../App.css';
import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function Forecast (props?:any){
    props.setHeadliner("Forecast")
    const fullForecastSearch : React.MutableRefObject<boolean> = useRef(false);
    const [userchoose, setUserchoose] = useState<string>("tampere")
    const [fullForecast, setFullForecast] = useState<Forecast_json>({})

    const whole_forecast = async () : Promise<any> => {
        if (!fullForecastSearch){
            try {
            
                const connection = await fetch(`https://xamkbit.azurewebsites.net/saaennuste/${userchoose}`);
                const apidata = await connection.json();

                setFullForecast({
                    ...fullForecast,
                    Whole_forecast : apidata,
                    errors: false
                })

        } catch (error){
            setFullForecast({
                ...fullForecast,
                Whole_forecast : {},
                errors : true,
                errorText : "error happened ${error}"
            })

        }
        }




    }


    return(<p>pöö</p>)
}


export default Forecast;