const mainHeading = document.querySelector("#main-heading");
mainHeading.textContent = "Welcome to Day 19 Warm-up!";
mainHeading.classList.toggle("highlight");

const cities = ["Addis Ababa", "Hawassa", "Gondar"];
const cityList = document.querySelector("#city-list");

cities.forEach((cityName) => {
  const li = document.createElement("li");
  li.textContent = cityName;
  cityList.append(li);
});

const bubbleBtn = document.querySelector("#bubble-btn");
const parentDiv = document.querySelector("#parent-div");

bubbleBtn.addEventListener("click", (e) => {
  console.log("Button clicked! Target:", e.target);
});

parentDiv.addEventListener("click", (e) => {
  console.log("Parent Div caught the event! Target:", e.target);
});

const delegatedList = document.querySelector("#delegated-list");

delegatedList.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    e.target.closest("li").remove();
  }
});

const simpleForm = document.querySelector("#simple-form");
const simpleInput = document.querySelector("#simple-input");
const simpleOutputList = document.querySelector("#simple-output-list");

simpleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = simpleInput.value.trim();

  if (value !== "") {
    const li = document.createElement("li");
    li.textContent = value;
    simpleOutputList.append(li);
    simpleInput.value = "";
  }
});
