const getweatherdata = async (lat, long) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
  let response = await fetch(api);
  let data = await response.json();

  console.log(data);
  return data;
}

function renderWeatherData(data) {
  document.getElementById('name').innerHTML = data.name;
  document.getElementById('temp').innerHTML = data.main.temp;
  document.getElementById('temp').innerHTML = data.main.temp;
  document.getElementById('temp_max').innerHTML = data.main.temp_max;
  document.getElementById('temp_min').innerHTML = data.main.temp_min;
  document.getElementById('pressure').innerHTML = data.main.pressure;

}


function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log('Lat: ' + lat + ' Long: ' + long);
      const data = await getweatherdata(lat, long);
      renderWeatherData(data)

      var map = L.map('map').setView([20.9716, 80.5946], 5);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      let marker = L.marker([lat, long]).addTo(map);
      marker.bindPopup(data.name).openPopup();
      map.on('click',async function (e) {
        const data = await getweatherdata(lat, long);
        renderWeatherData(data)
        console.log("lat: " + e.latlng.lat + "Long: " + e.latlng.lng);

      });
    }

    )
  }
};
getlocation();

// const myCallback = () => {
//   console.log('i just woke up');
// }
// setTimeout(myCallback, 5000);  // set time out heigher order argument ot funciton



