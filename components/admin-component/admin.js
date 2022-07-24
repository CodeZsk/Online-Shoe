const logOutBtn = document.querySelector(".log-out");
const addPageBtn = document.querySelector(".add-product");

const mainPage = document.querySelector(".detailspage");
const productadminBtn = document.querySelector(".product-btn");
const order = document.querySelector("#order");

order.addEventListener("click", () => {
  const orderDetails = order.options[order.selectedIndex];
  console.log("hello wrold");
  if (orderDetails.value == "select") {
    orderHtml();
  }
});

productadminBtn.addEventListener("click", adminHtml);

addPageBtn.addEventListener("click", addProductHtml);

function orderHtml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    mainPage.innerHTML = this.responseText;
    renderOrder();
    addPageBtn.classList.add("hide-btn");
  };
  xhttp.open("GET", "./order.html");
  xhttp.send();
}

function addProductHtml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    mainPage.innerHTML = this.responseText;
    addPageBtn.classList.add("hide-btn");
    const addProductBtn = document.querySelector(".btn");
    addProduct(addProductBtn);
  };
  xhttp.open("GET", "./productadmin.html");
  xhttp.send();
}

const addProduct = (addProductBtn) => {
  addProductBtn.addEventListener("click", () => {
    const productName = document.querySelector(".name-input");
    const productType = document.querySelector("#product-type");
    const type = productType.options[productType.selectedIndex];
    const productGenderType = document.querySelector("#product-gender-type");
    const genderType =
      productGenderType.options[productGenderType.selectedIndex];
    const description = document.querySelector(".desc-input");
    const productPrice = document.querySelector(".price-input");
    const quantity = document.querySelector(".quantity-input");
    const color = document.querySelector(".color-input");
    const productCompany = document.querySelector(".company-input");
    const productImg1 = document.querySelector(".img1 input");
    const productImg2 = document.querySelector(".img2 input");
    const productImg3 = document.querySelector(".img3 input");
    const productImg4 = document.querySelector(".img4 input");

    console.log("Product");
    console.log(type);
    console.log(genderType);

    if (!productName.value.trim()) return;
    if (!productPrice.value.trim()) return;
    if (!color.value.trim()) return;
    if (!quantity.value.trim()) return;
    if (!genderType) return;
    if (!type) return;
    if (!productImg1.value) return;
    if (!productImg2.value) return;
    if (!productImg3.value) return;
    if (!productImg4.value) return;
    if (!description.value.trim()) return;
    if (!productCompany.value.trim()) return;

    console.log("Product last");

    let confMass = prompt(
      "Do you want to Add a new product type 'YES' to Confirm"
    );
    if (confMass == "YES") {
      eel.set_product(
        productName.value,
        parseInt(productPrice.value),
        color.value,
        quantity.value,
        genderType.value,
        type.value,
        productImg1.value,
        productImg2.value,
        productImg3.value,
        productImg4.value,
        description.value,
        productCompany.value
      );
      alert("Product Added successfully");
      adminHtml();
    } else {
      return;
    }
  });
};

function editProductHtml(product) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    mainPage.innerHTML = this.responseText;
    addPageBtn.classList.add("hide-btn");
    const editProductBtn = document.querySelector(".btn");
    editProductBtn.textContent = "Update Product";
    editProduct(editProductBtn, product);
  };
  xhttp.open("GET", "./productadmin.html");
  xhttp.send();
}

const editProduct = (addProductBtn, product) => {
  const productName = document.querySelector(".name-input");
  const productType = document.querySelector("#product-type");
  const productGenderType = document.querySelector("#product-gender-type");
  const description = document.querySelector(".desc-input");
  const productPrice = document.querySelector(".price-input");
  const quantity = document.querySelector(".quantity-input");
  const color = document.querySelector(".color-input");
  const productCompany = document.querySelector(".company-input");
  const productImg1 = document.querySelector(".img1 input");
  const productImg2 = document.querySelector(".img2 input");
  const productImg3 = document.querySelector(".img3 input");
  const productImg4 = document.querySelector(".img4 input");

  // genderType.value = product.gender_type;
  // type.value = product.type;

  if (product.type == "Sneaker") {
    document.querySelector(".o1").selected = "Selected";
  } else if (product.type == "Sports Shoes") {
    document.querySelector(".o2").selected = "Selected";
  } else {
    document.querySelector(".o3").selected = "Selected";
  }

  if (product.gender_type == "Men") {
    document.querySelector(".oMen").selected = "Selected";
  } else if (product.genderType == "Women") {
    document.querySelector(".oWomen").selected = "Selected";
  } else {
    document.querySelector(".oUnisex").selected = "Selected";
  }
  productName.value = product.name;
  productPrice.value = product.price;
  color.value = product.availability.color;
  quantity.value = product.availability.quantity;
  productImg1.value = product.img[0];
  productImg2.value = product.img[1];
  productImg3.value = product.img[2];
  productImg4.value = product.img[3];
  description.value = product.description;
  productCompany.value = product.company;
  addProductBtn.addEventListener("click", () => {
    const type = productType.options[productType.selectedIndex];
    const genderType =
      productGenderType.options[productGenderType.selectedIndex];
    console.log(product);

    console.log("Product");
    console.log(type);
    console.log(genderType);

    if (!productName.value.trim()) return;
    if (!productPrice.value.trim()) return;
    if (!color.value.trim()) return;
    if (!quantity.value.trim()) return;
    if (!genderType) return;
    if (!type) return;
    if (!productImg1.value) return;
    if (!productImg2.value) return;
    if (!productImg3.value) return;
    if (!productImg4.value) return;
    if (!description.value.trim()) return;
    if (!productCompany.value.trim()) return;

    console.log("Product last");

    let confMass = prompt(
      "Do you want to Update a product type 'YES' to Confirm"
    );
    if (confMass == "YES") {
      eel.update_product(
        product._id,
        productName.value,
        productPrice.value,
        color.value,
        quantity.value,
        genderType.value,
        type.value,
        productImg1.value,
        productImg2.value,
        productImg3.value,
        productImg4.value,
        description.value,
        productCompany.value
      );
      alert("Product Added successfully");
      adminHtml();
    } else {
      return;
    }
  });
};

