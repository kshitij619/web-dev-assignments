let start = confirm(
  "Press 'Ok' to start banking or 'Cancel' to exit the application"
);
let balance = 0;
let amount = 0;

let optionFunc = () =>
  prompt(
    "1. Show balance\n2. Deposit money\n3. Withdraw money\nPress any other number to exit"
  );

let showBal = () => alert("Your balance is " + balance);

let optionVar = 0;

function change() {
  if (optionVar == 2) {
    amount = Number(prompt("Enter the amount to be deposited: "));
    balance += amount;
  } else if (optionVar == 3) {
    amount = Number(prompt("Enter the amount to be withdrawn: "));
    if (balance == 0 || balance - amount < 0) {
      alert("You don't have sufficient balance.");
    } else {
      balance -= amount;
    }
  }
  showBal();
}

while (start) {
  optionVar = Number(optionFunc());

  switch (optionVar) {
    case 1:
      showBal();
      break;

    case 2:
      change();
      break;

    case 3:
      change();
      break;

    default:
      start = false;
      break;
  }
}
