const profiles = [
  { name: "Filip", bio: "Umí spálit vodu a pořád se směje." },
  { name: "Adam", bio: "Říká, že jde jen na jedno pivo. Nikdy." },
  { name: "Seba", bio: "Expert na prokrastinaci a noční myšlenky." },
  { name: "Alex", bio: "Tvrdí, že je chill. Nikdy nebyl." },
  { name: "Maty", bio: "Kdyby byl den delší, stejně by spal." },
  { name: "Tesla", bio: "Nemá auto, má energii." },
  { name: "Groot", bio: "Říká jen jednu větu. Pořád." },
  { name: "Sofi", bio: "Kafe dřív než dobrý den." },
  { name: "Velomit", bio: "Zní nebezpečně. Je to jen vibe." },
  { name: "Vojta", bio: "Ztratí se i s Google Maps." },
  { name: "Aneta", bio: "Směje se dřív, než pochopí vtip." }
];

let index = 0;
let likes = JSON.parse(localStorage.getItem("likes")) || [];
let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];

const cardBox = document.getElementById("card");
const likesList = document.getElementById("likes");
const dislikesList = document.getElementById("dislikes");

let startX = 0;
let currentX = 0;
let dragging = false;

function renderCard() {
  if (index >= profiles.length) {
    cardBox.innerHTML = "<p>Žádné další profily</p>";
    return;
  }

  const p = profiles[index];

  cardBox.innerHTML = `
    <div class="card" id="activeCard">
      <div class="avatar">${p.name[0]}</div>
      <h2>${p.name}</h2>
      <p>${p.bio}</p>
    </div>
  `;

  enableSwipe();
}

function vote(isLike) {
  const p = profiles[index];
  const card = document.getElementById("activeCard");

  card.classList.add(isLike ? "like" : "pass");

  setTimeout(() => {
    if (isLike) {
      likes.push(p.name);
      localStorage.setItem("likes", JSON.stringify(likes));
    } else {
      dislikes.push(p.name);
      localStorage.setItem("dislikes", JSON.stringify(dislikes));
    }

    index++;
    renderLists();
    renderCard();
  }, 200);
}

function renderLists() {
  likesList.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesList.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

function enableSwipe() {
  const card = document.getElementById("activeCard");

  card.addEventListener("mousedown", startDrag);
  card.addEventListener("touchstart", startDrag);

  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag);

  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);
}

function startDrag(e) {
  dragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function moveDrag(e) {
  if (!dragging) return;

  currentX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
  const card = document.getElementById("activeCard");

  card.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;

  card.classList.toggle("like", currentX > 60);
  card.classList.toggle("pass", currentX < -60);
}

function endDrag() {
  if (!dragging) return;
  dragging = false;

  if (currentX > 120) vote(true);
  else if (currentX < -120) vote(false);
  else document.getElementById("activeCard").style.transform = "translateX(0)";

  currentX = 0;
}

renderCard();
renderLists();
