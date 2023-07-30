//Add the API on the array list 
let waetherLocation =[];
let weatherCurrent  =[];
let weatherForecast =[];
//Global Virable
//Search fields ...
let textLocationSearch  = document.querySelector('.textFind');
let btnLocationSeach    = document.querySelector('.btnFind');
//Forcasting Container ...
let forecastContainer   = document.querySelector('.forecastContainer');

//let country = 'Giza';
//For check on the Global Virables
// console.log(textLocationSearch);
// console.log(btnLocationSeach);
// console.log(forecastContainer);

// A-the first Solution ...
//1-Get New Object from XMLHttpRequest
//let weatherAPI = new XMLHttpRequest();
//2-Open URL of API (Method, Base URL)
//weatherAPI.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=5042846a00784a1ca45195842220906&q=${country}&days=3&aqi=no&alerts=yes`);

//Now we need to check and follow up (ReadyState & Status) 
//readyState:
// Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready
//status:
// Returns the status-number of a request
// 200: "OK" ==> it's Done
// 403: "Forbidden" ==> it's need authentication !!
// 404: "Not Found" ==> it's not found URL API
// For a complete list go to the Http Messages Reference

// //3-Send URL API
// weatherAPI.send();
// //4-Follow readState of sending API of Weather
// weatherAPI.addEventListener('readystatechange',function() {
//     //You can be use "this.readyState" or "weatherAPI.readyState"
//     if(this.readyState == 4 && this.status == 200){
//         console.log('request finished and response is ready');
//         console.log(weatherAPI.response);
//         waetherLocation = await JSON.parse(weatherAPI.response).location;
//         //console.log(waetherLocation);
//         weatherCurrent = await JSON.parse(weatherAPI.response).current;
//         //console.log(weatherCurrent);
//         weatherForecast = await JSON.parse(weatherAPI.response).forecast;
//         //console.log(weatherForecast);
//         displayWeather();
//     }
//     else{
//         country = 'Giza';
//         createObjs();
//     }
// });

