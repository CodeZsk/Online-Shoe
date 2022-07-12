const home = document.querySelector(".brandimage");
const search = document.querySelector(".search");
const setting = document.querySelector(".setting");
const cartBtn = document.querySelector(".cart");

renderSingleProduct();
function renderSingleProduct() {
  const img1 = document.querySelector(".img-1");
  const img2 = document.querySelector(".img-2");
  const img3 = document.querySelector(".img-3");
  const img4 = document.querySelector(".img-4");

  const addToCartBtn = document.querySelector(".cart-button");
  const allproduct = document.querySelector(".all");
  allproduct.addEventListener("click", () => allProducts());

  const menProducts = document.querySelector(".men");
  menProducts.addEventListener("click", () => allProducts("Men"));
  const womenProducts = document.querySelector(".women");
  womenProducts.addEventListener("click", () => allProducts("Women"));
  const unisexProducts = document.querySelector(".unisex");
  unisexProducts.addEventListener("click", () => allProducts("Unisex"));
  const buyBtn = document.querySelector(".buynow");

  const productName = document.querySelector(".name");
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
    getProduct(product[0]);
  });

  const getProduct = async (id) => {
    return await eel.getSingleProduct(id)((product) => renderProduct(product));
  };

  const renderProduct = (product) => {
    console.log(product);
    img1.setAttribute("src", product.img[0]);
    img2.setAttribute("src", product.img[1]);
    img3.setAttribute("src", product.img[2]);
    img4.setAttribute("src", product.img[3]);

    productName.textContent = product.name;
    productName.setAttribute("data-id", product._id);
    price.textContent = product.price;
    for (let i = 0; i < product.availability.color.length; i++) {
      const element = document.createElement("div");
      element.style.backgroundColor = product.availability.color[i];
      colorContainer.appendChild(element);
    }
    for (let i = 0; i < product.availability.size.length; i += 2) {
      const element = document.createElement("div");
      element.textContent = product.availability.size[i];
      element.classList.add("boxofsizes");
      sizeContainer.appendChild(element);
    }
    description.textContent = product.description;
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
    buy();
    eel.getSinglePageData()((id) => {
      eel.getSingleProduct(id[0])((product) => {
        userFn(product);
      });
    });

    const userFn = (product) => {
      eel.get_user_ID()((id) => {
        return eel.userInfo(id)((user) => {
          console.log(user);
          buyPage(product, user[0]);
        });
      });
    };
  });
}

async function allProducts(gender) {
  await eel.setPageData(gender);
  window.location.href = `../section-component/filterpage.html`;
}

search.addEventListener("change", () => {
  if (!search.value.trim()) {
    return;
  }
  eel.setSearchPageData(search.value.trim());
  window.location.href = "../section-component/filterpage.html";
});

home.addEventListener("click", () => {
  window.location.href = "../home-component/dashboard.html";
});

cartBtn.addEventListener("click", () => {
  eel.setPageData("cart");
  window.location.href = "../setting-component/setting.html";
});

setting.addEventListener("click", () => {
  window.location.href = "../setting-component/setting.html";
});

const displayContainer = document.querySelector(".displaypicturecont");

function buy() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.querySelector(".displaypicturecont").innerHTML = this.responseText;
    const goBackBtn = document.querySelector(".go-back");
    goBackBtn.addEventListener("click", () => {
      singleProduct();
    });
  };
  xhttp.open("GET", "./buy.html");
  xhttp.send();
}

function singleProduct() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.querySelector(".displaypicturecont").innerHTML = this.responseText;
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

  productInput.value = product.name;
  usernameInput.value = user.user_info.user_name;
  phoneInput.value = user.user_info.user_phoneNo;
  emailInput.value = user.user_info.user_email;

  onBuyBtn.addEventListener("click", () => {
    console.log("hello world");
    let today = new Date();
    const age = user.user_info.user_DOB - today.getDay();
    console.log(age);
    console.log(today);
    // eel.set_order(
    //   orderStatus,
    //   product._id,
    //   product.name,
    //   product.price,
    //   product.type,
    //   product.gender_type,
    //   product.availability.color,
    //   user._id,
    //   user.user_info.user_name,
    //   user.user_info.user_gender,
    //   age
    // );
  });
}
