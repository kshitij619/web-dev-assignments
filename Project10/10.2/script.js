// Default bank object used as base for other bank systems
// const bank = {
//   balance: 0,

//   transactions: [],

//   viewTransactions: function () {
//     alert("Check your console by pressing f12 or going to inspect page.");
//     console.clear();
//     console.log(
//       "Your previous " + this.transactions.length + " transactions are:"
//     );
//     for (key in this.transactions) {
//       if (this.transactions[key] > 0) {
//         console.log(this.transactions[key]);
//       } else if (this.transactions[key] < 0) {
//         console.log(this.transactions[key]);
//       }
//     }
//   },
// };

// UPI System of bank object
let upi = {
  balance: 0,

  transactions: [],

  viewTransactions: function () {
    alert("Check your console by pressing f12 or going to inspect page.");
    console.clear();
    console.log(
      "Your previous " + this.transactions.length + " transactions are:"
    );
    for (key in this.transactions) {
      if (this.transactions[key] > 0) {
        console.log(
          `Spent: ${this.transactions[key]}\tBalance: ${this.balance}`
        );
      } else if (this.transactions[key] < 0) {
        console.log(
          `Deposited: ${Math.abs(this.transactions[key])}\tBalance: ${
            this.balance
          }`
        );
      }
    }
  },

  addMoney: function () {
    const input = parseFloat(prompt("Enter amount: "));
    if (input) {
      this.balance += input;
      this.transactions.push(input);
      alert(`Successfully added ₹${input} to your UPI.`);
    }
  },

  payMoney: function () {
    const input = parseFloat(prompt("Enter amount: "));
    if (input > this.balance) {
      alert("You balance lower than the paying amount.");
    } else if (input <= this.balance) {
      this.balance -= input;
      this.transactions.push(-input);
      alert(`Successfully paid ₹${input}.`);
    }
  },

  viewBalance: function () {
    alert(`Your current balance is: ₹${this.balance}`);
  },
};

// Credit Card System of bank object with a limit of 100000
let creditCard = {
  balance: 0,
  limit: 100000,
  transactions: [],

  viewTransactions: function () {
    alert("Check your console by pressing f12 or going to inspect page.");
    console.clear();
    console.log(
      "Your previous " + this.transactions.length + " transactions are:"
    );
    for (key in this.transactions) {
      if (this.transactions[key] > 0) {
        console.log("Spent: " + this.transactions[key]);
      } else if (this.transactions[key] < 0) {
        console.log(`Paid: ${Math.abs(this.transactions[key])}`);
      }
    }
  },

  payBill: function () {
    let input = 0;
    if (this.balance == 0) {
      alert("No bill pending.");
    } else {
      if (
        confirm(`Do you want to pay full amount of ₹${Math.abs(this.balance)}?`) // bal = 500
      ) {
        alert(`You have successfully paid bill of ₹${Math.abs(this.balance)}.`);
        this.transactions.push(-this.balance);
        this.balance = 0;
      } else {
        input = parseFloat(prompt("Enter amount you want to pay: "));
        if (input > 0) {
          this.balance += input;
          alert(`You have successfully paid bill of ₹${input}.`);
          this.transactions.push(-input);
        } else {
          alert("Error occurred!!!");
        }
      }
    }
  },

  buyItem: function () {
    const input = parseFloat(prompt("Enter amount: "));
    if (input <= this.limit) {
      this.balance -= input;
      this.limit -= input;
      this.transactions.push(input);
      alert(`Successfully bought items worth ₹${input}.`);
    } else if (input > this.limit) {
      alert(`Limit exceeded!\nRemaining limit: ${this.limit}`);
    }
  },

  checkBill: function () {
    if (this.balance) {
      alert(`Amount payable is: ₹${Math.abs(this.balance)}`);
      if (confirm("Do you want to pay bill now?")) {
        this.payBill();
      }
    } else {
      alert("No bill pending.");
    }
  },

  pendingBalance: function () {
    alert(`Your pending balance is ₹${this.limit}`);
  },
};

// UPI functions to use in HTML onclick
let upiPay = () => {
  upi.payMoney();
};

let upiAdd = () => {
  upi.addMoney();
};

let upiViewBal = () => {
  upi.viewBalance();
};

let upiViewTrans = () => {
  upi.viewTransactions();
};

// Credit Card functions to use in HTML onclick
let ccBuy = () => {
  creditCard.buyItem();
};

let ccPendingBalance = () => {
  creditCard.pendingBalance();
};
let ccCheckBill = () => {
  creditCard.checkBill();
};

let ccPayBill = () => {
  creditCard.payBill();
};

let ccViewTrans = () => {
  creditCard.viewTransactions();
};
