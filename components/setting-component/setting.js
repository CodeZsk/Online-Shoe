const homeBtn = document.querySelector(".home");
const userBtn = document.querySelector(".user");
const cartBtn = document.querySelector(".cart");
const orderBy = document.querySelector(".order");

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
      eel.getCartItems(user[0].user_info.user_cart)((productCart) =>
        console.log(productCart)
      );
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
