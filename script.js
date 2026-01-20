// POEMS DATA
const poems = [
  {
    id: 1,
    title: "For Maya, Always",
    category: "love",
    excerpt: "I loved you before I learned how to explain love…\nand I still do,",
    text: `I loved you before I learned how to explain love…
and I still do,
every day,
in better words.
You are my sunrise and my home.`,
    images: ["images/couple.png", "images/maya.png"]
  },
  {
    id: 2,
    title: "Learning Slowly",
    category: "growth",
    excerpt: "I used to fear the slow,\nnow I call it progress.",
    text: `I used to fear the slow,
now I call it progress.
Every small step
is a quiet victory.`,
    images: ["images/growth.png", "images/notebook.png"]
  },
  {
    id: 3,
    title: "My Coffee",
    category: "humor",
    excerpt: "I spilled coffee on my thoughts,\nnow my brain is caffeinated.",
    text: `I spilled coffee on my thoughts,
now my brain is caffeinated.
I’m still trying
to drink my feelings.`,
    images: ["images/humor.png", "images/notebook.png"]
  }
];


// ---------------------
// HOME PAGE CODE
// HOME PAGE CODE
if (document.getElementById("poemList")) {

  const poemList = document.getElementById("poemList");
  const searchInput = document.getElementById("searchInput");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let currentPage = 1;
  const perPage = 3;

  function paginate(list) {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return list.slice(start, end);
  }

  function displayPoems(list) {
    poemList.innerHTML = "";
    const pageItems = paginate(list);

    pageItems.forEach(poem => {
      poemList.innerHTML += `
        <article class="poem">
          <h2><a href="poem.html?poem=${poem.id}">${poem.title}</a></h2>
          <p class="excerpt">${poem.excerpt}</p>
          <span class="read-more">Read more →</span>
        </article>
      `;
    });

    // disable buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * perPage >= list.length;
  }

  let filteredPoems = poems;

  displayPoems(filteredPoems);

  // SEARCH
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredPoems = poems.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));
    currentPage = 1;
    displayPoems(filteredPoems);
  });

  // NEXT / PREV
  nextBtn.addEventListener("click", () => {
    currentPage++;
    displayPoems(filteredPoems);
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    displayPoems(filteredPoems);
  });

  // LOAD MORE
  loadMoreBtn.addEventListener("click", () => {
    currentPage++;
    displayPoems(filteredPoems);
  });

  // TYPEWRITER + LANDING IMAGE
  const lines = [
    { text: "I write about love.", image: "images/couple.png" },
    { text: "Mostly, about my wife, Maya.", image: "images/maya.png" },
    { text: "Sometimes, about becoming better.", image: "images/growth.png" },
    { text: "And sometimes, just to laugh at myself.", image: "images/humor.png" },
    { text: "These are my poems.", image: "images/notebook.png" }
  ];

  const typeEl = document.getElementById("typewriter");
  const imgEl = document.getElementById("landingImg");
  const scrollPrompt = document.getElementById("scrollPrompt");

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (charIndex < lines[lineIndex].text.length) {
      typeEl.textContent += lines[lineIndex].text.charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 70);
    } else {
      showImage();
      setTimeout(nextLine, 1500);
    }
  }

  function showImage() {
    imgEl.classList.remove("visible");
    imgEl.src = lines[lineIndex].image;
    setTimeout(() => imgEl.classList.add("visible"), 200);
  }

  function nextLine() {
    charIndex = 0;
    typeEl.textContent = "";
    lineIndex++;

    if (lineIndex < lines.length) {
      setTimeout(typeLine, 500);
    } else {
      scrollPrompt.style.display = "flex";
    }
  }

  typeLine();
}

// ---------------------
// POEM PAGE CODE
// ---------------------
if (document.getElementById("poemTitle")) {

  const urlParams = new URLSearchParams(window.location.search);
  const poemId = parseInt(urlParams.get('poem') || 1);
  const poem = poems.find(p => p.id === poemId);

  document.getElementById("poemTitle").innerText = poem.title;
  document.getElementById("poemText").innerText = poem.text;

  const gallery = document.getElementById("gallery");
  poem.images.forEach(img => {
    gallery.innerHTML += `<img src="${img}" alt="poem image">`;
  });

  // COMMENTS
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  function displayComments() {
    const comments = JSON.parse(localStorage.getItem(`comments_${poemId}`) || "[]");
    commentList.innerHTML = "";
    comments.forEach(c => {
      commentList.innerHTML += `
        <div class="comment-item">
          <strong>${c.name || "Anonymous"}</strong>
          <p>${c.text}</p>
        </div>
      `;
    });
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("commentName").value;
    const text = document.getElementById("commentText").value;

    const comments = JSON.parse(localStorage.getItem(`comments_${poemId}`) || "[]");
    comments.push({ name, text });
    localStorage.setItem(`comments_${poemId}`, JSON.stringify(comments));

    commentForm.reset();
    displayComments();
  });

  displayComments();
}


// DARK MODE (Works on both pages)
const toggle = document.querySelectorAll('#darkToggle');
toggle.forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});
// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

