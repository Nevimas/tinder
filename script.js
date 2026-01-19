const profiles = [
  { name: "Filip", bio: "Spí, jí, zase spí." },
  { name: "Adam", bio: "CEO vlastního chaosu." },
  { name: "Seba", bio: "Vše zvládnu. Zítra." },
  { name: "Alex", bio: "Nejsem líný, jsem v úsporném režimu." },
  { name: "Maty", bio: "Když nejím, přemýšlím o jídle." },
  { name: "Tesla", bio: "Elektrizující osobnost." },
  { name: "Groot", bio: "I am Groot. To stačí." },
  { name: "Sofi", bio: "Spontánní plánovačka." },
  { name: "Velomit", bio: "Nevím kdo jsem, ale jedu dál." },
  { name: "Vojta", bio: "Fitness? Fit-ness." },
  { name: "Aneta", bio: "Kafe je odpověď." }
];

let index = 0;

const card = document.getElementById("card");
const likesEl = document.getElementById("likes");
const dislikesEl = document.getElementById("dislikes");

const likes = JSON.parse(localStorage.getItem("likes")) || [];
const dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];

function renderLists() {
  likesEl.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesEl.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

function renderCard() {
  if (!profiles[index]) {
    card.innerHTML = "<h2>Hotovo 🔥</h2>";
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
  }, 300);
}

// tlačítka
document.getElementById("like").onclick = () => vote("like");
document.getElementById("dislike").onclick = () => vote("dislike");

// mazání databáze
document.getElementById("clear").onclick = () => {
  localStorage.clear();
  location.reload();
};

// swipe myší
let startX = 0;

card.addEventListener("mousedown", e => {
  startX = e.clientX;
});

card.addEventListener("mouseup", e => {
  const diff = e.clientX - startX;
  if (diff > 100) vote("like");
  if (diff < -100) vote("dislike");
});

renderCard();
renderLists();
