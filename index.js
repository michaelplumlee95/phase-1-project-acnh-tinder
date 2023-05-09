addEventListener("DOMContentLoaded", (event) => {
  getRandomVillager();
});

const villagerImage = document.querySelector(".photo");
const villagerName = document.querySelector(".name");
const villagerPersonality = document.querySelector(".personality");
const villagerBirthday = document.querySelector(".birthday");
const villagerSaying = document.querySelector(".saying");
const villagerHobby = document.querySelector(".hobby");

function getVillager(id) {
  fetch(`http://acnhapi.com/v1/villagers/${id}`)
    .then((resp) => resp.json())
    .then((data) => renderVillager(data));
}

function getRandomVillager() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
  getVillager(randomNumber);
}

let currVillager;
const nextButton = document.querySelector("#next");
console.log(nextButton);
nextButton.addEventListener("click", () => {
  likeVillager(currVillager);
  getRandomVillager();
});
const leftButton = document.querySelector("#left");
leftButton.addEventListener("click", getRandomVillager);

function renderVillager(villager) {
  currVillager = villager;
  villagerName.textContent = "Name: " + villager.name["name-USen"];
  villagerPersonality.textContent = "Personality: " + villager.personality;
  villagerBirthday.textContent = "Birthday: " + villager.birthday;
  villagerSaying.textContent = "Saying: " + villager.saying;
  villagerHobby.textContent = "Hobby: " + villager.hobby;
  console.log(villager.image_uri);
  villagerImage.src = villager.image_uri;
}

function likeVillager(villager) {
  fetch("http://localhost:3000/liked", {
    method: "POST",
    body: JSON.stringify({ ...villager, message: "" }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

const card = document.querySelector(".card");

// Add an event listener to rotate the card to the nextButton element
nextButton.addEventListener("mouseover", () => {
  card.style.transform = "rotateZ(2deg) translate(-50%,-50%)";
});

nextButton.addEventListener("mouseout", () => {
  card.style.transform = "rotateZ(0deg) translate(-50%,-50%)";
});

leftButton.addEventListener("mouseover", () => {
  card.style.transform = "rotateZ(-2deg) translate(-50%,-50%)";
});

leftButton.addEventListener("mouseout", () => {
  card.style.transform = "rotateZ(0deg) translate(-50%,-50%)";
});
