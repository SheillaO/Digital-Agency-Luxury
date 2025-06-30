document.addEventListener("DOMContentLoaded", () => {
  // ================= Animate Cards =================
  const cards = document.querySelectorAll(".card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => {
    cardObserver.observe(card);

    // Add Read More logic
    const para = card.querySelector("p");
    const fullText = para.innerText;

    if (fullText.length > 350) {
      const shortText = fullText.slice(0, 350) + "...";
      para.innerText = shortText;

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

  // ================= Chatbot Toggle =================
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");

  chatToggle.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
  });

  // ================= Chatbot Message Handling =================
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatInput = document.getElementById("chat-input-field");
  const chatMessages = document.getElementById("chat-messages");

  chatSendBtn.addEventListener("click", () => {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    const userDiv = document.createElement("div");
    userDiv.textContent = "You: " + userMsg;
    userDiv.style.marginBottom = "0.5rem";
    chatMessages.appendChild(userDiv);

    const botDiv = document.createElement("div");
    botDiv.textContent = "S & A Assistant: We'll get back to you shortly.";
    botDiv.classList.add("chat-message-bot");
    chatMessages.appendChild(botDiv);

    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // ================= Animate [data-animate] Elements =================
  const animatedElements = document.querySelectorAll("[data-animate]");
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          animateObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => animateObserver.observe(el));

  // ================= Sticky Navbar =================
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
