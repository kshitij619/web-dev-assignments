const creditCard = {
  maxLimit: 100000,

  limitUtilized: 0,

  remainingBill: 0,

  transaction: [],

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
  },

  payBill: function () {
    let input = document.querySelector("#ccPayBillInput");
    let amount = parseFloat(input.value);

    if (creditCard.remainingBill == 0) {
      alert("No bill pending.");
    } else if (amount > 0 && amount <= creditCard.remainingBill) {
      creditCard.remainingBill -= amount;
      creditCard.transaction.push(amount);
      creditCard.update();
      creditCard.displayTransaction(amount);
    } else {
      alert("Enter valid amount.");
    }
    input.value = "";
  },

  buy: function () {
    let input = document.querySelector("#ccBuyInput");
    let amount = parseFloat(input.value);

    if (amount <= creditCard.maxLimit - creditCard.limitUtilized) {
      creditCard.limitUtilized += amount;
      creditCard.remainingBill += amount;
      creditCard.transaction.push(-amount);

      const lastBought = document.querySelector("#lastBoughtTransaction");
      lastBought.innerText = amount;
      // alert(`Successfully bought items worth ₹${amount}.`);

      creditCard.update();
      creditCard.displayTransaction(-amount);
    } else if (amount > creditCard.maxLimit - creditCard.limitUtilized) {
      alert(`Limit exceeded!\nRemaining limit: ${creditCard.maxLimit}`);
    }
    input.value = "";
  },

  displayTransaction: function (amount) {
    const trans = document.createElement("p");
    const payTransaction = document.querySelector("#ccPaymentHistory");
    const buyTransaction = document.querySelector("#ccBuyHistory");
    trans.innerHTML = Math.abs(amount);
    if (amount > 0) {
      payTransaction.appendChild(trans);
    } else if (amount < 0) {
      buyTransaction.appendChild(trans);
    }
  },
};

let buyFromCreditCard = document.querySelector("#ccBuyButton");
let payCreditCardBill = document.querySelector("#ccPayBillButton");

buyFromCreditCard.addEventListener("click", creditCard.buy);
payCreditCardBill.addEventListener("click", creditCard.payBill);

const upi = {
  balance: 0,

  transaction: [],

  changeBalance: function () {
    let getBalance = document.querySelector("#upiBalance");
    getBalance.innerText = parseFloat(upi.balance);
  },

  buy: function () {
    let input = document.querySelector("#upiBuyInput");
    let amount = parseFloat(input.value);
    if (amount > upi.balance) {
      alert("You balance lower than the paying amount.");
    } else if (amount <= upi.balance) {
      upi.balance -= amount;
      upi.transaction.push(-amount);
    }
    input.value = "";
    upi.changeBalance();
    upi.displayTransaction(-amount);
  },

  deposit: function () {
    let input = document.querySelector("#upiDepositInput");
    let amount = parseFloat(input.value);
    if (amount) {
      upi.balance += amount;
      upi.transaction.push(amount);
      input.value = "";
    }
    upi.changeBalance();
    upi.displayTransaction(amount);
  },

  displayTransaction: function (amount) {
    const trans = document.createElement("p");
    const payTransaction = document.querySelector("#upiPayHistory");
    const depositTransaction = document.querySelector("#upiDepositHistory");
    trans.innerHTML = Math.abs(amount);
    if (amount > 0) {
      depositTransaction.appendChild(trans);
    } else if (amount < 0) {
      payTransaction.appendChild(trans);
    }
  },
};

let buyFromUpi = document.querySelector("#upiBuyButton");
let depositUpi = document.querySelector("#upiDepositButton");

buyFromUpi.addEventListener("click", upi.buy);
depositUpi.addEventListener("click", upi.deposit);

// upi.changeBalance();
// creditCard.update();
