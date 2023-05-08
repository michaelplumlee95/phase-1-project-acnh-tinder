const villagerImage = document.querySelector(".photo");
const villagerName = document.querySelector(".name");
const villagerPersonality = document.querySelector(".personality");
const villagerBirthday = document.querySelector(".birthday");

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
  villagerName.textContent = villager.name["name-USen"];
  villagerPersonality.textContent = villager.personality;
  villagerBirthday.textContent = villager.birthday;
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