async function search(country = 'giza'){
    let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5042846a00784a1ca45195842220906&q=${country}&days=3&aqi=no&alerts=yes`);
    //console.log(api);

    if(api.ok && api.status == 200){
        let weatherAPI = await api.json();
        // console.log('request finished and response is ready');
        //console.log(weatherAPI);
        waetherLocation = weatherAPI.location;
        console.log(waetherLocation);
        weatherCurrent = weatherAPI.current;
        console.log(weatherCurrent);
        weatherForecast = weatherAPI.forecast;
        console.log(weatherForecast);
        displayWeather();
    }else if(!api.ok || api.status == 400){
        search('giza');
    }


}
//Calling search function
search();

//Display items:
function displayWeather(){
    let cartona =`
    <div class="forecastToday  col-md-4 ">
    <div class="card my-3">
        <div class="card-header d-flex justify-content-between align-items-center text-muted bg-dark w-100">
            <div class="today">Today</div>
            <div class="date">${weatherCurrent.last_updated}</div>
        </div>

        <div class="card-body">
            <div class="location fw-bolder mt-3 text-muted">
                <span>Country: ${waetherLocation.country}, City: ${waetherLocation.name}</span>
            </div>
            <div class="currentDegree d-flex justify-content-between align-items-center">
                <div class="h2">
                    <span>${weatherCurrent.temp_c}<sup>o</sup>C</span>
                </div>
                <div class="tempRange mt-3 fw-bold d-flex justify-content-between flex-column">
                    <div class="maxTemp">
                        <i class="fa-solid fa-temperature-arrow-up"></i>
                        <span class="text-muted"> ${weatherForecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</span>
                    </div>
                    <div class="minTemp">
                        <i class="fa-solid fa-temperature-arrow-down"></i>
                        <span class="text-muted"> ${weatherForecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</span>
                    </div>
                </div>
                <div class="foecastIcon">
                    <img src="https:${weatherCurrent.condition.icon}" alt="Icon" width="90">
                </div>
            </div>
            <div class="fw-bold text-primary">${weatherCurrent.condition.text}</div>
        </div>

        <div class="card-footer">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-umberella.png" alt="">
                        ${weatherCurrent.humidity}%
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-wind.png" alt="">
                        ${weatherCurrent.wind_kph}km/h
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-compass.png" alt="">
                        ${weatherCurrent.wind_dir}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="forecastTomorrow  col-md-4 ">
    <div class="card my-3">
        <div class="card-header d-flex justify-content-between align-items-center text-muted bg-dark w-100">
            <div class="today">Tomorrow</div>
            <div class="date">${weatherForecast.forecastday[1].date}</div>
        </div>

        <div class="card-body">
            <div class="location fw-bolder mt-3 text-muted">
            <span>Country: ${waetherLocation.country}, City: ${waetherLocation.name}</span>
            </div>
            <div class="degree d-flex justify-content-between align-items-center">
            <div class="tempRange mt-3 fw-bold d-flex justify-content-between flex-column">
                <div class="maxTemp">
                    <i class="fa-solid fa-temperature-arrow-up"></i>
                    <span class="text-muted"> ${weatherForecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</span>
                </div>
                <div class="minTemp">
                    <i class="fa-solid fa-temperature-arrow-down"></i>
                    <span class="text-muted"> ${weatherForecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</span>
                </div>
            </div>
                <div class="foecastIcon">
                    <img src="https:${weatherForecast.forecastday[1].day.condition.icon}" alt="Icon" width="90">
                </div>
            </div>
            <div class="fw-bold text-primary">${weatherForecast.forecastday[1].day.condition.text}</div>
        </div>

        <div class="card-footer">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-umberella.png" alt="">
                        ${weatherForecast.forecastday[1].day.avghumidity}%
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-wind.png" alt="">
                        ${weatherForecast.forecastday[1].day.maxwind_kph}km/h
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <!--<img src="./assets/img/icons/icon-compass.png" alt="">
                        East>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="forecastAfterTomorrow col-md-4 ">
    <div class="card my-3">
        <div class="card-header d-flex justify-content-between align-items-center text-muted bg-dark w-100">
            <div class="today">After Tomorrow</div>
            <div class="date">${weatherForecast.forecastday[2].date}</div>
        </div>

        <div class="card-body">
            <div class="location fw-bolder mt-3 text-muted">
                <span>Country: ${waetherLocation.country}, City: ${waetherLocation.name}</span>
            </div>
            <div class="degree d-flex justify-content-between align-items-center">
                <div class="tempRange mt-3 fw-bold d-flex justify-content-between flex-column">
                    <div class="maxTemp">
                        <i class="fa-solid fa-temperature-arrow-up"></i>
                        <span class="text-muted"> ${weatherForecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</span>
                    </div>
                    <div class="minTemp">
                        <i class="fa-solid fa-temperature-arrow-down"></i>
                        <span class="text-muted"> ${weatherForecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</span>
                    </div>
                </div>
                <div class="foecastIcon">
                    <img src="https:${weatherForecast.forecastday[2].day.condition.icon}" alt="Icon" width="90">
                </div>
            </div>
            <div class="fw-bold text-primary">${weatherForecast.forecastday[2].day.condition.text}</div>
        </div>

        <div class="card-footer">
            <div class="row">
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-umberella.png" alt="">
                        ${weatherForecast.forecastday[2].day.avghumidity}%
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <img src="./assets/img/icons/icon-wind.png" alt="">
                        ${weatherForecast.forecastday[2].day.maxwind_kph}km/h
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <!--<img src="./assets/img/icons/icon-compass.png" alt="">
                        East>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    forecastContainer.innerHTML=cartona
}

//Search country
btnLocationSeach.addEventListener('click',function(){
    console.log(textLocationSearch.value)
    if(textLocationSearch.value != ''){
        search(textLocationSearch.value);
        reset();
    }
    
});

//reset search field
function reset(){
    textLocationSearch.value = '';
}

// const date = new Date();
// date.setDate(date.getDate() + 30);
// console.log(date)