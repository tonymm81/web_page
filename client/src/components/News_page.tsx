import { Backdrop, Button, CircularProgress, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, Link, List, ListItem, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography, Zoom } from "@mui/material"
import '../App.css'
import { useEffect, useRef, useState } from "react";
import DOMPurify from 'dompurify';

function News_page(props: any) { // here user cant search news from newsapi.org. Response gives news based on the top news, or everything
    // everything needs a keyword and datetime, top-news need only country code
    //const news_api = process.env.REACT_APP_API_KEY_NEWS
    //const cors_server = "'http://localhost:8080/cors', {mode:'cors'}"
    const [searchTime, setSearchTime] = useState<number>(0)
    const [searchBoolean, setSearchBoolean] = useState<boolean>(false)
    const news_api_permission: React.MutableRefObject<Boolean> = useRef(false);
    const total_result: React.MutableRefObject<number> = useRef(0);
    const [show_items, setShow_items] = useState<boolean>(true);
    const [backdrop_bl, setBackdrop_bl] = useState<boolean>(false);
    //const [timefrom, setTimefrom] = useState<Date>(new Date())
    const radiobutton_choose: React.MutableRefObject<String> = useRef("");
    const search_word: React.MutableRefObject<String> = useRef("");
    //const userInput_search : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    const [Chooce_country, setChoose_country] = useState<string>("");
    const errors: React.MutableRefObject<String> = useRef("");
    const errors_country: React.MutableRefObject<String> = useRef("");
    const [save_news_api, setSave_news_api] = useState<News_api_json>({ Whole_news_api: {} })
    const [newsSaved, setNewsSaved] = useState<New_api_needed[]>([])
    const [searchemptynews, setSearchemptynews] = useState<boolean>(false);
    const [searchCounterNews, setSearchCounterNews] = useState<number>(0)
    const [hideTextfield, setTextfield] = useState<boolean>(true)
    const [country_codes, setCountry_codes] = useState([
        "FI",
        "SE",
        "DE",
        "NO",
        "GB",
        "EE",
        "US",
        "LT",
        "PL",
        "AU"
    ])
    const [cathegory, setCathegory] = useState(["everything", "top-headlines"])

  

    const get_new_data_from_server = async (Chooce_country: string, search_word: string): Promise<any> => {
        let api_address = ''
        
        if (news_api_permission.current) {
            let permissionToGetNewSearch :boolean = false
            try{
                
                let url = `/api/news/newsTimerule?news_timestamp=${props.news_timestamp}&searchemptynews=${searchemptynews}&searchCounterNews=${searchCounterNews}`
                const responsePermission = await fetch(url, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } }) // get data from backend
                const responsePermission_json = await responsePermission.json()
                if (responsePermission.status === 200){
                    permissionToGetNewSearch = responsePermission_json.permissionTimerule[0]
                    setSearchTime(responsePermission_json.permissionTimerule[1])
                    props.setAllowForecast(false)
                }
            }
            catch(e){
                console.log("error to get timestamp", e)
            }
            try {
                if ((radiobutton_choose.current === "2") || (!permissionToGetNewSearch)) {//lets fetch the lastest search
                    api_address = `/api/news/news_saved`
                    radiobutton_choose.current = "2"
                }
                if ((radiobutton_choose.current === "1")&&(permissionToGetNewSearch)) { // Lets search everything based on search word
                    api_address = `/api/news/news?userchoose=0&cathegory=everything&searchword=${search_word}&news_timestamp=${props.news_timestamp}`
                }
                if ((radiobutton_choose.current === "0")&&(permissionToGetNewSearch)) { // Lets search top headlines from given country code
                    api_address = `/api/news/news?userchoose=1&cathegory=top-headlines&Chooce_country=${Chooce_country}&news_timestamp=${props.news_timestamp}`
                }
                //console.log(api_address)
                const connectionNews = await fetch(api_address, { method: "GET", headers: { 'Authorization': `Bearer ${props.tokenSecondary}` } })
                const apidatanews = await connectionNews.json();
                //console.log("apidata form", apidatanews[0])
                if (connectionNews.status === 200) {
                    setNewsSaved([...apidatanews[0]])
                    total_result.current = apidatanews[0].length
                    //setSearchTime(timeDifference)
                    setSearchBoolean(permissionToGetNewSearch)
                            
                }if (total_result.current > 0){  
                    setSearchemptynews(false)
                    setSearchCounterNews(0)
                    props.setNews_timestamp(new Date())
                    }
                if (connectionNews.status === 404){
                    setSearchemptynews(true)
                    setSearchCounterNews(searchCounterNews + 1)
                }
                    
                 else {
                    setSave_news_api({
                        Whole_news_api: {},
                        errors: true,
                        errorText: `Error happened : ${connectionNews.status}`
                    })
                }
            }

            catch (errors) {
                //console.log("api error", errors)
                setSave_news_api({
                    ...save_news_api,
                    Whole_news_api: {},
                    errors: true,
                    errorText: String(errors)
                })
            }
        }
        news_api_permission.current = false
        setBackdrop_bl(false)
    }

    const userInputField = (e: any): void => { //make here user input field what gets the apidata
        e?.preventDefault();
        if ((radiobutton_choose.current === "0" && Chooce_country === "") || (radiobutton_choose.current === "0" && Chooce_country === undefined)) {
            errors_country.current = "Please choose country"
        }
        else if ((radiobutton_choose.current === "1" && search_word.current === undefined) || (radiobutton_choose.current === "1" && search_word.current === "")) {
            errors.current = "Please give searc hword"
        } else {
            errors_country.current = ""
            errors.current = ""
            setNewsSaved([])
            news_api_permission.current = true
            setBackdrop_bl(true)
            get_new_data_from_server(Chooce_country, String(search_word.current))
        }
    }

    const show_item_radiobutton = (rb: any): void => { // not working the way i want
        radiobutton_choose.current = rb

        if (radiobutton_choose.current === "0") {
            setShow_items(false)
            setTextfield(true)
        }
        if (radiobutton_choose.current === "1") {
            setShow_items(true)
            setTextfield(false)
        }
        if (radiobutton_choose.current === "2") {
            setShow_items(true)
            setTextfield(true)
        }
    }

    const text_field_handler = (ee: React.ChangeEvent<HTMLInputElement>): void => {
        search_word.current = DOMPurify.sanitize(ee.target.value);

    }

    useEffect(() => {
        radiobutton_choose.current = "2"
        news_api_permission.current = true
        get_new_data_from_server(Chooce_country, String(search_word.current))
        if (props.headLiner === "News page") {
        } else {
            props.setHeadliner("News page")
            localStorage.setItem("last_path", "/News_page")
            props.setAllowForecast(true)
        }

    }, [])

    //console.log("news image", newsSaved[0].ulr_image)

    return (
        <>
            <Container className="news_page_cont">

                <Typography variant="h3">Welcome to news page</Typography>
                <Typography variant="body1">You can search only one search per 3 minutes. This is free api. time from earlier search {(searchTime / 60000).toFixed(2)} min.</Typography>
                {!searchBoolean ? <Typography variant="body1">Now viewing old search</Typography> : <></>}
                <form onSubmit={userInputField}>

                    <TextField
                        variant="outlined"
                        label="Give the keyword to search news"
                        onChange={text_field_handler}

                        fullWidth
                        error={Boolean(errors.current)}
                        helperText={errors.current}
                        disabled={hideTextfield}
                         sx={{
                    '& .MuiInputBase-input': {
                        backgroundColor: 'gray',
                    }, '& + &': {
                        marginTop: '1rem',
                    },
                }}
                    />


                    <Typography>{errors_country.current}</Typography>
                    <FormControl error={Boolean(errors_country.current)} fullWidth={true}>
                        <InputLabel id="countryID">Choose country code</InputLabel>
                        <Select
                            id="coyntryID"
                            label="Choose the country id"

                            value={Chooce_country}
                            fullWidth={true}
                            className='worktimeFields'
                            defaultValue={"Select country id here"}
                            disabled={show_items}
                            onChange={(e: SelectChangeEvent) => { setChoose_country(e.target.value) }}
                        >
                            {country_codes.map((num, idx) => { return <MenuItem value={num} key={idx}> {num}</MenuItem> })}

                        </Select>
                        <FormHelperText>{errors_country.current}</FormHelperText>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="info"
                        type="submit"

                    >Search!</Button>
                </form>
                <FormControl>
                    <Typography variant="h5">Select the news cathegory</Typography>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="2"
                        name="radio-buttons-group"
                        onChange={(rb: any) => { show_item_radiobutton(rb.target.value) }}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Top news (must choose country!)" />
                        <FormControlLabel value="1" control={<Radio />} label="everything (give search word!)" />
                        <FormControlLabel value="2" control={<Radio />} label="the result of the last search" />

                    </RadioGroup>
                </FormControl>
                <Typography variant="h5"> Total results: {total_result.current}</Typography>
                <List>
                    {newsSaved.map((item, index) => {
                        return ( 
                           item.tnewsTitle === "[Removed]" ?
                         <></> :
                         <Zoom in={!backdrop_bl} key={index} style={{ transitionDelay: !backdrop_bl ? `${index === 0 ? index : index+1}00ms` : '0ms' }}>
                            <ListItem key={index} className="listViewItemsNews">
                                <Stack direction="column" spacing={2} key={index}>
                                <ListItemText key={index}>
                                    <Typography variant="h6">{`${item.tnewsTitle}`}</Typography>
                                    <Stack direction="row" spacing={2} key={index}>
                                    <Typography variant="body1">{`Time: ${item.puplishDate} `}</Typography>
                                    <Typography variant="body2">{` Author: ${item.author} `}</Typography>
                                    <Typography variant="body2">{` Source: ${item.source} `}</Typography>
                                    <Link className="Links" target="_blank" rel='noopener' variant="button" href={item.url}>link to site</Link>
                                    </Stack>
                                    </ListItemText>
                                {item.description ?
                                    <ListItemText key={`key${index}`}>
                                        <Typography variant="body2">{" Description: "} {item.description}</Typography>
                                        <Typography variant="body2">{" Content "}{item.content}</Typography>
                                        <ListItemIcon > <img className="news_image" src={item.ulr_image/*this has to move function with error handling */} alt={String(index)} /></ListItemIcon>
                                    </ListItemText>
                                    :
                                    <></>
                                }
                                </Stack>
                            </ListItem> 
                            </Zoom>
                        ); 
                    })} 
                </List>
                <Backdrop open={backdrop_bl}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </>
    )

}

export default News_page;