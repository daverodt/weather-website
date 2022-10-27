const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'
messageTwo.textContent = ''

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  messageTwo.textContent = 'Loading..'
  const address = search.value;
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGFudHM3NCIsImEiOiJjbDlkZGhkZmc0aWNtM25vaXBqd25zdXozIn0.-NVrnNgZIt-y_PtDlQ9Mwg&limit=1";

  fetch(geocodeURL).then((response) => {
    response.json().then((data) => {
      console.log(data)
      if (data.error) {
        messageTwo.textContent = data.error
        console.log(data.error);
        return;
      }
      if (data.features.length === 0) {
        messageTwo.textContent = "Please Submit a valid Location"
        console.log("Please Submit a valid Location");
        return;
      }
      fetch(`http://api.weatherstack.com/current?access_key=1ad164b60dc3e890c700e69f9f749472&query=${data.features[0].center[1]},
      ${data.features[0].center[0]}`).then((res) => {
        res.json().then((newData) => {
          if (!newData.error) {

            messageTwo.textContent =  `${newData.location.name} ${newData.current.weather_descriptions}, currently ${newData.current.temperature} Farenheit degrees out. There is a ${newData.current.precip}% change of rain.`
            console.log(newData.location.name);
            console.log(
              `${newData.current.weather_descriptions}, It is currently ${newData.current.temperature} Celsius degrees out. There is a ${newData.current.precip}% change of rain.`
            );
            return;
          }
          messageTwo.textContent = newData.error
          console.log(newData.error);
        });
      });
    });
  });
});
