const homeBtn = document.querySelector(".home");
const userBtn = document.querySelector(".user");
const cartBtn = document.querySelector(".cart");
const orderBy = document.querySelector(".order");
const logOutBtn = document.querySelector(".log-out");

logOutBtn.addEventListener("click", () => {
  window.location.href = "../login-component/SignUpLogin.html";
});

eel.getPageData()((data) => {
  console.log(data);
  if (data[0] === "cart") {
    cartHTML();
    return;
  }
  return;
});

homeBtn.addEventListener("click", () => {
  window.location.href = "../home-component/dashboard.html";
});
userBtn.addEventListener("click", userHTML);
orderBy.addEventListener("click", orderHTML);
cartBtn.addEventListener("click", cartHTML);

let data = [];
eel.getAllProducts()((product) => console.log(product));

console.log(data);

function userHTML() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("main").innerHTML = this.responseText;
  };
  xhttp.open("GET", "./user.html");
  xhttp.send();
}

function cartHTML() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("main").innerHTML = this.responseText;
    getCartProduct();
  };
  xhttp.open("GET", "./cart.html");
  xhttp.send();
}

const getCartProduct = () => {
  eel.get_user_ID()((id) => {
    eel.userInfo(id)((user) => {
      console.log(user[0]);
      eel.getCartItems(user[0].user_info.user_cart)((productCart) => {
        const outer = document.querySelector(".outer");
        renderAll(productCart, outer);
      });
    });
  });
};

function orderHTML() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("main").innerHTML = this.responseText;
    eel.userInfo("62b818cf1d0e763410d30734")((order) => {
      getOrderDetails(order);
    });
  };
  xhttp.open("GET", "./order.html");
  xhttp.send();
}

// userInfo;
const getOrderDetails = (order) => {
  console.log(order[0].user_info.user_order.order_status);

  const { active_order, prev_order } = {
    ...order[0].user_info.user_order.order_status,
  };
  console.log(active_order, prev_order);
  const activeULList = document.querySelector(".active-header ul");
  const li = document.createElement("li");
  const nameContainer = document.createElement("div");
  nameContainer.classList.add("name-container");
  const nameInput = document.createElement("input");
  nameContainer.appendChild(nameInput);

  const productIdContainer = document.createElement("div");
  productIdContainer.classList.add("product-id-container");
  const productId = document.createElement("input");
  productIdContainer.appendChild(productId);

  const idContainer = document.createElement("div");
  idContainer.classList.add("id-container");
  const orderId = document.createElement("input");
  idContainer.appendChild(orderId);

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  const statusInput = document.createElement("input");
  statusContainer.appendChild(statusInput);

  const cancelContainer = document.createElement("div");
  cancelContainer.classList.add("cancel-container");
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel Order";
  cancelContainer.appendChild(cancelBtn);

  li.appendChild(nameContainer);
  li.appendChild(productIdContainer);
  li.appendChild(idContainer);
  li.appendChild(statusContainer);
  li.appendChild(cancelContainer);

  activeULList.appendChild(li);
};

const renderAll = (product, outer) => {
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
    const h4 = document.createElement("h4");
    h4.setAttribute("data-id", product[i]._id);
    h4.textContent = product[i].name;
    h4.addEventListener("click", () =>
      singleProduct(h4.getAttribute("data-id"))
    );
    // const br = document.createElement("br");
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "REMOVE";
    cartBtn.addEventListener("click", () => {
      console.log("i was clicked");
    });
    // const span = document.createElement("span");
    // span.innerText = "heart";

    outer.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(divMiddle);
    divMiddle.appendChild(divHide);
    divCard.appendChild(divDesCCard);
    divDesCCard.appendChild(h4);
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
