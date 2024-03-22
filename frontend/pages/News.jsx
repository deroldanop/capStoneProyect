import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import web_PhotoWeather from "../images/web_PhotoWeather.jpg"
// import east from "../images/_east2.png"
// import north_east from "../images/_north_east2.png"
// import north from "../images/_north2.png"
// import north_west from "../images/_north_west2.png"
// import west from "../images/_west2.png"
// import south_west from "../images/_south_west2.png"
// import south_east from "../images/_south_east2.png"
// import south from "../images/_south2.png"

const API_KEY = '4e960b333fe4407db84c2648f6ef1e55';
const API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-21&sortBy=publishedAt&apiKey=${API_KEY}`;


const News = () => {
  const [searchText, setSearchText] = useState('');
  const [news, setNews] = useState(null);

  const [error, setError] = useState(null);


  const fetchNews = async (searchText) => {
    try {
      const response = await fetch(API_URL.replace('{SEARCH_TEXT}', searchText));
      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }
      const data = await response.json();
      setNews(data);
      console.log(`'This is the data' ${data.coord}`);
    } catch (error) {
      setError(error.message);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      fetchWeather(searchText);
    }
  };

  useEffect(() => {
    fetchNews('Tesla');
  }, []); 

  if (error) return <div>Error: {error}</div>;
  if (!news) return <div>Loading...</div>;

/////////////////
// .then(response => response.json())
//       .then(data => {
//         setData(data);
//       });

//     // Clean-up function (optional)
//     return () => {
//       console.log('Component unmounted');
//       // Perform any clean-up here
//     };
//   }, []);


//////////////////

  return (
    
    <div className='secondContainer'>
      {/* <img src={web_PhotoWeather} /> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for new"
        />
        <button type="submit">Search</button>
      </form>
      
      {/* <h2>Weather in {weather.name}</h2> */}
      <ul className='navElements'>
      <li><a href={`/WeatherForecast/?lon=${weather.coord.lon}&lat=${weather.coord.lat}`}>4 days forecast</a></li>
      </ul>
      <p>Total results: {news.totalResults} articles  </p>
      <h2>{news.articles[0].title}  </h2>
      
    </div>
    
  );
  
};




function toLocalTime(apiTime){
const unixTimestamp = apiTime; // Example Unix timestamp

//Create a new Date object using the Unix timestamp (multiply by 1000 to convert from seconds to milliseconds)
const date = new Date(apiTime * 1000);

// Convert the date to a human-readable format
const formattedDate = date.toLocaleString(); // You can pass options to toLocaleString() for a specific format

 console.log(formattedDate); // Output: "4/10/2024, 6:21:12 AM" (example)
return formattedDate;
}

// function secondsToHoursMinutes(seconds) {
//     var hours = Math.floor(seconds / 3600000);
//     var minutes = Math.floor((seconds % 3600000) / 60);
// let time 
//    if(hours < 12){
//     time = hours + ':' + minutes +"AM"
//    } else{
//     time = (hours - 12) + ':' + minutes +"PM"
//    }
//     return time;
// }{
function getIconURL(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png` 
}
function selectImage(number){
  let imgLink;
  if(number > 337.4 || number < 22.6){
     imgLink = north;
  }else if(number >= 22.6 && number < 67.6){
    imgLink = north_east
  }else if(number >= 67.6 && number < 112.6){
    imgLink = east
  }else if(number >= 112.6 && number < 157.6){
    imgLink = south_east
  }else if(number >= 157.6 && number < 202.6){
    imgLink = south
  }else if(number >= 202.6 && number < 247.6){
    imgLink = south_west
  }else if(number >= 247.6 && number < 292.6){
    imgLink = west
  }
  else if(number >= 292.6 && number < 337.6){
    imgLink = north_west
}
return imgLink;
};








export default News;
export { API_KEY };

