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
    getUserData();
    getUserFeald();
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
      eel.getCartItems(user[0].user_cart)((productCart) => {
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
      // console.log(id);
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

const getUserFeald = () => {
  const editBtn = document.querySelector(".edit-btn");
  const nameInput = document.querySelector(".name-input");
  const DOBInput = document.querySelector(".dob-input");
  let genderInput;
  const phoneInput = document.querySelector(".phone-input");

  const emailInput = document.querySelector(".email-input");
  const flatInput = document.querySelector(".flat-input");
  const areaInput = document.querySelector(".area-input");
  const landmarkInput = document.querySelector(".landmark-input");
  const townInput = document.querySelector(".town-input");
  const pincodeInput = document.querySelector(".pincode-input");
  const stateInput = document.querySelector(".state-input");

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputField = document.querySelectorAll(".input-");
    if (editBtn.classList.contains("edit")) {
      editBtn.textContent = "Save";
      editBtn.classList.remove("edit");
      inputField.forEach((input) => {
        input.classList.remove("input-disable");
      });
    } else {
      if (document.getElementById("male").checked) {
        genderInput = document.getElementById("male");
      }
      if (document.getElementById("female").checked) {
        genderInput = document.getElementById("female");
      }

      if (!nameInput.value.trim()) return;
      if (!DOBInput.value.trim()) return;
      if (!genderInput.value.trim()) return;
      if (!phoneInput.value.trim()) return;
      if (!emailInput.value.trim()) return;
      if (!flatInput.value.trim()) return;
      if (!areaInput.value.trim()) return;
      if (!townInput.value.trim()) return;
      if (!pincodeInput.value.trim()) return;
      if (!stateInput.value.trim()) return;

      editBtn.textContent = "Edit";
      editBtn.classList.add("edit");
      inputField.forEach((input) => {
        input.classList.add("input-disable");
      });

      alert("Data Add Successfully");
      eel.get_user_ID()((id) => {
        eel.update_user(
          id,
          nameInput.value,
          DOBInput.value,
          genderInput.value,
          phoneInput.value,
          emailInput.value,
          flatInput.value,
          areaInput.value,
          landmarkInput.value,
          townInput.value,
          pincodeInput.value,
          stateInput.value
        );
      });
    }
  });
};

getUserFeald();

const getUserData = () => {
  eel.get_user_ID()((id) => {
    eel.userInfo(id)((user) => {
      console.log(user[0]);
      const { user_info } = user[0];
      console.log(user_info);
      const editBtn = document.querySelector(".edit-btn");
      const nameInput = document.querySelector(".name-input");
      nameInput.value = user_info.user_name;
      const DOBInput = document.querySelector(".dob-input");
      DOBInput.value = user_info.user_DOB;
      const phoneInput = document.querySelector(".phone-input");
      phoneInput.value = user_info.user_phoneNo;
      const emailInput = document.querySelector(".email-input");
      emailInput.value = user_info.user_email;
      const flatInput = document.querySelector(".flat-input");
      flatInput.value = user_info.user_Add.flat_number;
      const areaInput = document.querySelector(".area-input");
      areaInput.value = user_info.user_Add.area_street;
      const landmarkInput = document.querySelector(".landmark-input");
      landmarkInput.value = user_info.user_Add.landmark;
      const townInput = document.querySelector(".town-input");
      townInput.value = user_info.user_Add.town_city;
      const pincodeInput = document.querySelector(".pincode-input");
      pincodeInput.value = user_info.user_Add.pincode;
      const stateInput = document.querySelector(".state-input");
      stateInput.value = user_info.user_Add.state_name;

      if (user_info.user_gender == "male") {
        document.getElementById("male").checked = true;
      }
      if (user_info.user_gender == "female") {
        document.getElementById("female").checked = true;
      }
    });
  });
};

getUserData();
