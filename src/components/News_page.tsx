import { Box, Button, Container, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import '../App.css'
import { useRef, useState } from "react";

function News_page (props:any){
    const news_api = process.env.REACT_APP_API_KEY_NEWS
    const cors_server = "'http://localhost:8080/cors', {mode:'cors'}"
    const news_api_permission :  React.MutableRefObject<Boolean> = useRef(false);
    const sortby : React.MutableRefObject<String> = useRef("");
    const search_word : React.MutableRefObject<String> = useRef("");
    const userInput_search : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [Chooce_country, setChoose_country ] = useState<string>("");
    const errors : React.MutableRefObject<String> = useRef("");
    const errors_country : React.MutableRefObject<String> = useRef("");
    const [save_news_api, setSave_news_api] = useState<News_api_json>({Whole_news_api : {}})
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
    const [cathegory, setCathegory] = useState(["everything -G", "top-headlines -G"])

    if (props.headLiner === "News page"){
    }else{
        props.setHeadliner("News page")
        props.setAllowForecast(true)
    }

    const get_new_data = async (Chooce_country : string, search_word : any) : Promise<any> => { //here we get apicall and save the data
        if (news_api_permission.current){
            try{ // in apicall we have to define values, what give the datetime to this search and cathegory also
                const connectionNews = await fetch(`https://newsapi.org/v2/${cathegory[0]}?q=${search_word.current}&from=2023-04-10&sortBy=popularity&apiKey=${news_api}`, 
                //const connectionNews = await fetch('http://localhost:8080/cors', {mode:'cors'})// this is working now.
                {
                   method: 'GET',
                   mode:'cors',
                   
                    headers: {
                    accept: 'application/json',
                    cors:cors_server,
                    
                    },
            }); //https://xamkbit.azurewebsites.net/saaennuste/${userchoose}
                const apidatanews = await connectionNews.json();
                //it gives the cors error 
                if(apidatanews['cod'] === '404'){
                    setSave_news_api({
                        ...save_news_api,
                        Whole_news_api : {},
                        errors : true,
                        errorText : "news not found"
                    })
                    console.log("nooot found", save_news_api.errorText)
                }
                setSave_news_api({
                    ...save_news_api,
                    Whole_news_api : apidatanews,
                    errors : false,
                    errorText : ""
                })

            }catch (error){
                setSave_news_api({
                    ...save_news_api,
                    Whole_news_api : {},
                    errors : true,
                    errorText : String(error)
                })
            }
        }
        news_api_permission.current = false

    }
    const userInputField = (e : any) : void =>{ //make here user input field what gets the apidata
        e?.preventDefault();
        news_api_permission.current=true
        console.log("pöö", search_word.current)
        get_new_data(Chooce_country, search_word)
        console.log(save_news_api.Whole_news_api)

    }

    const text_field_handler = (ee : React.ChangeEvent<HTMLInputElement>) : void =>{
        search_word.current = ee.target.value
       
    }

    return(
        <>
        <Container>
            <Typography variant="h3">Welcome to news page</Typography>
            <form onSubmit={userInputField}>
            <TextField
                variant="outlined"
                label="Give the keyword to search news"
                onChange={text_field_handler}
                fullWidth
                error={Boolean(errors.current)}
                helperText={errors.current}
            />
            <Button
            variant="contained"
            color="inherit"
            fullWidth
            type="submit"
            
            >Search!</Button>
            </form>
            <FormControl error={Boolean(errors_country.current)} fullWidth={true}>
                <InputLabel id="countryID">Choose country code</InputLabel>
                    <Select
                        id="coyntryID"
                        label="Choose the country id" 
                        
                        value={Chooce_country}
                        fullWidth={true}
                        className='worktimeFields'
                        defaultValue={"Select country id here"}
                        
                        onChange={(e : SelectChangeEvent) => { setChoose_country(e.target.value) }}
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