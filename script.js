document.addEventListener("DOMContentLoaded", function () {
  // === 1. Card Animation with Intersection Observer ===
  const cards = document.querySelectorAll(".card");

  // Create intersection observer for card animations
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all cards
  cards.forEach((card) => {
    cardObserver.observe(card);
  });

  // === 2. Read More Functionality for Cards ===
  cards.forEach((card) => {
    const para = card.querySelector("p");
    if (!para) return;

    const fullText = para.textContent.trim();
    const maxLength = 150;

    if (fullText.length > maxLength) {
      const truncatedText = fullText.slice(0, maxLength);
      para.textContent = truncatedText + "...";

      const moreBtn = document.createElement("button");
      moreBtn.textContent = "Read more";
      moreBtn.className = "read-more-btn";
      card.appendChild(moreBtn);

      let isExpanded = false;

      moreBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        if (!isExpanded) {
          para.textContent = fullText;
          moreBtn.textContent = "Read less";
          isExpanded = true;
        } else {
          para.textContent = truncatedText + "...";
          moreBtn.textContent = "Read more";
          isExpanded = false;
        }
      });
    }
  });

  // === 3. Mobile Navigation Toggle ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show-nav");

      // Toggle hamburger icon
      if (navLinks.classList.contains("show-nav")) {
        hamburger.innerHTML = "✕";
      } else {
        hamburger.innerHTML = "&#9776;";
      }
    });

    // Close mobile menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll("a");
    navLinksItems.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("show-nav");
        hamburger.innerHTML = "&#9776;";
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show-nav");
        hamburger.innerHTML = "&#9776;";
      }
    });
  }

  // === 4. Chatbot Functionality ===
  const chatbot = document.getElementById("chatbot");
  const chatToggle = document.getElementById("chat-toggle");
  const chatClose = document.getElementById("chat-close");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input-field");
  const chatSendBtn = document.getElementById("chat-send-btn");

  let isChatOpen = false;

  // Toggle chatbot
  if (chatToggle && chatbot) {
    chatToggle.addEventListener("click", function () {
      toggleChat();
    });
  }

  // Close chatbot
  if (chatClose && chatbot) {
    chatClose.addEventListener("click", function () {
      closeChat();
    });
  }

  function toggleChat() {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    if (chatbot) {
      chatbot.classList.add("active");
      isChatOpen = true;

      // Focus on input when chat opens
      setTimeout(() => {
        if (chatInput) {
          chatInput.focus();
        }
      }, 400);
    }
  }

  function closeChat() {
    if (chatbot) {
      chatbot.classList.remove("active");
      isChatOpen = false;
    }
  }

  // === 5. Chat Message Functionality ===
  function sendMessage() {
    if (!chatInput || !chatMessages) return;

    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    // Add user message
    addMessage(userMessage, "user");

    // Clear input
    chatInput.value = "";

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thank you for your interest! We'll get back to you shortly with a personalized response.",
        "We appreciate your message. Our team will review your inquiry and respond within 24 hours.",
        "Your message is important to us. We'll connect you with the right specialist soon.",
        "We're excited to help you craft something exceptional. Expect to hear from us soon!",
        "Thank you for reaching out to S & A Luxury. We'll be in touch with you shortly.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage(randomResponse, "bot");
    }, 1000);
  }

  function addMessage(message, sender) {
    if (!chatMessages) return;

    const messageDiv = document.createElement("div");
    messageDiv.className =
      sender === "user" ? "chat-message-user" : "chat-message-bot";

    if (sender === "user") {
      messageDiv.textContent = message;
    } else {
      messageDiv.innerHTML = "✨ " + message;
    }

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message on button click
  if (chatSendBtn) {
    chatSendBtn.addEventListener("click", sendMessage);
  }

  // Send message on Enter key press
  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // === 6. Auto-open chatbot after 5 seconds (optional) ===
  setTimeout(() => {
    // Only auto-open on desktop screens
    if (window.innerWidth > 768 && !isChatOpen) {
      openChat();
    }
  }, 5000);

  // === 7. Smooth Scrolling for Navigation Links ===
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // === 8. Close chatbot when clicking outside ===
  document.addEventListener("click", function (e) {
    if (
      isChatOpen &&
      chatbot &&
      !chatbot.contains(e.target) &&
      !chatToggle.contains(e.target)
    ) {
      closeChat();
    }
  });

  // === 9. Handle window resize ===
  window.addEventListener("resize", function () {
    // Close mobile nav on resize
    if (window.innerWidth > 768 && navLinks) {
      navLinks.classList.remove("show-nav");
      if (hamburger) {
        hamburger.innerHTML = "&#9776;";
      }
    }
  });

  // === 10. Initialize animations ===
  function initializeAnimations() {
    // Add any initialization animations here
    const header = document.querySelector("header");
    if (header) {
      header.style.opacity = "0";
      setTimeout(() => {
        header.style.transition = "opacity 1s ease-in-out";
        header.style.opacity = "1";
      }, 100);
    }
  }

  // Call initialization
  initializeAnimations();

  // === 11. Console welcome message ===
  console.log(
    "%c🌟 Welcome to S & A Luxury",
    "color: #b45309; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cWhere Vision Meets Precision",
    "color: #f3f4f6; font-size: 12px;"
  );
});

// === 12. Loading state management ===
window.addEventListener("load", function () {
  // Hide any loading spinners or add loaded class to body
  document.body.classList.add("loaded");
});

// === 13. Error handling for missing elements ===
function safelyGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found`);
  }
  return element;
}

// === 14. Utility functions ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === 15. Performance optimization ===
// Debounced scroll handler
const handleScroll = debounce(() => {
  // Add any scroll-based functionality here
}, 100);

window.addEventListener("scroll", handleScroll);
