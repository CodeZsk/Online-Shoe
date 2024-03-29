const main = document.querySelector(".main");

window.addEventListener("load", (event) => {
  let result = navigator.onLine;
  console.log(result ? onLineHtml() : oflineHtml());
});

window.addEventListener("offline", (event) => {
  oflineHtml();
});

function oflineHtml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    main.innerHTML = this.responseText;
  };
  xhttp.open("GET", "../utils-Html/noNetwork.html");
  xhttp.send();
}

window.addEventListener("online", (event) => {
  onLineHtml();
});

function onLineHtml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    main.innerHTML = this.responseText;
    onlineContainer();
  };
  xhttp.open("GET", "./main.html");
  xhttp.send();
}

function onlineContainer() {
  const home = document.querySelector(".brandimage");
  const search = document.querySelector(".search");
  const setting = document.querySelector(".setting");
  const cartBtn = document.querySelector(".cart");
  const notificationBtn = document.querySelector(".notification");

  renderSingleProduct();
  function renderSingleProduct() {
    const img1 = document.querySelector(".img-1");
    const img2 = document.querySelector(".img-2");
    const img3 = document.querySelector(".img-3");
    const img4 = document.querySelector(".img-4");

    const addToCartBtn = document.querySelector(".cart-button");
    const allproduct = document.querySelector(".all");
    allproduct.addEventListener("click", () => allProducts("All"));

    const menProducts = document.querySelector(".men");
    menProducts.addEventListener("click", () => allProducts("Men"));
    const womenProducts = document.querySelector(".women");
    womenProducts.addEventListener("click", () => allProducts("Women"));
    const unisexProducts = document.querySelector(".unisex");
    unisexProducts.addEventListener("click", () => allProducts("Unisex"));
    const buyBtn = document.querySelector(".buynow");

    const productName = document.querySelector(".name");
    const quantity = document.querySelector(".quantity");
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
      console.log(product);
      getProduct(product[0]);
    });

    const getProduct = async (id) => {
      return await eel.getSingleProduct(id)((product) =>
        renderProduct(product)
      );
    };

    const renderProduct = (product) => {
      console.log(product);
      img1.setAttribute("src", product.img[0]);
      img2.setAttribute("src", product.img[1]);
      img3.setAttribute("src", product.img[2]);
      img4.setAttribute("src", product.img[3]);

      productName.textContent = product.name;
      quantity.value = product.availability.quantity;
      productName.setAttribute("data-id", product._id);
      price.textContent = `₹ ${product.price}`;
      const element = document.createElement("div");
      element.style.backgroundColor = product.availability.color;
      colorContainer.appendChild(element);
      for (let i = 0; i < product.availability.size.length; i += 2) {
        const element = document.createElement("div");
        element.textContent = product.availability.size[i];
        element.classList.add("boxofsizes");
        sizeContainer.appendChild(element);
      }
      description.textContent = product.description;
      renderReview(product);
    };

    addToCartBtn.addEventListener("click", () => {
      eel.get_user_ID()((id) => {
        console.log(id);
        eel.update_user_cart_add(id, productName.getAttribute("data-id"));
        alert("Added product");
      });
      console.log("updated cart");
      return;
    });

    buyBtn.addEventListener("click", () => {
      eel.getSinglePageData()((id) => {
        eel.getSingleProduct(id[0])((product) => {
          if (product.availability.quantity <= 0) {
            return;
          } else {
            if (product) {
              buy(product);
            } else {
              return;
            }
          }
        });
      });
    });

    // review

    function renderReview(product) {
      const reviewContainer = document.querySelector(".review-container-html");
      const review = document.createElement("div");
      review.classList.add("review-container");
      if (!product.reviews) {
        return;
      }
      for (let i = 0; i < product.reviews.length; i++) {
        const reviewBox = document.createElement("div");
        reviewBox.classList.add("review-box");
        const userStar = document.createElement("div");
        userStar.classList.add("user-star");
        const username = document.createElement("h3");
        const spanStar = document.createElement("span");
        spanStar.classList.add("star-container");
        const reviewParagraph = document.createElement("p");

        username.textContent = product.reviews[i].username;
        console.log(product.reviews.star);
        for (let j = 0; j < parseInt(product.reviews[i].star); j++) {
          const star = document.createElement("i");
          star.classList.add("fa-solid");
          star.classList.add("fa-star");
          spanStar.appendChild(star);
        }

        userStar.appendChild(username);
        userStar.appendChild(spanStar);

        reviewParagraph.textContent = product.reviews[i].comment;
        reviewBox.appendChild(userStar);
        reviewBox.appendChild(reviewParagraph);

        review.appendChild(reviewBox);
        reviewContainer.appendChild(review);
      }
    }
  }

  async function allProducts(gender) {
    await eel.setPageData(gender);
    window.location.href = `../section-component/filterpage.html`;
  }

  search.addEventListener("change", async () => {
    if (!search.value.trim()) {
      return;
    }
    await eel.setSearchPageData(search.value.trim());
    window.location.href = "../section-component/filterpage.html";
  });

  home.addEventListener("click", () => {
    eel.getSinglePageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../home-component/dashboard.html";
  });

  cartBtn.addEventListener("click", () => {
    eel.setSettingPageData("cart");
    eel.getSinglePageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  notificationBtn.addEventListener("click", () => {
    eel.setSettingPageData("order");
    eel.getSinglePageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  setting.addEventListener("click", () => {
    eel.getSinglePageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  const displayContainer = document.querySelector(".displaypicturecont");

  function buy(product) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      document.querySelector(".displaypicturecont").innerHTML =
        this.responseText;
      userFn(product);
      const editbtn = document.querySelector(".edit");
      editbtn.addEventListener("click", openeditpage);
      function openeditpage() {
        console.log("working..");
        window.location.href = "../setting-component/setting.html";
      }
      const goBackBtn = document.querySelector(".go-back");
      goBackBtn.addEventListener("click", () => {
        singleProduct();
      });
    };
    xhttp.open("GET", "./buy.html");
    xhttp.send();
  }

  const userFn = (product) => {
    eel.get_user_ID()((id) => {
      eel.userInfo(id)((user) => {
        const quantity = document.querySelector(".quantity-input");
        quantity.addEventListener("keydown", (e) => e.preventDefault());
        buyPage(product, user[0]);
      });
    });
  };

  function singleProduct() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      document.querySelector(".displaypicturecont").innerHTML =
        this.responseText;
      renderSingleProduct();
    };
    xhttp.open("GET", "./product.html");
    xhttp.send();
  }

  function buyPage(product, user) {
    const productInput = document.querySelector(".product-input");
    const usernameInput = document.querySelector(".username-input");
    const phoneInput = document.querySelector(".phone-input");
    const emailInput = document.querySelector(".email-input");
    const onBuyBtn = document.querySelector(".buynow-btn button");
    const flatNo = document.querySelector(".flat-no");
    const address = document.querySelector(".address-input");
    const landmark = document.querySelector(".landmark-input");
    const townCity = document.querySelector(".towncity-input");
    const state = document.querySelector(".state-input");
    const pincode = document.querySelector(".pincode-input");

    const quantity = document.querySelector(".quantity-input");
    const price = document.querySelector(".price-input");
    quantity.setAttribute("max", product.availability.quantity);
    price.value = product.price;
    quantity.addEventListener("change", () => {
      let value = quantity.value;
      let total = product.price * value;
      price.value = total;
    });

    const sizeSelecter = document.querySelector(".size-input");
    let size = sizeSelecter.options[sizeSelecter.selectedIndex].value;

    productInput.value = product.name;
    usernameInput.value = user.user_info.user_name;
    phoneInput.value = user.user_info.user_phoneNo;
    emailInput.value = user.email;
    flatNo.value = user.user_info.user_Add.flat_number;
    address.value = user.user_info.user_Add.area_street;
    landmark.value = user.user_info.user_Add.landmark;
    townCity.value = user.user_info.user_Add.town_city;
    state.value = user.user_info.user_Add.state_name;
    pincode.value = user.user_info.user_Add.pincode;

    onBuyBtn.addEventListener("click", () => {
      if (!usernameInput.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!phoneInput.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!flatNo.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!address.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!landmark.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!townCity.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!state.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!pincode.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Orlder"
        );
        return;
      }
      if (!usernameInput.value.trim()) {
        alert(
          "Please fill Your information in User Setting to Place Your Order"
        );
        return;
      }

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const bY = parseInt(user.user_info.user_DOB.split("-")[0]);
      const bM = parseInt(user.user_info.user_DOB.split("-")[1]);
      let age = null;

      if (currentMonth > bM) {
        age = currentYear - bY;
      } else {
        age = currentYear - bY - 1;
      }

      const orderDate = today.toLocaleDateString();

      let isConfirmed = confirm("Are you sure you want to Place this order");

      if (isConfirmed) {
        eel.getVerificationCode()((code) => {
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "onlineshoes69@gmail.com",
            Password: "0D17FC3473A6F7434D91FFEBF83CE82DF3C2",
            To: emailInput.value,
            From: "onlineshoes69@gmail.com",
            Subject: "Confirm Your Order",
            Body: `
            hey ${usernameInput.value} 
            ${(document.innerHTML = `<br>`)}
            We Have resived Your Order for 
            ${(document.innerHTML = `<br>`)}
            Product Name: ${productInput.value} of Price: ${
              price.value
            } to Confirm Your Order here is Your Order Verification Code
            \n
            ${(document.innerHTML = `<h2>${code}</h2>`)}
            `,
          }).then((message) => {
            if (message == "OK") {
              let confOrder = prompt(
                "Enter Order Verification Code \nWhich has Sent to Your Email Address"
              );
              if (!confOrder.trim()) return;
              if (confOrder == code) {
                eel.set_order(
                  orderDate,
                  product._id,
                  product.name,
                  price.value,
                  quantity.value,
                  size,
                  product.type,
                  product.gender_type,
                  product.availability.color,
                  user._id,
                  user.user_info.user_name,
                  emailInput.value,
                  user.user_info.user_gender,
                  age
                )((res) => {
                  if (res.status === "Ok") {
                    let newQuantity =
                      parseInt(product.availability.quantity) - quantity.value;
                    console.log(newQuantity);
                    eel.update_product_quantity(product._id, newQuantity);
                  }
                });
                alert("Order Placed Successfully");
                singleProduct();
              } else {
                alert("Confirmation Code does not Match");
              }
            } else {
              alert("Email Not Found");
            }
          });
        });
      } else {
        return;
      }
    });
  }
}
