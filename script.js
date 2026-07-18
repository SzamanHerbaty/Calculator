const operators = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const equalsBtn = document.querySelector(".equals");
const negateBtn = document.querySelector(".negate");
const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const display = document.querySelector(".input");
const dot = document.querySelector(".dot");

console.log(dot.textContent)

let state = {
    firstNumber: "",
    secondNumber: "",
    isDotHere: false,
    clearNeed: false,
    currentOperator: ""
};

// MATH FUNCTIONS
function operate(op, a, b){
  switch (op) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      if (b === 0) {
        return "! ERROR !";
      } else {
        return a / b;
      }
  }
}

function removeZeros(str){
    return str.replace(/^0+(?!$)/, '');
}


// CALCULATOR DIPSLAY FUNCTIONS
function addToDipslay(value){
    display.textContent = value;
}


function numberInput(item){

    
    if(state.clearNeed){
        display.textContent = "";
        state.clearNeed = false;
    }

    if(state.currentOperator === ""){
        state.firstNumber += item.textContent;
       // state.firstNumber = removeZeros(state.firstNumber);
        console.log(state);
        addToDipslay(state.firstNumber);
    }
    else{
        state.secondNumber += item.textContent;
       // state.secondNumber = removeZeros(state.secondNumber);
        addToDipslay(state.secondNumber);
    }

}


function operatorInput(item){

    console.log(state);

    if(state.currentOperator !== "" && state.secondNumber === ""){
        state.currentOperator = item.textContent;
    }
    
    if(state.currentOperator !== "" && state.secondNumber !== ""){
        state.firstNumber = operate(state.currentOperator, parseFloat(state.firstNumber), parseFloat(state.secondNumber))
        state.secondNumber = "";
        addToDipslay(state.firstNumber);
    }

    state.currentOperator = item.textContent;
    state.clearNeed = true;
}

function dotInput(item){ 
    console.log(state);

    if(state.clearNeed){
        display.textContent = "";
        state.clearNeed = false;
    }


      if (state.currentOperator === "") {
        
        if (state.firstNumber === "") state.firstNumber = "0.";
        else if (!state.firstNumber.includes(".")) state.firstNumber += ".";
        addToDipslay(state.firstNumber);
      }
      else{
        if (state.secondNumber === "") state.secondNumber = "0.";
        else if (!state.secondNumber.includes(".")) state.secondNumber += ".";
        addToDipslay(state.secondNumber);
      }
      
    
}


// NUMBER EVENTS

number.forEach((item) => {
    item.addEventListener("click", () =>{
        numberInput(item);
    });
});


// OPERATOR EVENTS

operators.forEach((item) => {
    item.addEventListener("click", () => {
        operatorInput(item);
    })
})

dot.addEventListener("click", () => {
    dotInput(dot);
})

