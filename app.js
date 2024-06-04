let yourWeather = document.querySelector('.your-weather');
let searchWeather = document.querySelector('.search-weather');
let content = document.querySelector('.content');
let searching = document.querySelector('.searching');
let locationBtn = document.querySelector('.locationBtn');
let grantLocation = document.querySelector('.grant-location');
let loadingGif = document.querySelector('.loading-gif');
let search = document.querySelector('.search');
let searchIcon = document.querySelector('.searchIcon-div');
let climate = document.querySelector('.climate');
let city_name = '';
let check = 0;
var lat = 0;
var longi = 0;
const API_key = "168771779c71f3d64106d8a88376808a";
let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
let windspeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');
let clouds = document.querySelector('.clouds');
searchWeather.addEventListener('click', ()=>{
    searchWeather.classList.add('active');
    yourWeather.classList.remove('active');
    content.classList.add('content-gayab');
    grantLocation.classList.add('grant-location-gayab');
    searching.classList.add('searching-aaya');
});
yourWeather.addEventListener('click',()=>{
    searchWeather.classList.remove('active');
    searching.classList.remove('searching-aaya');
    yourWeather.classList.add('active');
    if(check==1){
        handleLocationBtn();
    }
    if(check==0){
        grantLocation.classList.remove('grant-location-gayab');
    }
});
locationBtn.addEventListener('click',handleLocationBtn);
async function handleLocationBtn() {
    check=1;
    await new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            longi = position.coords.longitude;
            resolve();
        }, (error)=>{
            reject(error);
        });
    });
    console.log(lat);
    console.log(longi);
    grantLocation.classList.add('grant-location-gayab');
    loadingGif.classList.add('loading-gif-aaya');
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_key}&units=metric`);
    const answer = await response.json();
    console.log(answer);
    loadingGif.classList.remove('loading-gif-aaya');
    city.innerText = answer.name;
    temp.innerHTML = `${answer.main.temp} &deg;C`;
    humidity.innerText = answer.main.humidity + '%';
    windspeed.innerText = answer.wind.speed + ' m/sec';
    clouds.innerText = answer.clouds.all + '%';
    climate.innerText = answer.weather[0].main;
    content.classList.remove('content-gayab');
}
search.addEventListener('keydown', (event)=>{
    if(event.key ==='Enter'){
        handleCustomWeather();
    }
    else{
        return;
    }
});
searchIcon.addEventListener('click', handleCustomWeather);
async function handleCustomWeather(event) {
    if(search.value==''){
        return;
    }
    city_name = search.value;
    loadingGif.classList.add('loading-gif-aaya');
    const resolve = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
    const answer = await resolve.json();
    console.log(answer);
    loadingGif.classList.remove('loading-gif-aaya');
    city.innerText = answer.name;
    temp.innerHTML = `${answer.main.temp} &deg;C`;
    humidity.innerText = answer.main.humidity + '%';
    windspeed.innerText = answer.wind.speed + ' m/sec';
    clouds.innerText = answer.clouds.all + '%';
    climate.innerText = answer.weather[0].main;
    content.classList.remove('content-gayab');
}

