
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
    payment : number
    vat : number
    employer : string
    employee : string
    hours : number
    hours_all : number
}

interface Employee_data{
    [key? : string] : any;
    datetime? : Date
    hours_employee? : number
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