const outer = document.querySelector(".outer");
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

function loadDoc(gender) {
  const xhttp = new XMLHttpRequest();
  if (gender === "all") {
    xhttp.onload = function () {
      console.log("hello world");
      outer.innerHTML = getAllProducts();
    };
  } else {
    xhttp.onload = function () {
      console.log("hello world");
      outer.innerHTML = getGenderProducts(gender);
    };
  }
  xhttp.open("GET", "filterpage.html", true);
  xhttp.send();
}

eel.getPageData()((product) => {
  console.log(product);
  if (product[0] == null) {
    console.log("hello world");
    getAllProducts();
    return;
  }
  getGenderProducts(product[0]);
});

const getAllProducts = () => {
  // console.log(eel.getAllProducts()((product) => renderAll(product)));
  if (eel.getAllProducts()((product) => renderAll(product)) == undefined) {
    return null;
  }
  return eel.getAllProducts()((product) => {
    console.log(product);
    return renderAll(product);
  });
};
const getGenderProducts = (gender) => {
  if (
    eel.getGenderProducts(gender)((product) => renderAll(product)) == undefined
  ) {
    return null;
  }
  return eel.getGenderProducts(gender)((product) => {
    console.log(product);
    return renderAll(product);
  });
};

const renderAll = (product) => {
  for (let i = 0; i < product.length; i++) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const img = document.createElement("img");
    img.setAttribute("src", product[i].img[0]);
    const divMiddle = document.createElement("div");
    divMiddle.classList.add("middle");
    const divHide = document.createElement("div");
    divHide.classList.add("hide");
    divHide.textContent = `${product[i].price} ₹`;

    const divDesCCard = document.createElement("div");
    divDesCCard.classList.add("desccard");
    const h5 = document.createElement("h5");
    h5.setAttribute("data-id", product[i]._id);
    h5.textContent = product[i].name;
    h5.addEventListener("click", () =>
      singleProduct(h5.getAttribute("data-id"))
    );
    // const br = document.createElement("br");
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "ADD TO CART";
    cartBtn.addEventListener("click", () => {
      // console.log(id);
      eel.get_user_ID()((id) => {
        eel.update_user_cart_add(id, h5.getAttribute("data-id"));
      });
      console.log("updated cart");
      return;
    });
    // const span = document.createElement("span");
    // span.innerText = "heart";

    outer.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(divMiddle);
    divMiddle.appendChild(divHide);
    divCard.appendChild(divDesCCard);
    divDesCCard.appendChild(h5);
    divDesCCard.appendChild(cartBtn);
    // divDesCCard.appendChild(span);
  }
  // return 0;
};

const singleProduct = (id) => {
  console.log(id);
  eel.setPageData(id);
  window.location.href = "../single-item-component/buynow.html";
};

logOut.addEventListener("click", () => {
  window.location.href = "../login-component/SignUpLogin.html";
});

home.addEventListener("click", () => {
  window.location.href = "../home-component/dashboard.html";
});
