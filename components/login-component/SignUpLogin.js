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

// targeting admin modal
// const admin=document.querySelector(".")

// auto login

// variable
let list = [];
// eventlistener
signInBtn.addEventListener("click", () => {
  if (signUp.classList.contains("hide")) {
    checkSignIn(inUsername, inPassword);
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
  let changePassword = confirm("Are you sure you want to change your password");
  if (changePassword) {
    if (!inUsername.value.trim()) {
      alert("Please enter your username");
      return;
    }
    eel.checkSignInDb(inUsername.value)((user) => {
      if (!user) {
        alert("user dose not exist");
        return;
      }
      updatePassword(inUsername.value, user.email);
    });
  } else {
    return;
  }

  function updatePassword(username, email) {
    eel.getVerificationCode()((code) => {
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "onlineshoes69@gmail.com",
        Password: "0D17FC3473A6F7434D91FFEBF83CE82DF3C2",
        To: email,
        From: "onlineshoes69@gmail.com",
        Subject: "Change Your Password",
        Body: `
        hey ${username}
        ${(document.innerHTML = `<br>`)}
        we have Received Password Change Request
        ${(document.innerHTML = `<br>`)}
        Here is Your Password Verification Code
        ${(document.innerHTML = `<br>`)}
        ${(document.innerHTML = `<h2>${code}</h2>`)}
        `,
      }).then((message) => {
        if (message == "OK") {
          let getPasswordCode = prompt(
            "Enter Password Verification Code \nWhich has Sent to Your Email Address"
          );
          if (getPasswordCode == code) {
            newPasswordValue = prompt("Enter New password");
            if (!newPasswordValue) return;
            if (newPasswordValue.length < 8) {
              alert("Password must be grater than 8 characters");
              return;
            }
            eel.update_user_password(username, newPasswordValue);
            alert("Successfully Updated Password");
          }
        }
      });
    });
    // let securityAnswer = prompt("Which is Your favorite Shoe");
    // console.log(securityAnswer);
    // if (!securityAnswer) {
    //   return;
    // }
    // if (securityAnswer !== question) {
    //   alert("Security Answer do not match");
    //   return;
    // }
  }
});
// checking user
checkSignIn = async (username, password) => {
  const signIn_username = username.value;
  const sign_In_password = password.value;
  if (!signIn_username.trim()) return;
  if (!sign_In_password.trim()) return;
  if (sign_In_password.length < 8) {
    alert("Please enter a valid password");
    password.value = "";
    return;
  }
  await eel.checkSignInDb(signIn_username)((user) => {
    if (!user) {
      alert("Username dose not exists");
      username.value = "";
      password.value = "";
      return;
    } else {
      if (user.username === signIn_username) {
        if (user.password === sign_In_password) {
          eel.set_user_ID(user._id);
          let userInfo = {
            username: user.username,
            password: user.password,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));
          alert("Welcome Back");
          username.value = "";
          password.value = "";
          window.location.href = "../home-component/dashboard.html";
          return;
        } else {
          alert("password do not match");
          password.value = "";
          return;
        }
      }
    }
  });
};

// creating user
checkSignUp = async (username, password, confPassword, email, question) => {
  if (!username.value.trim()) return;
  if (!password.value.trim()) return;
  if (!confPassword.value.trim()) return;
  if (!email.value.trim()) return;
  if (!question.value.trim()) return;
  const sign_UP_username = username.value;
  const sign_UP_password = password.value;
  const sign_Up_confPassword = confPassword.value;
  const sign_UP_email = email.value;
  const sign_UP_question = question.value;
  console.log(sign_UP_password);

  await eel.checkSignInDb(sign_UP_username)((user) => {
    console.log(user);
    if (user) {
      alert("Username already exists");
      return;
    } else {
      setNewUser(
        sign_UP_username,
        sign_UP_password,
        sign_Up_confPassword,
        sign_UP_email,
        sign_UP_question
      );
    }
  });
  function setNewUser(username, password, confPassword, email, question) {
    if (password.length < 8) {
      console.log(password);
      alert("Password must be grater than 8 characters");
      return;
    }
    if (password !== confPassword) {
      alert("Password do not match");
      return;
    }

    alert("Verify Your Email");
    eel.getVerificationCode()((code) => {
      console.log(code);
      console.log(email);
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "onlineshoes69@gmail.com",
        Password: "0D17FC3473A6F7434D91FFEBF83CE82DF3C2",
        To: email,
        From: "onlineshoes69@gmail.com",
        Subject: "Verify Your Email",
        Body: `Your Verification Code is ${code}`,
      }).then((message) => {
        console.log("Verify Your" + code);
        if (message == "OK") {
          let getCode = prompt(
            "Enter Verification Code \nWhich has Sent to Your Email Address"
          );
          if (!getCode.trim()) return;
          if (getCode == code) {
            eel.set_user(username, password, email, question);
            eel.message("Successfully signUp in database");
            alert("Successfully signUp");
            signInBtn.click();
          } else {
            alert("Verification Code Invalid do not match");
          }
        } else {
          alert("Email Not Found");
        }
      });
    });
  }
};

// my code of modal
const openModalBtn = document.querySelector(".toggle");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");
const adminUsername = document.querySelector(".admin-username");
const adminPassword = document.querySelector(".admin-password");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.querySelector(".modal-back").addEventListener("click", () => {
  modal.style.display = "none";
});

document.querySelector(".admin-login").addEventListener("click", () => {
  if (!adminUsername.value.trim()) return;
  if (!adminPassword.value.trim()) return;
  console.log(adminUsername.value);
  eel.checkAdmin(adminUsername.value)((user) => {
    if (!user) {
      alert("Please enter admin username");
      adminUsername.value = "";
      adminPassword.value = "";
      return;
    }
    if (adminPassword.value !== user.password) {
      alert("Please enter admin password");
      adminPassword.value = "";
      return;
    }
    alert("Welcome Admin");
    adminUsername.value = "";
    adminPassword.value = "";
    window.location.href = "../../components/admin-component/ordersAd.html";
  });
});

userData = localStorage.getItem("user");
if (userData) {
  data = JSON.parse(userData);
  console.log(data);
  eel.checkSignInDb(data.username)((user) => {
    console.log(user);
    if (user) {
      eel.set_user_ID(user._id);
      window.location.href = "../home-component/dashboard.html";
    } else {
      return;
    }
  });
}
