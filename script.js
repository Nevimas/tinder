const profiles = [
  {
    name: "Adam",
    age: 18,
    bio: "klavirnik"
  },
  {
    name: "Filip",
    age: 20,
    bio: "Blulajt Erpé."
  },
  {
    name: "Tesla",
    age: 15,
    bio: "cybertruck"
  },
  {
    name: "groot",
    age: 16,
    bio: "honim"
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
