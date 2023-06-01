import { Box, Button, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import '../App.css'
import { useEffect, useRef, useState } from "react";
import { format, differenceInDays } from 'date-fns';

function News_page (props:any){
    const news_api = process.env.REACT_APP_API_KEY_NEWS
    const cors_server = "'http://localhost:8080/cors', {mode:'cors'}"
    const news_api_permission :  React.MutableRefObject<Boolean> = useRef(false);
    const [show_items, setShow_items ] = useState<boolean>(false);
    const [timefrom, setTimefrom] = useState<Date>(new Date())
    const radiobutton_choose : React.MutableRefObject<String> = useRef("");
    const search_word : React.MutableRefObject<String> = useRef("");
    const userInput_search : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [Chooce_country, setChoose_country ] = useState<string>("");
    const errors : React.MutableRefObject<String> = useRef("");
    const errors_country : React.MutableRefObject<String> = useRef("");
    const [save_news_api, setSave_news_api] = useState<News_api_json>({Whole_news_api : {}})
    const [newsSaved, setNewsSaved] = useState<New_api_needed[]>([])
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
    const [cathegory, setCathegory] = useState(["everything", "top-headlines"])

    if (props.headLiner === "News page"){
    }else{
        props.setHeadliner("News page")
        props.setAllowForecast(true)
    }

    const get_new_data = async (Chooce_country : string, search_word : any) : Promise<any> => { //here we get apicall and save the data
        const connectionNews ={}//:JSON = {} as JSON
        let api_address = ''
        if (news_api_permission.current){
            try{ // in apicall we have to define values, what give the datetime to this search and cathegory also
                if (radiobutton_choose.current === "1"){
                  api_address = `https://newsapi.org/v2/${cathegory[0]}?q=${search_word.current}&to=${format(timefrom, "Y-M-d")}&sortBy=popularity&apiKey=${news_api}`
               
                }
                if (radiobutton_choose.current === "0"){
                   
                   api_address = `https://newsapi.org/v2/${cathegory[1]}?country=${Chooce_country}&apiKey=${news_api}`
           
                }
                const connectionNews = await fetch(api_address, 
                    //const connectionNews = await fetch('http://localhost:8080/cors', {mode:'cors'})// this is working now.
                    {
                    method: 'GET',
                    mode:'cors',
                   
                    headers: {
                    accept: 'application/json',
                    },
                    });

                const apidatanews = await connectionNews.json(); 
                //console.log('testin again',apidatanews['articles'])
                if(apidatanews['cod'] === '404'){
                    setSave_news_api({
                        ...save_news_api,
                       Whole_news_api : {},
                       errors : true,
                        errorText : "news not found"
                    })
                    
                }else {
                setSave_news_api({
                    ...save_news_api,
                    Whole_news_api : apidatanews,
                    errors : false,
                    errorText : ""
                })
                }

            }catch (error){
                console.log("api error", error)
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
        setNewsSaved([])
        news_api_permission.current=true
        get_new_data(Chooce_country, search_word)

       
        //console.log(save_news_api.Whole_news_api)
        //console.log(`testing ${save_news_api.Whole_news_api['articles']}`)
        //save_news_data()
        

    }
    const show_item_radiobutton = (rb:any) :void =>{ // not working the way i want
        radiobutton_choose.current = rb
        console.log("here in rb", rb, radiobutton_choose.current)
        if (radiobutton_choose.current === "0"){
            setShow_items(true)
        }
        else{
            setShow_items(false)
        }
        console.log(show_items)
    }

    const text_field_handler = (ee : React.ChangeEvent<HTMLInputElement>) : void =>{
        search_word.current = ee.target.value
       
    }

    const save_news_data = () : void =>{
        let TempValue : New_api_needed[] = [...newsSaved]
        let i = 0
        try {
            let jsonlength = save_news_api.Whole_news_api['articles'].length
            for (i = 0; i < jsonlength;){
                TempValue[i] = {...TempValue[i], 
                                author : save_news_api.Whole_news_api['articles'][i]['author'],
                                puplishDate : save_news_api.Whole_news_api['articles'][i]['publishedAt'],
                                source : save_news_api.Whole_news_api['articles'][i]['source']['name'],
                                title : save_news_api.Whole_news_api['articles'][i]['title'],
                                url : save_news_api.Whole_news_api['articles'][i]['url']
                            }
                if (radiobutton_choose.current === "1"){
                    TempValue[i] = {...TempValue[i], description : save_news_api.Whole_news_api['articles'][i]['description'],
                                    content : save_news_api.Whole_news_api['articles'][i]['content'],
                                    ulr_image : save_news_api.Whole_news_api['articles'][i]['urlToImage']                  
                }
                }
                i = i + 1
            }
            if ( newsSaved.length === 0){
                setNewsSaved([...TempValue])
                //console.log(`saved ${TempValue}`)
                TempValue = []

                // make here save permission
            }
        }
        catch(error){
            console.log(`ei ${error}`)
        }

    
    }
    
    useEffect(() =>{
        setTimeout(() => save_news_data(), 1000)
        console.log("interface changed")
    }, [save_news_api.Whole_news_api])
    console.log(save_news_api.Whole_news_api)
    
   

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
                disabled={show_items}
            />
            
           
            
            <FormControl error={Boolean(errors_country.current)} fullWidth={true}>
                <InputLabel id="countryID">Choose country code</InputLabel>
                    <Select
                        id="coyntryID"
                        label="Choose the country id" 
                        
                        value={Chooce_country}
                        fullWidth={true}
                        className='worktimeFields'
                        defaultValue={"Select country id here"}
                        disabled ={!show_items}
                        onChange={(e : SelectChangeEvent) => { setChoose_country(e.target.value) }}
                    >
            {country_codes.map((num, idx) =>  {return <MenuItem value={num} key={idx}> {num}</MenuItem>})}
           
        </Select>
        <FormHelperText>{errors_country.current}</FormHelperText>
      </FormControl>
      <Button
            variant="contained"
            color="inherit"
            fullWidth
            type="submit"
            
            >Search!</Button>
      </form>
      <FormControl>
    <Typography variant="h5">Select the news cathegory</Typography>
  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="1"
    name="radio-buttons-group"
    onChange={(rb:any)=>{show_item_radiobutton(rb.target.value)}}
  >
    <FormControlLabel value="0" control={<Radio />} label="Top news (must choose vountry!)" />
    <FormControlLabel value="1" control={<Radio />} label="everything (give search word!)" />
   
  </RadioGroup>
</FormControl>
        <List>
            {newsSaved.map((item, index)=> {
                return (
                    <ListItem key={index} className="listViewItems">
                        <ListItemText>
                        <Typography variant="h6">{`${item.title}`}</Typography>
                        {`Time: ${item.puplishDate} `}
                        {` Author: ${item.author} `}
                        {` Source: ${item.source} `}
                        <Link className="Links" >{item.url}</Link></ListItemText>
                        {item.description! ?
                        <ListItemText>
                          {" Description: "} {item.description}
                           {" Content "}{item.content}
                        </ListItemText>
                        :
                        <></>
                        }
                    </ListItem>
                );
            })}
        </List>

        </Container>
        </>
    )
    
}

export default News_page;