import React, { useEffect, useState } from 'react'

function Weather() {
    const [weatherData,setWeatherData] = useState(null)
    const fetchWeatherData = async()=> {
        try {
            const response =await  fetch('');
            const data= await response.json();
            setWeatherData(data);
        } catch (error) {
            
        };
        
        useEffect(()=>{

            fetchWeatherData();
        },[])
    }

    const currentDate = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
     
      const month = months[currentDate.getMonth()];
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      
      const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className='container'>
        <p>{formattedDate}</p>
        <h1>CityName</h1>
        <img src="" alt="logoweather" />
        <h1>temprature</h1>
        <input type="text" placeholder='nameCity' />
        <button>Get</button>
      
    </div>
  )
}

export default Weather
