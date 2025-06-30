document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

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
});

document.getElementById("chat-toggle").addEventListener("click", () => {
  const chatWindow = document.getElementById("chat-window");
  chatWindow.style.display =
    chatWindow.style.display === "flex" ? "none" : "flex";
});

document.getElementById("chat-send-btn").addEventListener("click", () => {
  const input = document.getElementById("chat-input-field");
  const messages = document.getElementById("chat-messages");
  const userMsg = input.value.trim();

  if (userMsg === "") return;

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.textContent = "You: " + userMsg;
  userDiv.style.marginBottom = "0.5rem";
  messages.appendChild(userDiv);

  
  const botDiv = document.createElement("div");
  botDiv.textContent = "S & A Assistant: We'll get back to you shortly.";
  botDiv.style.color = "#bbb";
  messages.appendChild(botDiv);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
});

const botDiv = document.createElement("div");
botDiv.classList.add("chat-message-bot");
botDiv.textContent = "S & A Assistant: We'll get back to you shortly.";
messages.appendChild(botDiv);


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  });
