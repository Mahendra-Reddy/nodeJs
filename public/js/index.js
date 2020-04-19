const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "";
  messageTwo.textContent = "";

  const value = search.value;
  if (!value) {
    messageOne.textContent = "please enter search";
  } else {
    fetch(`/weather?address=${value}`).then((res) =>
      res
        .json()
        .then(
          (response) =>
            (messageTwo.textContent = `location: ${response.location.location} - forecast:  ${response.forecast.temperature}  local_time: ${response.forecast.time}`)
        )
    );
  }
});
