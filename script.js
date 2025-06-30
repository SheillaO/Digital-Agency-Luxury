document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for cards
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));

  // Trim paragraph text and add "Read more" button
  cards.forEach((card) => {
    const para = card.querySelector("p");
    const fullText = para.innerText;

    if (fullText.length > 350) {
      para.innerText = fullText.slice(0, 350) + "...";
      const moreBtn = document.createElement("button");
      moreBtn.innerText = "Read more";
      moreBtn.classList.add("read-more-btn");
      card.appendChild(moreBtn);

      moreBtn.addEventListener("click", () => {
        para.innerText = fullText;
        moreBtn.remove();
      });
    }
  });

  // Chat toggle
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener("click", () => {
      chatWindow.style.display =
        chatWindow.style.display === "flex" ? "none" : "flex";
    });
  }

  // Send message
  const sendBtn = document.getElementById("chat-send-btn");
  const input = document.getElementById("chat-input-field");
  const messages = document.getElementById("chat-messages");

  if (sendBtn && input && messages) {
    sendBtn.addEventListener("click", () => {
      const userMsg = input.value.trim();
      if (userMsg === "") return;

      const userDiv = document.createElement("div");
      userDiv.textContent = "You: " + userMsg;
      userDiv.style.marginBottom = "0.5rem";
      userDiv.style.color = "#eee";
      messages.appendChild(userDiv);

      const botDiv = document.createElement("div");
      botDiv.classList.add("chat-message-bot");
      botDiv.textContent = "S & A Assistant: We'll get back to you shortly.";
      messages.appendChild(botDiv);

      input.value = "";
      messages.scrollTop = messages.scrollHeight;
    });
  }

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show-nav");
    });
  }
});
