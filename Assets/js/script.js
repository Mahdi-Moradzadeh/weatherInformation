//text inputs
const cityName = document.getElementById("searchBox");
const cityInfoName = document.getElementById("cityNameSearched");
//elements
const searchEl = document.getElementById("searchBtn");
const lastSearchEl = document.getElementById("lastSearch");
//btn assignment
const clearLocalBtn = document.getElementById("clearBtn");
const reloadBtn = document.getElementById("reloadBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
//other variables
let correctName;

searchEl.addEventListener("click", handleSearch); 
cityName.addEventListener("keydown", function(event){
    if (event.key == "Enter")
        handleSearch(event);
}); 

function prevDefaultPropagation (event){
    event.stopPropagation();
    event.preventDefault();
}

function handleSearch (event){
    let cityNameInput = nameCorrection(event);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&appid=75fe93327ad0502e94906f107fb25d7c`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        updateCityUI(response);
    })
}
//this is where to use the keys and values
function updateCityUI (data){
    console.log(data);
    console.log(data.list[0].dt_txt);
    for(let i = 0; i <= 4; i++)
    elementCreater(data, i);

}

// Search Engine
function nameCorrection(event){
    prevDefaultPropagation(event);
    
    // checking and correction inpuut case sensitivity
    if (cityName.value === '')
        cityInfoName.textContent = "City Information will be displayed here: ";
    else{
        correctName = cityName.value.split('');
        correctName[0] = correctName[0].toUpperCase();
        for (let i = 1; i < correctName.length; i++){
            if (correctName[i] !== ' ' && correctName[i] !== '-')
            correctName[i] = correctName[i].toLowerCase();
            else{
                i++;
                if(i >= correctName.length)
                    break;
                correctName[i] = correctName[i].toUpperCase();
            }
        }
        correctName = correctName.join('');
        cityInfoName.innerHTML = "The weather News of " + correctName + ":";

        if (localStorage.getItem("savedLocation"))
            lastSearchEl.innerHTML += `${localStorage.getItem("savedLocation")}<br>`;
        localStorage.setItem("savedLocation", correctName);
        
    }
    cityName.value = '';
    return correctName;
}

//Clear Local Storage
clearLocalBtn.addEventListener("click", function(event){
    prevDefaultPropagation(event);
    localStorage.clear();
    lastSearchEl.innerHTML = '';
});
//reload button
reloadBtn.addEventListener("click", function(event){
    prevDefaultPropagation(event);
    location.reload();
});

function elementCreater (data, dayCounter){
    //creating the containers and structure of one day schedule
    const weatherContainerEl = document.createElement("div");
    const dayContainerEl = document.createElement("span");
    const dateInfoEl = document.createElement("div");
    const weatherIMG = document.createElement("img");
    const tempDayEl = document.createElement("div");

    // setting attributes of the elements
    weatherIMG.setAttribute("src", `http://openweathermap.org/img/w/${data.list[dayCounter].weather[0].icon}.png`);
    dateInfoEl.setAttribute("class", "mediumTitle");
    weatherContainerEl.setAttribute("class", "daySeparator");
    weatherDisplay.setAttribute("class", "weatherContainer");
    

    //appending Children
    weatherDisplay.appendChild(weatherContainerEl);
    weatherContainerEl.appendChild(dayContainerEl);
    weatherContainerEl.appendChild(dateInfoEl);
    weatherContainerEl.appendChild(weatherIMG);
    weatherContainerEl.appendChild(tempDayEl);

    //writing in the elements
    
    dateInfoEl.innerHTML = data.list[dayCounter].dt_txt;



}