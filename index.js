//Initial card load

addEventListener("DOMContentLoaded", (event) => {
  getRandomVillager();
});

//Constant declarations for card information
const card = document.querySelector(".card");
const villagerImage = document.querySelector(".photo");
const villagerName = document.querySelector(".name");
const villagerPersonality = document.querySelector(".personality");
const villagerBirthday = document.querySelector(".birthday");
const villagerSaying = document.querySelector(".saying");
const villagerHobby = document.querySelector(".hobby");
const likedList = document.querySelector(".likedList ul");
const dislikedList = document.querySelector(".dislikedList ul");
const showDislikedButton = document.querySelector(".showDisliked");
const showLikedButton = document.querySelector(".showLiked");
const clearDislikedButton = document.querySelector(".clearDisliked");
const clearLikedButton = document.querySelector(".clearLiked");

//GET request to ACNH Public API for villager info
function getVillager(id) {
  fetch(`http://acnhapi.com/v1/villagers/${id}`)
    .then((resp) => resp.json())
    .then((data) => renderVillager(data));
}

//Uses Random in order to generate a random villager ID, then invokes getVillager()
function getRandomVillager() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
  getVillager(randomNumber);
}

//Event Handler for clicking the like button
let currVillager;
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
  likeVillager(currVillager);
  getRandomVillager();
});

//event handler for clicking the dislike button
const leftButton = document.querySelector("#left");
leftButton.addEventListener("click", () => {
  dislikeVillager(currVillager);
  getRandomVillager();
});

//Renders the card with villager information
function renderVillager(villager) {
  currVillager = villager;
  villagerName.textContent = "Name: " + villager.name["name-USen"];
  villagerPersonality.textContent = "Personality: " + villager.personality;
  villagerBirthday.textContent = "Birthday: " + villager.birthday;
  villagerSaying.textContent = "Saying: " + villager.saying;
  villagerHobby.textContent = "Hobby: " + villager.hobby;
  villagerImage.src = villager.image_uri;
}

//POST request to db.json to maintain a list of liked villagers
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

//POST request to db.json to maintain a list of disliked villagers
function dislikeVillager(villager) {
  fetch("http://localhost:3000/disliked", {
    method: "POST",
    body: JSON.stringify({ ...villager, message: "" }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

//Event Listeners for rotating the card on mouseover of the left and right buttons
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

//createElement for list items for liked list
function populateLikedList() {
  fetch("http://localhost:3000/liked")
    .then((resp) => resp.json())
    .then((likedVillagers) =>
      likedVillagers.forEach((villager) => {
        const li = document.createElement("li");
        li.textContent = villager.name["name-USen"];
        likedList.appendChild(li);
      })
    );
}

//createElement for list items for disliked list
function populateDislikedList() {
  fetch("http://localhost:3000/disliked")
    .then((resp) => resp.json())
    .then((dislikedVillagers) =>
      dislikedVillagers.forEach((villager) => {
        const li = document.createElement("li");
        li.textContent = villager.name["name-USen"];
        dislikedList.appendChild(li);
      })
    );
}

//create eventListener for disliked and liked lists
showDislikedButton.addEventListener("click", () => {
  dislikedList.textContent = "";
  populateDislikedList();
});

showLikedButton.addEventListener("click", () => {
  likedList.textContent = "";
  populateLikedList();
});

//TODO : create button to clear liked and disliked db.json values
