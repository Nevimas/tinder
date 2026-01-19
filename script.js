const profiles = [
  {
    name: "Filip",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Rád dělám, že mám život pod kontrolou, ale realita to většinou rychle vyvrátí. Miluju pozdní večery, hluboké debaty a pizzu ve 2 ráno. Pokud hledáš někoho, kdo vždy ví, kam jdeme – nejsem to já."
  },
  {
    name: "Adam",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Specialista na odkládání povinností a přehnané plánování věcí, které se nikdy nestanou. Umím dobře poslouchat, ale občas zapomenu odpovědět. Kafe beru vážně, lidi většinou míň."
  },
  {
    name: "Seba",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
    bio: "Začnu cvičit od pondělí. Od kterého pondělí zatím nevím. Baví mě spontánní akce, špatná rozhodnutí a historky, které se nedají vyprávět před rodiči."
  },
  {
    name: "Alex",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    bio: "Mozek běží na 27 otevřených kartách najednou. Přemýšlím víc, než bych měl, a mluvím míň, než bych mohl. Pokud máš ráda lehký chaos s hlubokým obsahem, možná si budeme rozumět."
  },
  {
    name: "Maty",
    img: "https://randomuser.me/api/portraits/men/77.jpg",
    bio: "Jídlo je moje láska, spánek moje vášeň. Když mlčím, pravděpodobně přemýšlím nad tím, co budu jíst příště. Překvapivě spolehlivý v krizových situacích."
  },
  {
    name: "Tesla",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    bio: "Energie mám dost, jen ji neumím správně nasměrovat. Baví mě technologie, nápady a věci, které většinou nedokončím. Ale nadšení mi nechybí."
  },
  {
    name: "Groot",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Mluvím málo, ale když už, tak to stojí za to. Rád pozoruju svět kolem sebe a občas mám pocit, že mu rozumím víc než lidem. Stromy mám rád. Lidi… záleží."
  },
  {
    name: "Sofi",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Chaos v nejlepší podobě. Směju se ve špatných chvílích a myslím to dobře skoro vždy. Miluju hudbu, noční město a pocit, že se něco děje."
  },
  {
    name: "Velomit",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    bio: "Legenda bez oficiální dokumentace. Dělám věci po svém a občas zapomenu vysvětlit proč. Pokud hledáš normálního člověka, jdi o profil vedle."
  },
  {
    name: "Vojta",
    img: "https://randomuser.me/api/portraits/men/83.jpg",
    bio: "Sportuju… mentálně. Fyzicky jen občas. Vážím si upřímnosti, humoru a lidí, co to nehrají na dokonalost. Nejlepší věci jsou stejně neplánované."
  },
  {
    name: "Aneta",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Kafe je moje osobnostní vlastnost. Ráda mám klid, dobré rozhovory a lidi, co mě nechají chvíli mlčet. Pokud se umíš smát sarkasmu, máme šanci."
  }
];

let used = JSON.parse(localStorage.getItem("used")) || [];
let likes = JSON.parse(localStorage.getItem("likes")) || [];
let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];

const card = document.getElementById("card");
const likesEl = document.getElementById("likes");
const dislikesEl = document.getElementById("dislikes");

function renderLists() {
  likesEl.innerHTML = likes.map(n => `<li>${n}</li>`).join("");
  dislikesEl.innerHTML = dislikes.map(n => `<li>${n}</li>`).join("");
}

function nextProfile() {
  const remaining = profiles.filter(p => !used.includes(p.name));
  if (!remaining.length) {
    card.innerHTML = "<h2 style='padding:20px'>Všichni profily projity</h2>";
    return;
  }
  current = remaining[0];
  card.style.transform = "translate(0,0)";
  card.innerHTML = `
    <img src="${current.img}">
    <div class="card-content">
      <h2>${current.name}</h2>
      <p>${current.bio}</p>
    </div>
  `;
}

function vote(type) {
  used.push(current.name);
  localStorage.setItem("used", JSON.stringify(used));
  if (type === "like") likes.push(current.name);
  else dislikes.push(current.name);
  localStorage.setItem("likes", JSON.stringify(likes));
  localStorage.setItem("dislikes", JSON.stringify(dislikes));
  renderLists();
  nextProfile();
}

document.getElementById("like").onclick = () => vote("like");
document.getElementById("dislike").onclick = () => vote("dislike");

document.getElementById("clear").onclick = () => {
  localStorage.clear();
  location.reload();
};

// SWIPE
let startX = 0;
card.addEventListener("mousedown", e => startX = e.clientX);
card.addEventListener("mousemove", e => {
  if (!startX) return;
  const dx = e.clientX - startX;
  card.style.transform = `translateX(${dx}px) rotate(${dx / 12}deg)`;
});
card.addEventListener("mouseup", e => {
  const dx = e.clientX - startX;
  if (dx > 120) vote("like");
  else if (dx < -120) vote("dislike");
  else card.style.transform = "translate(0,0)";
  startX = 0;
});

renderLists();
nextProfile();
