document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = "fadeIn 1.5s ease-in-out forwards";
        }, index * 500);
    });
});
