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
  const outer = document.querySelector(".outer");
  const all = document.querySelector(".all");
  const men = document.querySelector(".men");
  const women = document.querySelector(".women");
  const unisex = document.querySelector(".unisex");
  const home = document.querySelector(".brandimage");
  const search = document.querySelector(".search");
  const setting = document.querySelector(".setting");
  const cartBtn = document.querySelector(".cart");
  const notificationBtn = document.querySelector(".notification");

  all.addEventListener("click", () => loadDoc("All"));
  men.addEventListener("click", () => loadDoc("Men"));
  women.addEventListener("click", () => loadDoc("Women"));
  unisex.addEventListener("click", () => loadDoc("Unisex"));
  search.addEventListener("change", () => searchName(search.value.trim()));

  cartBtn.addEventListener("click", () => {
    eel.setSettingPageData("cart");
    eel.getPageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  notificationBtn.addEventListener("click", () => {
    eel.setSettingPageData("order");
    eel.getPageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  setting.addEventListener("click", () => {
    eel.getPageData()((product) => {
      eel.setBackPageData(product[0]);
    });
    window.location.href = "../setting-component/setting.html";
  });

  eel.getSearchPageData()((product) => {
    console.log(product);
    if (product) {
      searchName(product);
      return;
    }
    eel.getPageData()((product) => {
      console.log(product[0]);
      if (product[0] == "All") {
        getAllProducts();
        return;
      }
      getGenderProducts(product[0]);
    });
    return;
  });

  function searchName(name) {
    if (!name.trim()) {
      loadDoc("All");
      return;
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log("hello world");
      outer.innerHTML = nameSearch(name);
    };
    xhttp.open("GET", "filterpage.html", true);
    xhttp.send();
  }

  const nameSearch = (name) => {
    if (eel.searchByName(name)((product) => renderAll(product)) == undefined) {
      return null;
    }
    return eel.searchByName(name)((product) => {
      return renderAll(product);
    });
  };

  const singleProduct = (id) => {
    console.log(id);
    eel.setSinglePageData(id);
    window.location.href = "../single-item-component/buynow.html";
  };

  function loadDoc(gender) {
    const xhttp = new XMLHttpRequest();
    eel.setPageData(gender);
    if (gender === "All") {
      xhttp.onload = function () {
        console.log("hello world");
        outer.innerHTML = getAllProducts();
        filterHtml();
      };
    } else {
      xhttp.onload = function () {
        outer.innerHTML = getGenderProducts(gender);
        filterHtml();
      };
    }
    xhttp.open("GET", "filterpage.html", true);
    xhttp.send();
  }

  function filterHtml() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log("hello world");
      document.querySelector(".filtersearch").innerHTML = this.responseText;
      brand = [];
      type = null;
      price = {};

      filterType();
      filterBrand();
      filterPrice();
    };
    xhttp.open("GET", "./filter.html", true);
    xhttp.send();
  }

  function loadFilter() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log("hello world");
      outer.innerHTML = getFilterProduct();
      // filterHtml();
      // filter();
    };
    xhttp.open("GET", "filterpage.html", true);
    xhttp.send();
  }

  function noResultHtml() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      console.log("hello world");
      outer.innerHTML = this.responseText;
      // filterHtml();
      // filter();
    };
    xhttp.open("GET", "../utils-Html/noResult.html", true);
    xhttp.send();
  }

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
      eel.getGenderProducts(gender)((product) => {
        renderAll(product);
      }) == undefined
    ) {
      return null;
    }
    return eel.getGenderProducts(gender)((product) => {
      return renderAll(product);
    });
  };

  const renderAll = (product) => {
    console.log(product);
    if (product.length == 0) {
      console.log("Product in not fonr");
      return noResultHtml();
    }
    for (let i = 0; i < product.length; i++) {
      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const img = document.createElement("img");
      img.setAttribute("src", product[i].img[0]);
      img.setAttribute("data-id", product[i]._id);
      img.addEventListener("click", () =>
        singleProduct(img.getAttribute("data-id"))
      );
      const divMiddle = document.createElement("div");
      divMiddle.classList.add("middle");
      const divHide = document.createElement("div");
      divHide.classList.add("hide");
      divHide.textContent = `${product[i].price} ₹`;

      const divDesCCard = document.createElement("div");
      divDesCCard.classList.add("desccard");
      const h6 = document.createElement("h6");
      h6.setAttribute("data-id", product[i]._id);
      h6.textContent = product[i].name;
      h6.addEventListener("click", () =>
        singleProduct(h6.getAttribute("data-id"))
      );
      // const br = document.createElement("br");
      const cartBtn = document.createElement("button");
      cartBtn.textContent = "ADD TO CART";
      cartBtn.addEventListener("click", () => {
        // console.log(id);
        eel.get_user_ID()((id) => {
          console.log(id);
          eel.update_user_cart_add(id, h6.getAttribute("data-id"));
          alert("Product Added Successfully");
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
      divDesCCard.appendChild(h6);
      divDesCCard.appendChild(cartBtn);
      // divDesCCard.appendChild(span);
    }
    // return 0;
  };

  let brand = [];
  let type = null;
  let price = {};

  function getFilterProduct() {
    if (
      eel.getPageData()((gender) => {
        eel.filterBy(
          type,
          gender[0],
          brand,
          price
        )((product) => {
          renderAll(product);
        });
      }) == undefined
    ) {
      return null;
    }
    eel.getPageData()((gender) => {
      eel.filterBy(
        type,
        gender[0],
        brand
      )((product) => {
        console.log("helo woflds");
        renderAll(product);
      });
    });
  }

  function filterType() {
    const typeSelecter = document.querySelectorAll(
      ".Sneaker, .Casual-Shoes, .Sports-Shoes"
    );
    typeSelecter.forEach((typeTag) => {
      typeTag.addEventListener("click", () => {
        type = typeTag.innerText;
        loadFilter();
      });
    });
  }
  function filterBrand() {
    const brandSelecter = document.querySelectorAll(
      ".nike, .adidas, .puma, .converse"
    );
    brandSelecter.forEach((brandTag) => {
      brandTag.addEventListener("change", () => {
        if (brandTag.checked == true) {
          brand.push(brandTag.value);
        } else {
          let i = brand.indexOf(brandTag.value);
          if (i != -1) {
            brand.splice(i, 1);
          }
        }
        loadFilter();
      });
    });
  }
  function filterPrice() {
    const priceSelecter = document.querySelectorAll(".price-filter");
    const pirceFilterBtn = document.querySelector(".price-filter-btn");
    priceSelecter.forEach((priceTag) => {
      priceTag.addEventListener("click", () => {
        let priceArr = priceTag.innerText.split("-");
        price = {
          low: parseInt(priceArr[0].split(",").join("")),
          high: parseInt(priceArr[1].split(",").join("")),
        };
        loadFilter();
        console.log(price);
      });
    });
    pirceFilterBtn.addEventListener("click", () => {
      const lowInput = document.querySelector(".price-filter-low");
      const highInput = document.querySelector(".price-filter-high");

      if (!lowInput.value.trim()) return;
      if (!highInput.value.trim()) return;

      price = {
        low: parseInt(lowInput.value),
        high: parseInt(highInput.value),
      };
      loadFilter();
    });
  }
  filterType();
  filterBrand();
  filterPrice();

  home.addEventListener("click", () => {
    window.location.href = "../home-component/dashboard.html";
  });
}
