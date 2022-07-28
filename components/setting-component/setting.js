const homeBtn = document.querySelector(".home");
const userBtn = document.querySelector(".user");
const cartBtn = document.querySelector(".cart");
const orderBy = document.querySelector(".order");
const logOutBtn = document.querySelector(".log-out");

logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../login-component/SignUpLogin.html";
});

eel.getSettingPageData()((data) => {
  console.log(data);
  if (data[0] === "cart") {
    cartHTML();
    return;
  } else if (data[0] === "order") {
    orderHTML();
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

    eel.get_user_ID()((id) => {
      // eel.userInfo(id)((order) => {
      //   console.log(order);
      //   // getOrderDetails(order);
      // });
      eel.getOrderByUserId(id)((orders) => {
        // console.log(order);
        orders.map((order) => {
          getOrderDetails(order);
        });
        const mybtn = document.querySelectorAll(".review-btn");
        console.log(mybtn);
        mybtn.forEach((reviewBtn) => {
          reviewBtn.addEventListener("click", () => {
            // console.log(reviewBtn.getAttribute("data-id"));
            reviewBtnHandler(
              reviewBtn.getAttribute("data-id"),
              reviewBtn.getAttribute("data-user-id"),
              reviewBtn.getAttribute("data-product-name"),
              reviewBtn.getAttribute("data-user-name"),
              reviewBtn.getAttribute("data-order-id")
            );
          });
        });

        // reviewBtn();
      });
    });
  };
  xhttp.open("GET", "./order.html");
  xhttp.send();
}

const getReviewData = () => {
  const mod = document.getElementById("review");
  const cut = document.getElementById("close-review");
  const selectStar = document.querySelector(".select-star");
  // const btns = document.querySelectorAll("#mybtn");
  let option = null;
  mod.style.display = "block";

  cut.onclick = function () {
    mod.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == mod) {
      mod.style.display = "none";
    }
  };
  var mb = document.querySelector(".modal-back");

  mb.onclick = function () {
    mod.style.display = "none";
  };
};

const reviewBtnHandler = (productId, userId, productN, userN, orderID) => {
  const mod = document.getElementById("review");
  const cut = document.getElementById("close-review");
  const selectStar = document.querySelector(".select-star");
  console.log(productId, userId, productN);
  // const btns = document.querySelectorAll("#mybtn");
  let option = null;
  mod.style.display = "block";

  cut.onclick = function () {
    mod.style.display = "none";
    selectStar.removeEventListener("change", handelSelectStar);
    submitBtn.removeEventListener("click", submitBtnHandler);
  };
  window.onclick = function (event) {
    if (event.target == mod) {
      mod.style.display = "none";
      selectStar.removeEventListener("change", handelSelectStar);
      submitBtn.removeEventListener("click", submitBtnHandler);
    }
  };
  var mb = document.querySelector(".modal-back");

  mb.onclick = function () {
    mod.style.display = "none";
    selectStar.removeEventListener("change", handelSelectStar);
    submitBtn.removeEventListener("click", submitBtnHandler);
  };

  const textArea = document.querySelector(".comment-area");
  const submitBtn = document.querySelector(".review-btn-submit");

  function handelSelectStar() {
    option = selectStar.options[selectStar.selectedIndex];
    console.log(option);
    console.log("hello world");
    console.log(textArea.value);
  }

  selectStar.addEventListener("change", handelSelectStar);

  const userName = document.querySelector(".user-name");
  userName.textContent = `User Name: ${userN}`;
  const productName = document.querySelector(".product-name");
  productName.textContent = `Product Name: ${productN}`;

  function submitBtnHandler() {
    if (!option.value.trim()) return;
    if (!textArea.value.trim()) return;
    console.log(option.value);
    eel.updateProductReview(
      productId,
      userId,
      userN,
      option.value,
      textArea.value
    )((res) => {
      if (res.status == "Ok") {
        eel.updateIsReview(orderID)((res) => {
          if (res.status == "Ok") {
            alert("Thank you for your review");
            orderHTML();
          }
        });
      } else {
        alert("something went wrong");
      }
    });
  }

  submitBtn.addEventListener("click", submitBtnHandler);
};

