const divContainer = document.getElementById("productcontainer");
const divContainerMen = document.getElementById("productcontainermen");
const divContainerWomen = document.getElementById("productcontainerwomen");
const divContainerUnisex = document.getElementById("productcontainerunisex");
const allproduct = document.querySelector(".allBtn");
allproduct.addEventListener("click", () => allProducts());

const menProducts = document.querySelector(".menBtn");
menProducts.addEventListener("click", () => allProducts("Men"));
const womenProducts = document.querySelector(".womenBtn");
womenProducts.addEventListener("click", () => allProducts("Women"));
const unisexProducts = document.querySelector(".unisexBtn");
unisexProducts.addEventListener("click", () => allProducts("Unisex"));

eel.getAllProducts()((product) => renderAll3(product, divContainer));
eel.getGenderProducts("Men")((product) => renderAll3(product, divContainerMen));
eel.getGenderProducts("Women")((product) =>
  renderAll3(product, divContainerWomen)
);
eel.getGenderProducts("Unisex")((product) =>
  renderAll3(product, divContainerUnisex)
);

// class Component {
//   constructor() {
//     // this.divContainer = document.getElementById("productcontainer")
//     this.divContainer = document.getElementById("productcontainer");
//     this.divContainerMen = document.getElementById("productcontainermen");
//     this.divContainerWomen = document.getElementById("productcontainerwomen");
//     this.divContainerUnisex = document.getElementById("productcontainerunisex");
//     // this.parent = null
//   }

//   creatingProductContainer(parent, products) {
//     const divProductCard = document.createElement("div"); //1
//     divProductCard.classList.add("productcard");
//     const divCircle = document.createElement("div"); //2
//     divCircle.classList.add("circle");
//     const divImageContainer = document.createElement("div");
//     divImageContainer.classList.add("imgcont");
//     const img = document.createElement("img");
//     img.setAttribute("src", products[i].img[0]);
//     const shoesize = document.createElement("div");
//     shoesize.classList.add("shoesize");

//     const ukSize = document.createElement("div");
//     ukSize.classList.add("ussize");
//     ukSize.textContent = "UK Size";
//     shoesize.appendChild(ukSize);
//     for (let j = 0; j < products[i].availability.size.length; j += 2) {
//       const size = document.createElement("div");
//       size.classList.add("ks");
//       size.textContent = products[i].availability.size[j];
//       shoesize.appendChild(size);
//     }
//     const divName = document.createElement("div");
//     divName.classList.add("shoename");
//     divName.textContent = products[i].name;
//     const divAddToCart = document.createElement("div");
//     divAddToCart.classList.add("addtocart");
//     const addToCartBtn = document.createElement("button");
//     addToCartBtn.textContent = "ADDCART";
//     const divSeeMore = document.createElement("div");
//     divSeeMore.classList.add("seemore");
//     const aTag = document.createElement("a");
//     aTag.setAttribute("href", "https://www.compart.com/en/unicode/U+FF0B");
//     aTag.innerHTML = "more&#xFF0B";

//     parent.appendChild(divProductCard);
//     divProductCard.appendChild(divCircle);
//     divProductCard.appendChild(divImageContainer);
//     divImageContainer.appendChild(img);
//     divProductCard.appendChild(shoesize);
//     divProductCard.appendChild(divName);
//     divProductCard.appendChild(divAddToCart);
//     divAddToCart.appendChild(addToCartBtn);
//     divProductCard.appendChild(divSeeMore);
//     divSeeMore.appendChild(aTag);
//   }

//   render3products(products) {
//     for (let i = 0;
//       i < 3; i++) {
//       creatingProductContainer(products[i]);
//     }
//   }

//   renderHome() {
//     eel.getAllProducts()((product) =>
//       render3products(this.divContainer, product)
//     );
//   }
//   renderMen() {
//     eel.getManProducts()((product) =>
//       render3products(this.divContainerMen, product)
//     );
//   }
//   renderWomen() {
//     eel.getWomenProducts()((product) =>
//       render3products(this.divContainerWomen, product)
//     );
//   }
//   renderUnisex() {
//     eel.getUnisexProducts()((product) =>
//       render3products(this.divContainerUnisex, product)
//     );
//   }
// }
// const home = new Component();
// home.renderHome();
// home.renderMen();
// home.renderWomen();
// home.renderUnisex();
// console.log(home);
// parent => child => multipleChild => parentMarge

const renderAll3 = (products, container) => {
  console.log(products);
  for (let i = 0; i < 3; i++) {
    let index = Math.floor(Math.random() * 4);
    const divProductCard = document.createElement("div"); //1
    divProductCard.classList.add("productcard");
    const divCircle = document.createElement("div"); //2
    divCircle.classList.add("circle");
    const divImageContainer = document.createElement("div");
    divImageContainer.classList.add("imgcont");
    const img = document.createElement("img");
    img.setAttribute("src", products[index].img[0]);
    const shoesize = document.createElement("div");
    shoesize.classList.add("shoesize");

    const ukSize = document.createElement("div");
    ukSize.classList.add("ussize");
    ukSize.textContent = "UK Size";
    shoesize.appendChild(ukSize);
    for (let j = 0; j < products[index].availability.size.length; j += 2) {
      const size = document.createElement("div");
      size.classList.add("ks");
      size.textContent = products[index].availability.size[j];
      shoesize.appendChild(size);
    }
    const divName = document.createElement("div");
    divName.classList.add("shoename");
    divName.textContent = products[index].name;
    const divAddToCart = document.createElement("div");
    divAddToCart.classList.add("addtocart");
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "ADDCART";
    const divSeeMore = document.createElement("div");
    divSeeMore.classList.add("seemore");
    const aTag = document.createElement("a");
    aTag.setAttribute("href", "https://www.compart.com/en/unicode/U+FF0B");
    aTag.innerHTML = "more&#xFF0B";

    container.appendChild(divProductCard);
    divProductCard.appendChild(divCircle);
    divProductCard.appendChild(divImageContainer);
    divImageContainer.appendChild(img);
    divProductCard.appendChild(shoesize);
    divProductCard.appendChild(divName);
    divProductCard.appendChild(divAddToCart);
    divAddToCart.appendChild(addToCartBtn);
    divProductCard.appendChild(divSeeMore);
    divSeeMore.appendChild(aTag);
  }
};

function allProducts(gender) {
  // console.log(gender);
  eel.setPageData(gender);
  window.location.href = `../section-component/filterpage.html`;
}

const singleProduct = (id) => {
  window.location.href = "../section-component/filterpage.html";
};
