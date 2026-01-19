const profiles = [
  { name: "Adam", age: 19, bio: "Student, sport, chill." },
  { name: "Klára", age: 18, bio: "Kafe, focení, výlety." },
  { name: "Tomáš", age: 20, bio: "Gym, auta, podnikání." },
  { name: "Eliška", age: 19, bio: "Design a kreativita." }
];

let index = 0;

let likes = JSON.parse(localStorage.getItem("likes")) || [];
let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];

const card = document.getElementById("card");
const likesList = document.getElementById("likes");
const dislikesList = document.getElementById("dislikes");

function renderCard() {
  if (index >= profiles.length) {
    card.innerHTML = "<p>Žádné další profily</p>";
    return;
  }

  const p = profiles[index];
  card.innerHTML = `
    <div class="card">
      <div class="avatar">${p.name[0]}</div>
      <h2>${p.name}, ${p.age}</h2>
      <p>${p.bio}</p>
    </div>
  `;
}

function vote(isLike) {
  const p = profiles[index];

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
}

function renderLists() {
  likesList.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesList.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

renderCard();
renderLists();
