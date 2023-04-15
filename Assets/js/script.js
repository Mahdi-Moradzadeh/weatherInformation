const cityName = document.getElementById("searchBox");
const searchEl = document.getElementById("searchBtn");
const cityInfoName = document.getElementById("cityNameSearched");

searchEl.addEventListener("click", function(event){
    event.preventDefault();
    cityInfoName.textContent = "The weather News of " + cityName.value + ":";

});