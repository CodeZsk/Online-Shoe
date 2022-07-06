const home = document.querySelector(".brandimage");
const search = document.querySelector(".search");
const setting = document.querySelector(".setting");
const cartBtn = document.querySelector(".cart");

const img1 = document.querySelector(".img-1");
const img2 = document.querySelector(".img-2");
const img3 = document.querySelector(".img-3");
const img4 = document.querySelector(".img-4");

const allproduct = document.querySelector(".all");
allproduct.addEventListener("click", () => allProducts());

const menProducts = document.querySelector(".men");
menProducts.addEventListener("click", () => allProducts("Men"));
const womenProducts = document.querySelector(".women");
womenProducts.addEventListener("click", () => allProducts("Women"));
const unisexProducts = document.querySelector(".unisex");
unisexProducts.addEventListener("click", () => allProducts("Unisex"));

const productName = document.querySelector(".name");
const price = document.querySelector(".price-span");
const colorContainer = document.querySelector(".coloroptions");
const sizeContainer = document.querySelector(".sizeofshoes");
const description = document.querySelector(".shoedesc");

// krishna js lol
const cartButton = document.querySelectorAll(".cart-button");

cartButton.forEach((button) => {
  button.addEventListener("click", cartClicked);
});

function cartClicked() {
  let button = this;
  button.classList.add("clicked");
}

eel.getSinglePageData()((product) => {
  getProduct(product[0]);
});

const getProduct = async (id) => {
  return await eel.getSingleProduct(id)((product) => renderProduct(product));
};

const renderProduct = (product) => {
  img1.setAttribute("src", product.img[0]);
  img2.setAttribute("src", product.img[1]);
  img3.setAttribute("src", product.img[2]);
  img4.setAttribute("src", product.img[3]);

  productName.textContent = product.name;
  price.textContent = product.price;
  for (let i = 0; i < product.availability.color.length; i++) {
    const element = document.createElement("div");
    element.style.backgroundColor = product.availability.color[i];
    colorContainer.appendChild(element);
  }
  for (let i = 0; i < product.availability.size.length; i += 2) {
    const element = document.createElement("div");
    element.textContent = product.availability.size[i];
    element.classList.add("boxofsizes");
    sizeContainer.appendChild(element);
  }
  description.textContent = product.description;
};

async function allProducts(gender) {
  await eel.setPageData(gender);
  window.location.href = `../section-component/filterpage.html`;
}

search.addEventListener("change", () => {
  if (!search.value.trim()) {
    return;
  }
  eel.setSearchPageData(search.value.trim());
  window.location.href = "../section-component/filterpage.html";
});

home.addEventListener("click", () => {
  window.location.href = "../home-component/dashboard.html";
});

cartBtn.addEventListener("click", () => {
  eel.setPageData("cart");
  window.location.href = "../setting-component/setting.html";
});

setting.addEventListener("click", () => {
  window.location.href = "../setting-component/setting.html";
});
