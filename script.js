const profiles = [
  {
    name: "Adam",
    age: 19,
    bio: "Student, rád sport a chill."
  },
  {
    name: "Klára",
    age: 18,
    bio: "Kafe, focení, výlety."
  },
  {
    name: "Tomáš",
    age: 20,
    bio: "Gym, auta, podnikání."
  },
  {
    name: "Eliška",
    age: 19,
    bio: "Hudba, design, kreativní chaos."
  }
];

const container = document.getElementById("profiles");

profiles.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="avatar">${p.name[0]}</div>
    <h2>${p.name}, ${p.age}</h2>
    <p>${p.bio}</p>
    <div class="actions">
      <button class="pass">❌</button>
      <button class="like">❤️</button>
    </div>
  `;

  container.appendChild(card);
});
