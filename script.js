const profiles = [
  {
    name: "Filip",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Umí spálit vodu, ale i náladu v místnosti. Směje se i v situacích, kdy by ostatní raději utekli oknem."
  },
  {
    name: "Adam",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Tvrdí, že jde jen na jedno pivo. Nikdy to tak neskončí. Expert na pozdní příchody."
  },
  {
    name: "Sofi",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Má ráda klid, chaos a obojí zároveň. Pije čaj, ale stejně nespí."
  }
];

let index = 0;

const card = document.getElementById("card");
const likesEl = document.getElementById("likes");
const dislikesEl = document.getElementById("dislikes");

let likes = [];
let dislikes = [];

function renderCard() {
  if (index >= profiles.length) {
    card.innerHTML = "<h2>Konec profilů</h2>";
    return;
  }

  const p = profiles[index];

  card.innerHTML = `
    <img src="${p.photo}">
    <div class="card-content">
      <h2>${p.name}</h2>
      <p>${p.bio}</p>
    </div>
  `;
}

function vote(isLike) {
  const name = profiles[index].name;
  isLike ? likes.push(name) : dislikes.push(name);
  index++;
  renderLists();
  renderCard();
}

function renderLists() {
  likesEl.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesEl.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

document.getElementById("like").onclick = () => vote(true);
document.getElementById("dislike").onclick = () => vote(false);

document.getElementById("clear").onclick = () => {
  likes = [];
  dislikes = [];
  renderLists();
};

renderCard();
