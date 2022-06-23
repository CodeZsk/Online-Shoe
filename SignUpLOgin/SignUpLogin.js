// targeting the container
const signIn = document.querySelector(".signIn");
const signUp = document.querySelector(".signUp");
// targeting slogan
const inUp = document.querySelector(".in-up");
const slogan = document.querySelector(".slogan");
// targeting signIn user input
const inUsername = document.querySelector(".in-username");
const inPassword = document.querySelector(".in-password");
// targeting signUp user input
const outUsername = document.querySelector(".out-username");
const outPassword = document.querySelector(".out-password");
const outConfPassword = document.querySelector(".out-conf-password");
const outEmail = document.querySelector(".out-email");
const outQuestion = document.querySelector(".out-question");

// targeting Btn
const signInBtn = document.querySelector(".frontshoe");
const signUpBtn = document.querySelector(".backshoe");

const forgotPassword = document.querySelector(".forgot-password");

// variable
let list = [];
// eventlistener
signInBtn.addEventListener("click", () => {
  if (signUp.classList.contains("hide")) {
    checkSignIn(inUsername, inPassword);
    inUsername.value = "";
    inPassword.value = "";
    return;
  }
  if (signIn.classList.contains("hide")) {
    signIn.classList.remove("hide");
  }
  //   checkSignIn(inUsername, inPassword);
  signUp.classList.add("hide");
  inUp.textContent = "IN";
  slogan.textContent = "Explore shoes";
});

signUpBtn.addEventListener("click", () => {
  if (signIn.classList.contains("hide")) {
    checkSignUp(
      outUsername,
      outPassword,
      outConfPassword,
      outEmail,
      outQuestion
    );
    outUsername.value = "";
    outPassword.value = "";
    outConfPassword.value = "";
    outEmail.value = "";
    outQuestion.value = "";
    return;
  }
  if (signUp.classList.contains("hide")) {
    signUp.classList.remove("hide");
  }
  signIn.classList.add("hide");
  inUp.textContent = "UP";
  slogan.textContent = "Tie lace";
});

forgotPassword.addEventListener("click", () => {
  if (!inUsername.value.trim()) {
    alert("Please enter your username");
    return;
  }

  value = prompt("Which is Your favorite Shoe");
  console.log(value);

  if (value) {
    list.forEach((user) => {
      if (user.username === inUsername.value) {
        if (user.question === value) {
          newPass = prompt("Enter New password");
          user.password = newPass;
          return;
        } else {
          alert("Security Answer do not match");
          return;
        }
      }
    });
  }
});

checkSignIn = (username, password) => {
  if (!username.value.trim) return;
  if (!password.value.trim) return;
  if (password.value.length < 8) {
    alert("Please enter a valid password");
    return;
  }
  let check = true;
  list.forEach((user) => {
    if (user.username === username.value) {
      check = false;
      if (user.password === password.value) {
        alert("Welcome Back");
        return;
      } else {
        alert("password do not match");
        return;
      }
    }
  });
  if (check) {
    console.log(check);
    alert("Username dose not exists");
    return;
  }
};

checkSignUp = (username, password, confPassword, email, question) => {
  if (!username.value.trim()) return;
  if (!password.value.trim()) return;
  if (!confPassword.value.trim()) return;
  if (!email.value.trim()) return;
  if (!question.value.trim()) return;

  let Check = false;
  list.forEach((user) => {
    if (user.username === username.value) {
      Check = true;
    }
  });

  if (Check) {
    alert("Username already exists");
    return;
  }

  if (password.value.length < 8) {
    alert("Password must be grater than 8 characters");
    return;
  }
  if (password.value !== confPassword.value) {
    alert("Password do not match");
    return;
  }
  list.push({
    username: username.value,
    password: password.value,
    email: email.value,
    question: question.value,
  });
  alert("Successfully signUp");
  signInBtn.click();
  console.log(list);
};




// my code of modal 
const openModalBtn = document.querySelector(".toggle");
const modal = document.querySelector(".modal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

cancelBtn = document.querySelector(".cancel");

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


document.querySelector('.modal-back').addEventListener('click', () => {
    modal.style.display = "none";
})

// const newElement = document.createElement('div')
// newElement.innerHTML = '<p>Hello </p>'
// document.body.appendChild(newElement)

setTimeout(() => {
    console.log("after 5 sec")
}, 5000);