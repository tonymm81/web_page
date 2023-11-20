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
    timestamp : Date
    icon : string
    shorDescription : string
    visibility : number
    town_or_city : string
}

interface Employer_data{
    [key? : string] : any;
    payment? : number |string
    vat? : number |string
    employee_name? : string
    workIDS? : string
}

interface Employee_data{
    [key? : string] : any;
    datetime? : Date
    hours_employee? : number 
    description? : string
    jobID? : string
    employeeName? : string
    employee_worktime_id? : number
}

interface LogINuser{
    [key? : string] : any;
    username? : string
    passwd? : string
    error? :string
    who_is_logging? : string
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
    puplishDate : Date
    source : string
    tnewsTitle : string
    url : string
    ulr_image? : string
    
}

interface fetchSettings {
    method : string
    headers? : any
    body? : string
  }
  