// userInfo;
const getOrderDetails = (orderDB) => {
  const { order, product, user } = orderDB;
  const activeTabel = document.querySelector(".active-table");
  const prevTabel = document.querySelector(".prev-table");

  if (order.order_status == "Delivered" || order.order_status == "Cancel") {
    const tr = document.createElement("tr");
    const productName = document.createElement("td");
    const productId = document.createElement("td");
    const orderID = document.createElement("td");
    const orderStatus = document.createElement("td");
    productName.textContent = product.product_name;
    productId.textContent = product.product_id;
    orderID.textContent = orderDB._id;
    orderStatus.textContent = order.order_status;
    tr.appendChild(productName);
    tr.appendChild(productId);
    tr.appendChild(orderID);
    tr.appendChild(orderStatus);
    if (order.order_status == "Cancel") {
      const cancelStatus = document.createElement("td");
      cancelStatus.textContent = "NA";
      tr.appendChild(cancelStatus);
    } else if (order.order_status == "Delivered" && order.is_reviewed) {
      const cancelStatus = document.createElement("td");
      cancelStatus.textContent = "Reviewed";
      tr.appendChild(cancelStatus);
    } else if (order.order_status == "Delivered" && !order.is_reviewed) {
      const tdBtn = document.createElement("td");
      const reviewBtn = document.createElement("button");
      reviewBtn.textContent = "Review";
      reviewBtn.setAttribute("id", "mybtn");
      reviewBtn.classList.add("review-btn");
      reviewBtn.setAttribute("data-id", product.product_id);
      reviewBtn.setAttribute("data-user-id", user.user_id);
      reviewBtn.setAttribute("data-product-name", product.product_name);
      reviewBtn.setAttribute("data-user-name", user.user_name);
      reviewBtn.setAttribute("data-order-id", orderDB._id);

      tdBtn.appendChild(reviewBtn);
      tr.appendChild(tdBtn);
    }
    prevTabel.appendChild(tr);
  } else {
    const tr = document.createElement("tr");
    const productName = document.createElement("td");
    const productId = document.createElement("td");
    const orderID = document.createElement("td");
    const orderStatus = document.createElement("td");

    const tdBtn = document.createElement("td");
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("reviewbtn");
    cancelBtn.addEventListener("click", () => {
      let isCancelled = confirm("Are you sure you want to cancel Your Order");
      console.log(order.order_status);
      if (isCancelled) {
        if (order.order_status === "Pending") {
          eel.update_order_status(
            orderDB._id,
            "Cancel"
          )((res) => {
            if (res.status == "Ok") {
              eel.getSingleProduct(product.product_id)((data) => {
                let newQuantity =
                  parseInt(data.availability.quantity) +
                  parseInt(product.product_quantity);
                console.log(newQuantity);
                eel.update_product_quantity(
                  data._id,
                  newQuantity
                )((res) => {
                  if (res.status == "Ok") {
                    alert("Order Cancel Successfully");
                    orderHTML();
                  }
                });
              });
            }
          });
        } else {
          eel.getVerificationCode()((code) => {
            Email.send({
              Host: "smtp.elasticemail.com",
              Username: "onlineshoes69@gmail.com",
              Password: "0D17FC3473A6F7434D91FFEBF83CE82DF3C2",
              To: user.user_email,
              From: "onlineshoes69@gmail.com",
              Subject: "Cancel Your Order",
              Body: `
                hey ${user.user_name} 
                ${(document.innerHTML = `<br>`)}
                We Have received cancellation request from your order 
                ${(document.innerHTML = `<br>`)}
                " Product Name: ${product.product_name} of Price: ${
                product.product_price
              } " to Confirm Your cancellation request here is Your Cancel Verification Code
                \n
                ${(document.innerHTML = `<h2>${code}</h2>`)}
              `,
            }).then((message) => {
              if (message == "OK") {
                let confCancel = prompt(
                  "Enter Cancel Verification Code \nWhich has Sent to Your Email Address"
                );
                if (!confCancel.trim()) return;
                if (confCancel == code) {
                  eel.update_order_status(
                    orderDB._id,
                    "Cancel"
                  )((res) => {
                    if (res.status == "Ok") {
                      eel.getSingleProduct(product.product_id)((data) => {
                        let newQuantity =
                          parseInt(data.availability.quantity) +
                          parseInt(product.product_quantity);
                        eel.update_product_quantity(
                          data._id,
                          newQuantity
                        )((res) => {
                          if (res.status == "Ok") {
                            alert("Order Cancel Successfully");
                            orderHTML();
                          }
                        });
                      });
                    }
                  });
                } else {
                  alert("Confirmation Code Dose Not Match");
                }
              } else {
                alert("Email Not Found");
              }
            });
          });
        }
      }
    });
    productName.textContent = product.product_name;
    productId.textContent = product.product_id;
    orderID.textContent = orderDB._id;
    orderStatus.textContent = order.order_status;
    tr.appendChild(productName);
    tr.appendChild(productId);
    tr.appendChild(orderID);
    tr.appendChild(orderStatus);
    tdBtn.appendChild(cancelBtn);
    tr.appendChild(tdBtn);
    activeTabel.appendChild(tr);
  }
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
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "REMOVE";
    cartBtn.addEventListener("click", () => {
      console.log("i was clicked");
      eel.get_user_ID()((id) => {
        eel.update_user_cart_remove(id, h4.getAttribute("data-id"));
        alert("Product removed successfully");
        cartHTML();
      });
    });

    outer.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(divMiddle);
    divMiddle.appendChild(divHide);
    divCard.appendChild(divDesCCard);
    divDesCCard.appendChild(h4);
    divDesCCard.appendChild(cartBtn);
  }
};

