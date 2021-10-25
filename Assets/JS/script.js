// Openweather API Key //
const apiKey = "e3d09716ea5373558448ddf9e275cdd3";

var inputValue = document.querySelector(".inputValue");

var previousSearch = JSON.parse(localStorage.getItem("searchHistory")) || []
displaySearchHistory()           
$("#submitButton").on("click", function (event) {
    event.preventDefault()
    let city = $("#inputValue").val();
    console.log(city)
    currentForecast(city)
    fiveDayForecast(city)})

function currentForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial",
        type: "GET"})
        .then(function (apiResponse){
            console.log(apiResponse)
        let weatherIcon = `https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}.png`;

        $("#currentForecast").html(`
            <h2>${apiResponse.name}, ${apiResponse.sys.country} <img src=${weatherIcon} height="70px"></h2>
            <p>Condition: ${apiResponse.weather[0].description}</p>
            <p>Temperature: ${apiResponse.main.temp}&#176;F</p>
            <p>Humidity: ${apiResponse.main.humidity}%</p>
            <p>Wind Speed: ${apiResponse.wind.speed} mph</p>`)
        previousSearch.push(city)
        localStorage.setItem("searchHistory", JSON.stringify(previousSearch)) 
            displaySearchHistory()
        $("#clear").click(function() {
            localStorage.clear('searchHistory');
        });
    })};
        
        
function fiveDayForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial",
        type: "GET"})
        .then(function (apiResponse){
            console.log(apiResponse)
            for (i=0; i<apiResponse.list.length; i=i+8){
            $("#fiveDayForecast").append(`<div class="col-md">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <p>Condition: ${apiResponse.list[i].weather[0].description}</p>
                    <p>Temperature: ${apiResponse.list[i].main.temp}</p>
                    <p>Humidity: ${apiResponse.list[i].main.humidity}</p>
                    <p>Wind Speed: ${apiResponse.list[i].wind.speed}</p>
                </div>
            </div>
        </div>`)
            }})};

function displaySearchHistory() {
    var HTMLstring = ""
    for (i=0; i<previousSearch.length; i++){
        HTMLstring += `<button class="search" >${previousSearch[i]}</button>`
    }
    $("#previousSearches").html(HTMLstring)
}