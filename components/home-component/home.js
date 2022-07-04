// const divContainer = document.getElementById("productcontainer");

const divContainerMen = document.getElementById("tab-Men");

// const divContainerWomen = document.getElementById("productcontainerwomen");

// const divContainerUnisex = document.getElementById("productcontainerunisex");

const allproduct = document.querySelector(".more");
allproduct.addEventListener("click", () => allProducts());

// const menProducts = document.querySelector(".menBtn");
// menProducts.addEventListener("click", () => allProducts("Men"));

// const womenProducts = document.querySelector(".womenBtn");
// womenProducts.addEventListener("click", () => allProducts("Women"));
// const unisexProducts = document.querySelector(".unisexBtn");
// unisexProducts.addEventListener("click", () => allProducts("Unisex"));

eel.getAllProducts()((product) => renderAll3(product, divContainer));
eel.getGenderProducts("Men")((product) => renderAll3(product, divContainerMen));
// eel.getGenderProducts("Women")((product) =>
//   renderAll3(product, divContainerWomen)
// );

// eel.getGenderProducts("Unisex")((product) =>
//   renderAll3(product, divContainerUnisex)
// );



// <div class="firstimage">

// <div class="imgrelative">
//   <div class="h4relative">
//     <h4>NikeCourt Zoom Vapor Cage 4 Rafa</h4>
//   </div>

//   <div >
//     <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/53be5763-e552-44e0-97fb-6617579ab733/cortez-sp-shoes-v3L7vw.png" alt="">
//   </div>
// </div>
// </div>

const renderAll3 = (products, container) => {
  console.log(products);
  for (let i = 0; i <1; i++) {
    let index = Math.floor(Math.random() * 1);
    const hotCard = document.createElement("div"); //1
    hotCard.classList.add("hot");
    const divl = document.createElement("div"); //2
    divl.classList.add("l");
    const divkrishnagrid = document.createElement("div");
    divkrishnagrid.classList.add("krishnagrid");
    // const img = document.createElement("firstimage");
    // img.setAttribute("src", products[index].img[0]);
    // more.classList.add("more");   
    
    container.appendChild(hotCard);
    hotCard.appendChild(divl);
    hotCard.appendChild(divkrishnagrid);
    hotCard.appendChild(img);
    hotCard.append(more)
    hotCard.append(twomore)
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



// home.renderWomen();
// home.renderUnisex();
// console.log(home);
// parent => child => multipleChild => parentMarge

// const renderAll3 = (products, container) => {
//   console.log(products);
//   for (let i = 0; i < 3; i++) {
//     let index = Math.floor(Math.random() * 4);
//     const divProductCard = document.createElement("div"); //1
//     divProductCard.classList.add("productcard");
//     const divCircle = document.createElement("div"); //2
//     divCircle.classList.add("circle");
//     const divImageContainer = document.createElement("div");
//     divImageContainer.classList.add("imgcont");
//     const img = document.createElement("img");
//     img.setAttribute("src", products[index].img[0]);
//     const shoesize = document.createElement("div");
//     shoesize.classList.add("shoesize");

//     const ukSize = document.createElement("div");
//     ukSize.classList.add("ussize");
//     ukSize.textContent = "UK Size";
//     shoesize.appendChild(ukSize);
//     for (let j = 0; j < products[index].availability.size.length; j += 2) {
//       const size = document.createElement("div");
//       size.classList.add("ks");
//       size.textContent = products[index].availability.size[j];
//       shoesize.appendChild(size);
//     }