const singleProduct = (id) => {
  console.log(id);
  eel.setSinglePageData(id);
  window.location.href = "../single-item-component/buynow.html";
};

const getUserFeald = () => {
  const editBtn = document.querySelector(".edit-btn");
  const nameInput = document.querySelector(".name-input");
  const DOBInput = document.querySelector(".dob-input");
  let genderInput;
  const phoneInput = document.querySelector(".phone-input");
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
      emailInput.value = user[0].email;
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

// krishna js lol
var btn = document.getElementById("mybtn");
var moda = document.getElementById("mymodal");
var cutt = document.getElementById("close");

btn.onclick = function () {
  moda.style.display = "block";
};

cutt.onclick = function () {
  moda.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == moda) {
    moda.style.display = "none";
  }
};
var mb = document.querySelector(".modal-back");

mb.onclick = function () {
  moda.style.display = "none";
};

var cbtn = document.getElementById("customer");
var cmod = document.getElementById("customermodal");
var ccut = document.getElementById("customerclose");

cbtn.onclick = function () {
  cmod.style.display = "block";
};

ccut.onclick = function () {
  cmod.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == cmod) {
    cmod.style.display = "none";
  }
};
var mb = document.querySelector(".customermodal-back");

mb.onclick = function () {
  cmod.style.display = "none";
};

var fbtn = document.getElementById("faq");
var fmod = document.querySelector(".faqmodal");
var fcut = document.getElementById("faqclose");

fbtn.onclick = function () {
  fmod.style.display = "block";
};

fcut.onclick = function () {
  fmod.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == fmod) {
    fmod.style.display = "none";
  }
};
var fmb = document.querySelector(".faqmodalback");

fmb.onclick = function () {
  fmod.style.display = "none";
};
