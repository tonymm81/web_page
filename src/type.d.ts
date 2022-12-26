
interface Forecast_index{
    [key:string] : number 
}

interface Forecast_json{
    Whole_forecast : {}
    day_forecast? : Forecast_index
    errors?: boolean
    errorText? : string

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