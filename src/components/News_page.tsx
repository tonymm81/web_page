import { Box, Button, Container, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import '../App.css'
import { useRef, useState } from "react";

function News_page (props:any){
    const news_api = process.env.NEWS_API_KEY
    const sortby : React.MutableRefObject<String> = useRef("");
    const search_word : React.MutableRefObject<String> = useRef("");
    const userInput_search : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const Chooce_country : React.MutableRefObject<HTMLInputElement | undefined | String> = useRef<HTMLInputElement>();
    const errors : React.MutableRefObject<String> = useRef("");
    const errors_country : React.MutableRefObject<String> = useRef("");
    const [country_codes, setCountry_codes] = useState([
        "FI",
        "SE",
        "DE",
        "NO",
        "GB",
        "EE",
        "US",
        "LT",
        "PL"
    ])
    const [cathegory, setCathegory] = useState(["Everything", "Top news"])

    if (props.headLiner === "News page"){

    }else{
        props.setHeadliner("News page")
        props.setAllowForecast(true)
    }



    return(
        <>
        <Container>
            <Typography variant="h3">Welcome to news page</Typography>

            <TextField
                variant="outlined"
                label="Give the keyword to search news"
                inputRef={search_word}
                fullWidth
                error={Boolean(errors.current)}
                helperText={errors.current}
            />
            <FormControl error={Boolean(errors_country.current)} fullWidth={true}>
                <InputLabel id="jobID">Choose country</InputLabel>
                    <Select
                        id="jobID"
                        label="Choose the job id" 
                        value={""}
                        fullWidth={true}
                        className='worktimeFields'
                        defaultValue=""
                        onChange={(e : SelectChangeEvent) => { Chooce_country.current = e.target.value }}
                    >
            {country_codes.map((num, idx) =>  {return <MenuItem value={num} key={idx}> {num}</MenuItem>})}
           
        </Select>
        <FormHelperText>{errors_country.current}</FormHelperText>
      </FormControl>

        </Container>
        </>
    )
    
}

export default News_page