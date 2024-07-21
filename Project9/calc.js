alert("You have initialized THE CALC!!!");

let num1, num2, result;

function input() {
  num1 = Number(prompt("Enter num1: "));
  num2 = Number(prompt("Enter num2: "));
}

let add = () => num1 + num2;

let sub = () => num1 - num2;

let mul = () => num1 * num2;

let div = () => num1 / num2;

let formula = () => alert(`The formula will be:\n ${num1} ${operator} ${num2}`);

let operator = prompt("Type the operation you want to perform: ( + - / * )");
input();
switch (operator) {
  case "+":
    formula();
    result = add();
    break;

  case "-":
    formula();
    result = sub();
    break;

  case "/":
    formula();
    result = div();
    break;

  case "*":
    formula();
    result = mul();
    break;

  default:
    alert("Seedha seedha bata!!!");
    break;
}

alert("Your result is: " + result);
