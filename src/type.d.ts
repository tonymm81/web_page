
interface Forecast_index{
    [key:string] : number 
}

interface Forecast_json{
    Whole_forecast : {}
    day_forecast? : Forecast_index
    errors?: boolean
    errorText? : string

}

interface Working_time{
    payment : number
    vat : number
    employer : string
    employee : string
    hours : number
    hours_all : number
}

interface Employee_data{
    datetime : Date
    hours_employee : number
    description : string
    jobID : number
    employeeName : string
}
