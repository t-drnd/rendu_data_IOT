document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get("id");

  async function fetchCard(id) {
    const url = "https://hp-api.lainocs.fr/characters/" + cardId;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        displayCard(r);
      });
  }
  function displayCard(card) {
    const template = document.getElementById("card-details");

    template.style.display = "block";
    template.id = "";
    template.querySelector(".card-title").textContent = card.name;
    template.querySelector(".card-eyes").textContent =
      "Couleur des yeux : " + card.eyes;
    template.querySelector(".card-hairs").textContent =
      "Couleur des cheveux : " + card.hairs;
    template.querySelector(".card-blood").textContent =
      "lignée : " + card.blood;
    template.querySelector(".card-wand").textContent =
      "Baguette magique : " + card.wand;
    template.querySelector(".card-patronus").textContent =
      "Patronus : " + card.patronus;
    template.querySelector(".card-role").textContent = "Rôle : " + card.role;
    template.querySelector(".card-house").textContent =
      "Maison : " + card.house;
    template.querySelector(".card-actor").textContent =
      "Acteur : " + card.actor;
    template.querySelector(".card-img").src = card.image;

    // Envoi de la maison à Thonny
    sendDataToThonny(card.house);
  }

  function sendDataToThonny(house) {
    const url = "http://192.168.1.23:3000"; // Vérifie que cette adresse IP et ce port sont corrects
    const data = { house: house };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Maison envoyée avec succès à Thonny");
        } else {
          console.error("Échec de l'envoi de la maison à Thonny");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la maison à Thonny:", error);
      });
  }

  fetchCard(cardId); // Assure-toi que cette ligne est au bon endroit pour fonctionner correctement
});
