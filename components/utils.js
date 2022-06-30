const all = document.querySelector(".all");
const men = document.querySelector(".men");
const women = document.querySelector(".women");
const unisex = document.querySelector(".unisex");
const logOut = document.querySelector(".log-out");
const home = document.querySelector(".brandimage");

all.addEventListener("click", () => loadDoc("all"));
men.addEventListener("click", () => loadDoc("Men"));
women.addEventListener("click", () => loadDoc("Women"));
unisex.addEventListener("click", () => loadDoc("Unisex"));


