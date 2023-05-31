//here is my applications interfaces
interface Forecast_index{
    [key:string ] :  number|any
}

interface Forecast_json {
    Whole_forecast : Forecast_index
    errors?: boolean
    errorText? : string

}

interface Forecast_needed{
    [key : number] : number |any
    temp_min : number
    temp_max : number
    wind : number
    timeStamp : Date
    icon : string
    shorDescription : string
    visibility : number

}

interface Employer_data{
    [key? : string] : any;
    payment? : number |string
    vat? : number |string
    employee? : string
    workIDS? : string
}

interface Employee_data{
    [key? : string] : any;
    datetime? : Date
    hours_employee? : number | string
    description? : string
    jobID? : string
    employeeName? : string
}

interface LogINuser{
    [key? : string] : any;
    username? : string
    passwd? : string
    error? :string
}

interface News_api_index{
    [key:string ] :  number|any
}

interface News_api_json {
    Whole_news_api : News_api_index
    errors?: boolean
    errorText? : string

}

interface New_api_needed {
    [key : number] : number |any
    description? : string
    content? : string
    author : string
    puplishDate : string
    source : string
    title : string
    url : string
    ulr_image? : string
    
}