function adminHtml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    mainPage.innerHTML = this.responseText;
    addPageBtn.classList.remove("hide-btn");
    renderProduct();
  };

  xhttp.open("GET", "./admin.html");
  xhttp.send();
}

const renderProduct = () => {
  const table = document.querySelector(".detailspage table");
  eel.getAllProducts()((product) => {
    product.map((product) => {
      const tr = document.createElement("tr");
      const td_id = document.createElement("td");
      const td_name = document.createElement("td");
      const td_type = document.createElement("td");
      const td_quantity = document.createElement("td");
      const td_price = document.createElement("td");
      const td_color = document.createElement("td");
      const td_edit = document.createElement("td");
      const td_delete = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      tr.setAttribute("data-id", product._id);
      td_id.textContent = product._id;
      td_name.textContent = product.name;
      td_type.textContent = product.type;
      td_quantity.textContent = product.availability.quantity;
      td_price.textContent = product.price;
      td_color.textContent = product.availability.color;
      td_edit.appendChild(editBtn);
      td_edit.addEventListener("click", () => {
        eel.getSingleProduct(product._id)((product) =>
          editProductHtml(product)
        );
      });
      td_delete.appendChild(deleteBtn);
      td_delete.addEventListener("click", () => {
        eel.getSingleProduct(product._id)((product) => {
          const isDeleteProduct = prompt(
            `Do you want to delete a product \n ID: ${product._id}, Type 'YES'`
          );
          if (isDeleteProduct == "YES") {
            eel.delete_single_product(id)((res) => {
              if (res.status == "deleted") {
                alert("Product deleted successfully");
                adminHtml();
              }
            });
          }
        });
      });

      tr.appendChild(td_id);
      tr.appendChild(td_name);
      tr.appendChild(td_type);
      tr.appendChild(td_quantity);
      tr.appendChild(td_price);
      tr.appendChild(td_color);
      tr.appendChild(td_edit);
      tr.appendChild(td_delete);
      table.appendChild(tr);
    });
  });
};

const renderOrder = () => {
  const table = document.querySelector(".detailspage table");
  eel.getAllOrders()((orders) => {
    orders.map((order) => {
      console.log(order);
      const tr = document.createElement("tr");
      const td_Oid = document.createElement("td");
      const td_Cid = document.createElement("td");
      const td_Pid = document.createElement("td");
      const td_productName = document.createElement("td");
      const td_productQuantity = document.createElement("td");
      const td_productPrice = document.createElement("td");
      const td_productColor = document.createElement("td");
      const td_Oedit = document.createElement("td");
      const td_status = document.createElement("td");

      const status = document.createElement("select");
      status.disabled = true;

      const optionPandding = document.createElement("option");
      optionPandding.setAttribute("value", "Pending");
      optionPandding.textContent = "Pending";
      const optionOnProcess = document.createElement("option");
      optionOnProcess.setAttribute("value", "On Process");
      optionOnProcess.textContent = "On Process";
      const optionDelivered = document.createElement("option");
      optionDelivered.setAttribute("value", "Delivered");
      optionDelivered.textContent = "Delivered";

      if (order.order.order_status == "Pending") {
        optionPandding.selected = "Selected";
      } else if (order.order.order_status == "On Process") {
        optionOnProcess.selected = "Selected";
      } else {
        optionDelivered.selected = "Selected";
      }

      status.appendChild(optionPandding);
      status.appendChild(optionOnProcess);
      status.appendChild(optionDelivered);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        if (status.disabled) {
          status.disabled = false;
          editBtn.textContent = "Cancel";
          status.addEventListener("change", () => {
            editBtn.textContent = "Save";
          });
        } else {
          var value = status.options[status.selectedIndex].value;
          if (editBtn.textContent == "Save") {
            console.log(order._id);
            eel.update_order_status(order._id, value);
            console.log(value);
          }
          status.disabled = true;
          editBtn.textContent = "Edit";
        }
      });

      tr.setAttribute("data-id", order._id);
      td_Oid.textContent = order._id;
      td_Cid.textContent = order.user.user_id;
      td_Pid.textContent = order.product.product_id;
      td_productName.textContent = order.product.product_name;
      td_productQuantity.textContent = order.product.product_quantity;
      td_productPrice.textContent = order.product.product_price;
      td_productColor.textContent = order.product.product_color;

      td_status.appendChild(status);
      td_Oedit.appendChild(editBtn);

      tr.appendChild(td_Oid);
      tr.appendChild(td_Cid);
      tr.appendChild(td_Pid);
      tr.appendChild(td_productName);
      tr.appendChild(td_productQuantity);
      tr.appendChild(td_productPrice);
      tr.appendChild(td_productColor);
      tr.appendChild(td_status);
      tr.appendChild(td_Oedit);
      table.appendChild(tr);
    });
  });
};

renderOrder();

logOutBtn.addEventListener("click", () => {
  window.location.href = "../login-component/SignUpLogin.html";
});
