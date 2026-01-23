document.addEventListener("DOMContentLoaded", () => {

  /* MOBILE MENU */
  const menuIcon = document.getElementById("menuIcon");
  const navMenu = document.getElementById("navMenu");

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navMenu.style.display =
        navMenu.style.display === "flex" ? "none" : "flex";
    });
  }

  /* TYPEWRITER */
  const typeEl = document.getElementById("typewriter");
  if (typeEl) {
    const lines = [
      "I write about love.",
      "Mostly about my wife, Maya.",
      "Sometimes about growth.",
      "Sometimes just to laugh."
    ];

    let line = 0;
    let char = 0;

    function type() {
      if (line >= lines.length) return;

      if (char < lines[line].length) {
        typeEl.textContent += lines[line][char];
        char++;
        setTimeout(type, 60);
      } else {
        typeEl.textContent += "\n";
        line++;
        char = 0;
        setTimeout(type, 400);
      }
    }
    type();
  }

  /* POEMS DATA */
  const poems = [
    {
      id: 1,
      title: "For Maya",
      excerpt: "Loving you was never a decision...",
      text: "Loving you was never a decision.\nIt was gravity.",
      image: "images/love.png"
    },
    {
      id: 2,
      title: "Becoming",
      excerpt: "I am not late, I am learning...",
      text: "I am not late.\nI am learning.",
      image: "images/growth.png"
    },
    {
      id: 3,
      title: "Coffee Thoughts",
      excerpt: "I spilled my confidence...",
      text: "I spilled my confidence\nalong with my coffee.",
      image: "images/humor.png"
    }
  ];

  /* HOME PAGE */
  const list = document.querySelector(".poem-list");
  if (list) {
    poems.forEach(p => {
      list.innerHTML += `
        <div class="poem-card" onclick="location.href='poem.html?id=${p.id}'">
          <img src="${p.image}">
          <div>
            <h2>${p.title}</h2>
            <p>${p.excerpt}</p>
          </div>
        </div>
      `;
    });
  }

  /* POEM PAGE */
  const titleEl = document.getElementById("poemTitle");
  if (titleEl) {
    const id = new URLSearchParams(window.location.search).get("id");
    const poem = poems.find(p => p.id == id) || poems[0];

    titleEl.textContent = poem.title;
    document.getElementById("poemText").textContent = poem.text;
    document.getElementById("poemImage").src = poem.image;
  }

});
