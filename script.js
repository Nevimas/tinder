let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
let seen = JSON.parse(localStorage.getItem("seen")) || [];
let currentIndex = 0;

function saveProfile() {
  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;

  if (!name || !bio) {
    alert("Vyplň všechno");
    return;
  }

  profiles.push({ name, bio });
  localStorage.setItem("profiles", JSON.stringify(profiles));

  document.getElementById("create").style.display = "none";
  document.getElementById("app").style.display = "block";

  showProfile();
}

function showProfile() {
  const card = document.getElementById("card");

  while (currentIndex < profiles.length && seen.includes(currentIndex)) {
    currentIndex++;
  }

  if (currentIndex >= profiles.length) {
    card.innerHTML = "<p>Žádné další profily</p>";
    return;
  }

  const p = profiles[currentIndex];
  card.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.bio}</p>
  `;
}

function vote(like) {
  seen.push(currentIndex);
  localStorage.setItem("seen", JSON.stringify(seen));
  currentIndex++;
  showProfile();
}
