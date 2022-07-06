const allhotProduct = document.querySelector(".krishnagrid");
const divContainerMen = document.querySelector(
  ".man-shoe-container .krishnagrid"
);
const divContainerWomen = document.querySelector(
  ".women-shoe-container .krishnagrid"
);
const divContainerUnisex = document.querySelector(
  ".unisex-shoe-container .krishnagrid"
);

// const allproduct = document.querySelector(".more");
// allproduct.addEventListener("click", () => allProducts());

eel.getAllProducts()((product) => renderAll3(product, allhotProduct, "All"));
eel.getGenderProducts("Men")((product) =>
  renderAll3(product, divContainerMen, "Men")
);
eel.getGenderProducts("Women")((product) =>
  renderAll3(product, divContainerWomen, "Women")
);
eel.getGenderProducts("Unisex")((product) =>
  renderAll3(product, divContainerUnisex, "Unisex")
);

const renderAll3 = (products, container, gender) => {
  console.log(products);
  for (let i = 0; i <= 4; i++) {
    let index = Math.floor(Math.random() * 4);
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("firstimage");
    containerDiv.setAttribute("data-id", products[index]._id);
    const imgrelative = document.createElement("div");
    imgrelative.classList.add("imgrelative");
    const h4relative = document.createElement("div");
    h4relative.classList.add("h4relative");
    const h4 = document.createElement("h4");
    h4.textContent = products[index].name;
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", products[index].img[0]);

    container.appendChild(containerDiv);
    containerDiv.appendChild(imgrelative);
    // containerDiv.insertBefore(imgrelative, null);
    imgrelative.appendChild(h4relative);
    imgrelative.appendChild(div);
    h4relative.appendChild(h4);
    div.appendChild(img);

    if (i == 4) {
      const divMore = document.createElement("div");
      divMore.classList.add("more");
      const moreH4 = document.createElement("h4");
      moreH4.classList.add("textofmore");
      moreH4.textContent = "See More";
      moreH4.setAttribute("data-gender", gender);
      moreH4.addEventListener("click", () =>
        allProducts(moreH4.getAttribute("data-gender"))
      );

      container.appendChild(divMore);
      divMore.appendChild(moreH4);
    }
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

const profileBtn = document.querySelector("#setting");
profileBtn.addEventListener("click", () => {
  window.location.href = "../setting-component/setting.html";
});
