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
