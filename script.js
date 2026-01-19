// PEVNĚ DANÉ PROFILY (edituj tady)
const profiles = [
  {
    name: "Adam",
    age: 19,
    bio: "Student, sport, chill a dobrá hudba."
  },
  {
    name: "Klára",
    age: 18,
    bio: "Kafe, focení, dlouhé procházky."
  },
  {
    name: "Tomáš",
    age: 20,
    bio: "Gym, auta, podnikání."
  },
  {
    name: "Eliška",
    age: 19,
    bio: "Design, kreativita a chaos."
  }
];

// VYKRESLENÍ PROFILŮ
const container = document.getElementById("profiles");

profiles.forEach(profile => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="avatar">${profile.name[0]}</div>
    <h2>${profile.name}, ${profile.age}</h2>
    <p>${profile.bio}</p>

    <div class="actions">
      <button class="pass">❌</button>
      <button class="like">❤️</button>
    </div>
  `;

  container.appendChild(card);
});
