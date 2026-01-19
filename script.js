const profiles = [
  { name: "Filip", bio: "Umí spálit vodu a pořád se směje." },
  { name: "Adam", bio: "Všechno ví, nic neřekne." },
  { name: "Seba", bio: "Zítra začínám. Fakt." },
  { name: "Alex", bio: "Mozek v beta verzi." },
  { name: "Maty", bio: "Když nejím, přemýšlím o jídle." },
  { name: "Tesla", bio: "Elektrizující vibe." },
  { name: "Groot", bio: "I am Groot." },
  { name: "Sofi", bio: "Chaos s úsměvem." },
  { name: "Velomit", bio: "Legenda bez příběhu." },
  { name: "Vojta", bio: "Fit… někdy." },
  { name: "Aneta", bio: "Kafe > lidi." }
];

let index = 0;

const card = document.getElementById("card");
const likesEl = document.getElementById("likes");
const dislikesEl = document.getElementById("dislikes");
const historyPanel = document.getElementById("history");

const likes = JSON.parse(localStorage.getItem("likes")) || [];
const dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];

function renderLists() {
  likesEl.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesEl.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

function renderCard() {
  if (!profiles[index]) {
    card.innerHTML = "<h2>Žádné další profily</h2>";
    return;
  }

  const p = profiles[index];
  card.className = "";
  card.innerHTML = `
    <div class="avatar">${p.name[0]}</div>
    <h2>${p.name}</h2>
    <p>${p.bio}</p>
  `;
}

function vote(type) {
  if (!profiles[index]) return;

  const name = profiles[index].name;

  if (type === "like") {
    likes.push(name);
    card.classList.add("like");
  } else {
    dislikes.push(name);
    card.classList.add("dislike");
  }

  localStorage.setItem("likes", JSON.stringify(likes));
  localStorage.setItem("dislikes", JSON.stringify(dislikes));
  renderLists();

  setTimeout(() => {
    index++;
    renderCard();
  }, 250);
}

document.getElementById("like").onclick = () => vote("like");
document.getElementById("dislike").onclick = () => vote("dislike");

document.getElementById("clear").onclick = () => {
  localStorage.clear();
  location.reload();
};

document.getElementById("toggleHistory").onclick = () => {
  historyPanel.classList.toggle("open");
};

// swipe myší
let startX = 0;

card.addEventListener("mousedown", e => startX = e.clientX);
card.addEventListener("mouseup", e => {
  const diff = e.clientX - startX;
  if (diff > 120) vote("like");
  if (diff < -120) vote("dislike");
});

renderCard();
renderLists();
