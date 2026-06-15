let search = document.querySelector("#search");
let city = document.querySelector("#city");
let region = document.querySelector("#region");
let img = document.querySelector("#img");
let temp = document.querySelector("#temperature");
let show_info = document.querySelector("#show-info");
let pre = document.querySelector("#pre");
let wind = document.querySelector("#wind");
let humdity = document.querySelector("#humidity");
let save = document.querySelector("#saved");
let box = document.querySelector(".box");
let li = document.querySelectorAll("li");

async function whehter_data(targetcity) {
    try {

        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3476a24543b54aa495064302261506&q=${targetcity}&days=7&aqi=no`);
        let rawdata = await response.json();
        console.log(rawdata);

        let cityName = rawdata.location.name;
        let regionName = rawdata.location.region;

        if (cityName === regionName) {
            city.textContent = cityName;
            region.textContent = "";
        } else {
            city.textContent = cityName;
            region.textContent = regionName;
        }


        temp.textContent = rawdata.current.temp_c;
        show_info.textContent = rawdata.current.condition.text;
        humdity.textContent = rawdata.current.humidity;
        wind.textContent = rawdata.current.wind_kph;
        pre.textContent = rawdata.current.precip_mm;
        img.src = `https:${rawdata.current.condition.icon}`;

        let forecast = rawdata.forecast.forecastday;
        let week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        // Loop through each <li> element one by one using its index (0 to 6)
       li.forEach((item,index)=>{
          if(forecast[index]){
            let info = forecast[index].day.avgtemp_c;
            item.textContent = `${week[index]}:${info}°C`
          }
       });


    } catch (error) {
        console.error("Error fetching weather data:", error);

    }

}

function searchCity() {
    search.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {

            event.preventDefault();
            let usercity = search.value;
            whehter_data(usercity);
            search.value = "";
        }
    });

}


function savedCity() {
    save.addEventListener("click", function () {
        box.style.display = "flex";

        if (city.textContent.trim() !== "") {

            let currentDisplayedCity = city.textContent.trim();

            // 2. Create the list item element
            let span = document.createElement("span");
            span.classList.add("saved-item");

            // 3. CHANGE HERE: Set the visual text label on screen for the user
            span.textContent = "City Name: " + currentDisplayedCity + " ";

            // 4. Create the 'X' delete icon element
            let i = document.createElement("i");
            i.classList.add("i-saved");
            i.classList.add("fa-solid", "fa-xmark", "close-icon");

            // 5. Append the icon element into the span cleanly
            span.appendChild(i);

            // 6. Inject the finished span pill into your container box
            box.appendChild(span);

            // 7. Click listener to remove the item completely
            i.addEventListener("click", function (event) {
                event.stopPropagation(); // Stops the span click from firing
                span.remove();

                if (box.querySelectorAll(".saved-item").length === 0) {
                    box.style.display = "none";
                }
            });

            // 8. Click listener to reload the precise weather profile
            span.addEventListener("click", function () {
                // Now this passes pure "Nagpur" straight to the weather API!
                whehter_data(currentDisplayedCity);
            });
        }
    });
}




whehter_data("Wani");
searchCity();
savedCity();