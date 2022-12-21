
interface Forecast_index{
    [key:string] : number
}

interface Forecast{
    Whole_forecast : Forecast_index
    day_forecast : Forecast_index

}

interface Working_time{
    payment : number
    vat : number
    employer : string
    employee : string
    hours : number
    hours_all : number
}