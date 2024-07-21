const creditCard = {
  maxLimit: 100000,

  limitUtilized: 0,

  remainingBill: 0,

  transaction: [],

  previousSession: function () {
    if (localStorage != null) {
      if (localStorage.getItem("ccTransactions") != null) {
        creditCard.transaction = JSON.parse(
          localStorage.getItem("ccTransactions")
        );
        for (let i = creditCard.transaction?.length - 1; i >= 0; i--) {
          creditCard.displayTransaction(creditCard.transaction[i].amount, i);
        }
      }

      if (localStorage.getItem("lastPurchase") != null) {
        creditCard.balance = parseFloat(localStorage.getItem("lastPurchase"));
      }

      if (localStorage.getItem("limitUtilized")) {
        creditCard.limitUtilized = parseFloat(
          localStorage.getItem("limitUtilized")
        );
      }
      if (localStorage.getItem("remainingBill")) {
        creditCard.remainingBill = parseFloat(
          localStorage.getItem("remainingBill")
        );
      }
      creditCard.update();
    }
  },

  addTransaction: function (amt) {
    let newTransaction = {
      amount: amt,
      time: new Date(),
    };
    creditCard.transaction.unshift(newTransaction);
    creditCard.addToLocalStorage();
  },

  addToLocalStorage: function () {
    localStorage.setItem(
      "ccTransactions",
      JSON.stringify(creditCard.transaction)
    );

    localStorage.setItem(
      "lastPurchase",
      JSON.stringify(Math.abs(creditCard.transaction[0].amount))
    );

    localStorage.setItem("limitUtilized", Math.abs(creditCard.limitUtilized));

    localStorage.setItem("remainingBill", Math.abs(creditCard.remainingBill));
  },

  update: function () {
    const limitUtilizedDOM = document.querySelector("#limitUtilizedRupees");
    limitUtilizedDOM.innerHTML = creditCard.limitUtilized;

    const availableLimitDOM = document.querySelector("#availableLimitRupees");
    availableLimitDOM.innerText =
      parseFloat(creditCard.maxLimit) - parseFloat(creditCard.limitUtilized);

    const remainingBillAmount = document.querySelector("#remainingBillAmount");
    remainingBillAmount.innerText = creditCard.remainingBill;

    let limitUtilizedPercent =
      (creditCard.limitUtilized / creditCard.maxLimit) * 100;
    const progressBar = document.querySelector("#progress");
    progressBar.style.width = limitUtilizedPercent + "%";

    const lastBought = document.querySelector("#lastBoughtTransaction");
    lastBought.innerText = Math.abs(creditCard.transaction[0]?.amount);
  },

  payBill: function () {
    let input = document.querySelector("#ccPayBillInput");
    let amount = parseFloat(input.value);
    let errorMsg = document.querySelector("#ccPayBillError");
    errorMsg.classList.add("hide");

    if (creditCard.remainingBill == 0) {
      // Change needed here👇
      // alert("No bill pending.");
    } else if (amount > 0 && amount <= creditCard.remainingBill) {
      creditCard.remainingBill -= amount;
      // creditCard.transaction.push(amount); // old
      creditCard.addTransaction(amount); // new
      creditCard.update();
      creditCard.displayTransaction(amount);
    } else {
      // alert("Enter valid amount."); // old
      errorMsg.classList.remove("hide");
    }
    input.value = "";
  },

  buy: function () {
    let input = document.querySelector("#ccBuyInput");
    let amount = parseFloat(input.value);
    let errorMsg = document.querySelector("#ccBuyError");
    errorMsg.classList.add("hide");

    if (amount <= creditCard.maxLimit - creditCard.limitUtilized) {
      creditCard.limitUtilized += amount;
      creditCard.remainingBill += amount;
      creditCard.addTransaction(-amount);

      creditCard.update();
      creditCard.displayTransaction(-amount);
    } else if (amount > creditCard.maxLimit - creditCard.limitUtilized) {
      // alert(`Limit exceeded!\nRemaining limit: ${creditCard.maxLimit}`); // old
      let extra = Document.querySelector("");
    } else {
      errorMsg.classList.remove("hide");
    }
    input.value = "";
  },

  displayTransaction: function (amount, index = 0) {
    const trans = document.createElement("p");
    const Transaction = document.querySelector(".ccTransactions");

    if (creditCard.transaction[index].amount > 0) {
      trans.innerHTML =
        creditCard.transaction[index].time +
        " - " +
        `<span class='negative'>- ₹${Math.abs(
          creditCard.transaction[index].amount
        )}</span>`;
    } else if (creditCard.transaction[index].amount < 0) {
      trans.innerHTML =
        creditCard.transaction[index].time +
        " - " +
        `<span class='positive'> ₹${Math.abs(
          creditCard.transaction[index].amount
        )}</span>`;
    }
    Transaction.appendChild(trans);
  },
};

let buyFromCreditCard = document.querySelector("#ccBuyButton");
let payCreditCardBill = document.querySelector("#ccPayBillButton");

buyFromCreditCard.addEventListener("click", creditCard.buy);
payCreditCardBill.addEventListener("click", creditCard.payBill);

