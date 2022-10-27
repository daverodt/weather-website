const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "From JavaScript";
messageTwo.textContent = "";

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading..";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        console.log(data)
        if (data.error) {
          messageOne.textContent = data.error;
          return;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      });
    }
  );
});
