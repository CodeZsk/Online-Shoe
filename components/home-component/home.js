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

const cartBtn = document.querySelector(".cart");
cartBtn.addEventListener("click", () => {
  eel.setPageData("cart");
  window.location.href = "../setting-component/setting.html";
});

const search = document.querySelector(".search");
search.addEventListener("change", () => {
  if (!search.value.trim()) {
    return;
  }
  eel.setSearchPageData(search.value.trim());
  window.location.href = "../section-component/filterpage.html";
});
// const allproduct = document.querySelector(".more");
// allproduct.addEventListener("click", () => allProducts());

eel.getAllProducts()((product) => renderAll6(product, allhotProduct, "All"));
eel.getGenderProducts("Men")((product) =>
  renderAll6(product, divContainerMen, "Men")
);
eel.getGenderProducts("Women")((product) =>
  renderAll6(product, divContainerWomen, "Women")
);
eel.getGenderProducts("Unisex")((product) =>
  renderAll6(product, divContainerUnisex, "Unisex")
);

const renderAll6 = (products, container, gender) => {
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

    containerDiv.setAttribute("data-id", products[index]._id);
    containerDiv.addEventListener("click", () => {
      eel.setSinglePageData(containerDiv.getAttribute("data-id"));
      window.location.href = "../single-item-component/buynow.html";
    });

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






// using bot js 
const mic=document.querySelector(".mico");

const SpeechRecognition =window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();


recognition.onstart=function(){
    console.log(" speech reconition started ! ")
};

recognition.onresult=function(event){
    console.log(event)

    const spokenwords =event.results[0][0].transcript;
    console.log("spoken words are",spokenwords);
    computerSpeech(spokenwords);
};


function computerSpeech(words){
    const speech= new SpeechSynthesisUtterance();
    speech.lang="eng-US";
    speech.pitch=0.9;
    speech.volume =1;
    speech.rate =1;


    determineWords(speech,words);

    window.speechSynthesis.speak(speech);
}

function determineWords(speech,words){
    if (words.includes("how are you")){
        speech.text="I am Fine, Thank you";
    }
    if (words.includes("who am I")){
        speech.text= "I think you are member of sneakerheadhub";
    }
    if (words.includes("you will work right")){
        speech.text="i think this will work in your app okay cool dont be  scared lol lmao krishna";
    }
    if (words.includes("show me shoe")){
        speech.text="showing shoe";
        window.location.href = `../section-component/filterpage.html`;   
    }
    if (words.includes("show men shoes")){
      speech.text="showing men shoe";
      window.location.href = `../section-component/filterpage.html`;
    }
    if (words.includes("show women shoe")){
      speech.text="showing women shoe";
      window.location.href = `../section-component/filterpage.html`;
    }
    if (words.includes("show unisex shoes")){
      speech.text="showing unisex shoe";
      window.location.href = `../section-component/filterpage.html`;
    }
    if (words.includes("show shoes")){
      speech.text="showing shoes";
      window.location.href = `../section-component/filterpage.html`;
    }
    if (words.includes("show shoes")){
      speech.text="showing shoes";
      window.location.href = `../section-component/filterpage.html`;
    }
    if (words.includes("opencart")){
      speech.text="opening cart";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("opencard")){
      speech.text="opening cart";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open cart")){
      speech.text="opening cart";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open card")){
      speech.text="click on cart to see,what's in your cart ";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open profile")){
      speech.text="opening profile";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open profiles")){
      speech.text="opening profile";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("openprofile")){
      speech.text="opening profile";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open faq")){
      speech.text="opening faq";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("open FAQ")){
      speech.text="click on FAQ";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("show FAQ")){
      speech.text="click on FAQ";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("I have question")){
      speech.text="click on FAQ which is frequently asked question";
      window.location.href = `../setting-component/setting.html`;
    }
    if (words.includes("i have question")){
      speech.text="click on FAQ which is frequently asked question";
      window.location.href = `../setting-component/setting.html`;
    }





}

mic.addEventListener("click", () => {
    recognition.start()
});