const upi = {
  balance: 0,

  transaction: [],

  previousSession: function () {
    if (localStorage.getItem("upiTransactions") != null) {
      upi.transaction = JSON.parse(localStorage.getItem("upiTransactions"));
      for (let i = upi.transaction?.length - 1; i >= 0; i--) {
        upi.displayTransaction(upi.transaction[i].amount, i);
      }
    }
    if (localStorage.getItem("upiBalance") != null) {
      upi.balance = parseFloat(localStorage.getItem("upiBalance"));
      upi.changeBalance();
    }
  },

  addTransaction: function (amt) {
    let newTransaction = {
      amount: amt,
      time: new Date(),
    };
    upi.transaction.unshift(newTransaction);
    upi.addToLocalStorage();
  },

  addToLocalStorage: function () {
    localStorage.setItem("upiTransactions", JSON.stringify(upi.transaction));
    localStorage.setItem("upiBalance", JSON.stringify(upi.balance));
  },

  changeBalance: function () {
    let getBalance = document.querySelector("#upiBalance");
    getBalance.innerText = parseFloat(upi.balance);
  },

  buy: function () {
    let input = document.querySelector("#upiBuyInput");
    let amount = parseFloat(input.value);
    let errorMsg = document.querySelector("#upiBuyError");
    let buyConfirmation = document.querySelector("#upiBuyConfirm");

    if (amount > upi.balance) {
      errorMsg.innerHTML += " ₹" + amount;
      errorMsg.classList.remove("hide");
    } else if (amount <= upi.balance) {
      upi.balance -= amount;
      upi.addTransaction(-amount);
      document.querySelector("#buyValue").innerHTML = amount;
      buyConfirmation.classList.remove("hide");
      setTimeout(() => {
        buyConfirmation.classList.add("hide");
      }, 3000);
      upi.changeBalance();
      upi.displayTransaction(-amount);
      errorMsg.classList.add("hide");
    }
    input.value = "";
  },

  deposit: function () {
    let depositConfirmation = document.querySelector("#upiDepositConfirm");
    let input = document.querySelector("#upiDepositInput");
    let amount = parseFloat(input.value);
    if (amount) {
      upi.balance += amount;
      upi.addTransaction(amount);
      document.querySelector("#depositValue").innerHTML = amount;
      depositConfirmation.classList.remove("hide");
      setTimeout(() => {
        depositConfirmation.classList.add("hide");
      }, 3000);
      input.value = "";
    }
    upi.changeBalance();
    upi.displayTransaction(amount);
  },

  displayTransaction: function (amount, index = 0) {
    const trans = document.createElement("p");
    const Transaction = document.querySelector(".upiTransactions");
    trans.innerHTML =
      upi.transaction[index].time +
      " - " +
      `₹${Math.abs(upi.transaction[index].amount)}`;
    if (amount > 0) {
      trans.innerHTML =
        upi.transaction[index].time +
        " - " +
        `<span class='positive'>₹${Math.abs(
          upi.transaction[index].amount
        )}<span/>`;
    } else if (amount < 0) {
      trans.innerHTML =
        upi.transaction[index].time +
        " - " +
        `<span class='negative'>- ₹${Math.abs(
          upi.transaction[index].amount
        )}<span/>`;
    }
    Transaction.appendChild(trans);
  },
};

creditCard.previousSession();
upi.previousSession();

//

//

let buyFromUpi = document.querySelector("#upiBuyButton");
let depositUpi = document.querySelector("#upiDepositButton");

buyFromUpi.addEventListener("click", upi.buy);
depositUpi.addEventListener("click", upi.deposit);

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

let signUpForm = document.querySelector(".signUpDiv");
let loginForm = document.querySelector(".loginDiv");
let mainSection = document.querySelector(".mainSection");
let loginSection = document.querySelector(".loginSection");

/*
 * Event Listener to show "sign up page" and hide "login page"
 */
document.querySelector("#signUp").addEventListener("click", function () {
  signUpForm.classList.remove("hide");
  loginForm.classList.add("hide");
});

/*
 * Event Listener to show "login page" and hide "sign up page"
 */
document.querySelector("#login").addEventListener("click", function () {
  loginForm.classList.remove("hide");
  signUpForm.classList.add("hide");
});

let loginPageDetails = {
  email: null,
  password: null,

  getDetails: function () {
    loginPageDetails.email = document.querySelector("#loginEmailId").value;
    loginPageDetails.password = document.querySelector("#loginPassword").value;
    loginPageDetails.checkDetails();
    document.querySelector("#loginEmailId").value = "";
    document.querySelector("#loginPassword").value = "";
  },

  checkDetails: function () {
    let adminEmail = "jkb@gmail.com";
    let adminPassword = "123";

    if (
      loginPageDetails.email == adminEmail &&
      loginPageDetails.password == adminPassword
    ) {
      loginPageDetails.loginNow();
      localStorage.setItem("login", true);
    } else {
      document.querySelector(".loginError").classList.remove("hide");
    }
  },

  loginNow: function () {
    mainSection.classList.remove("hide");
    loginSection.classList.add("hide");
    document.querySelector(".loginError").classList.add("hide");
    loginPageDetails.timer();
  },

  logoutNow: function () {
    mainSection.classList.add("hide");
    loginSection.classList.remove("hide");
  },

  timer: function () {
    let sec = 1000;
    let min = 60 * sec;
    let time = 2 * min;
    setTimeout(loginPageDetails.logoutNow, time);
  },
};

// login button functionality
let loginBtn = document.querySelector("#loginButton");
loginBtn.addEventListener("click", loginPageDetails.getDetails);

// logout button functionality
let logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", loginPageDetails.logoutNow);

// for auto login
if (localStorage.getItem("login")) {
  loginPageDetails.loginNow();
}
