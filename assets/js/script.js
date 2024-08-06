/* Author: */
const clickbtn = document.querySelector(".clickme");
clickbtn.addEventListener("click",() => {
    GetInfo();
})

function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=879fcd7a229d308d37f2d6f92cde5fbf')
.then(response => response.json())
.then(data => {

    // for(i = 0; i<5; i++){
    //     document.getElementById("day" + (i+1) + "date").innerHTML = data.list[i].dt_txt;
    // }

    //Getting the min and max values for each day
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Temperature").innerHTML = "Temperature: " + Number(data.list[i].main.temp - 273.15).toFixed(1) + "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Climate").innerHTML = "Climate: " + data.list[i].weather[0].description;
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = "Wind Speed: " + data.list[i].wind.speed + "km/h";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)
})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Mumbai";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "date").innerHTML = weekday[CheckDay(i)];
    }
    //------------------------------------------------------------