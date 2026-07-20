const operators = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const equalsBtn = document.querySelector(".equals");
const negateBtn = document.querySelector(".negate");
const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const display = document.querySelector(".input");
const dot = document.querySelector(".dot");

console.log(dot.textContent)

/*STATE OBJECT - jest odpowiedzialny za przetrzymywanie zmienny informujących o stanie w jakim jest kalkulator
                 Wartości tego obiektu zmieniają się wraz z różnymi opracjami

    firstNumber - pierwsza liczba potrzebna do działania 
    secondNumber - druga liczba potrzebna do działania 
    clearNeed - czy po naciśnięciu jakiejś liczby jest potrzebne wyczyszczenie wyświetlacza kalkulatora
    currentOperator - obecny operator
    
*/
let state = {
    firstNumber: "",
    secondNumber: "",
    clearNeed: false,
    currentOperator: ""
};

function resetState(){

    clearHighlight();

    state.firstNumber = "";
    state.secondNumber = "";
    state.clearNeed = false;
    state.currentOperator = "";

}

function errorCheck(){
    if(state.firstNumber === "! ERROR !"){
        resetState();
    }
}

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

// NUMBER INPUT FUNCTION
function numberInput(item){


    if(state.clearNeed){
        display.textContent = "";
        state.clearNeed = false;
    }

    errorCheck();

    if(state.currentOperator === ""){
        state.firstNumber += item.textContent;
       // state.firstNumber = removeZeros(state.firstNumber);
        addToDipslay(state.firstNumber);
    }
    else{
        if (state.firstNumber === ""){
            state.firstNumber = "0";
        }
        state.secondNumber += item.textContent;
       // state.secondNumber = removeZeros(state.secondNumber);
        addToDipslay(state.secondNumber);
    }

}

// OPERATOR INPUT FUNCTION
function operatorInput(item){

    errorCheck();

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

// DOT INPUT

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

// EQUALS FUNCTION

function equalsInput(){

    errorCheck();

    if(state.firstNumber !== "" && state.secondNumber !== ""){
        state.firstNumber = operate(state.currentOperator, parseFloat(state.firstNumber), parseFloat(state.secondNumber))
        state.secondNumber = "";
        state.currentOperator = "";
        addToDipslay(state.firstNumber);
        clearHighlight();
    }

    console.log(state);

}

// CURRENT OPERATOR HIGHLIGHT 

function clearHighlight(){
    operators.forEach((item) => {
        item.classList.remove("highlight");
    })
}

function operatorHighlight(op){

    clearHighlight();

    op.classList.add("highlight");

}

// CLEAR BUTTON FUNCTION - resetuje całkowicie obiekt state i wyświetlacz kalkulatora

function clearAll(){
    display.textContent = "0";
    resetState();
}


// NEGATE FUNCTION 

function negate(){
    if (state.firstNumber !== "" && state.currentOperator === ""){
        state.firstNumber = -state.firstNumber;
        addToDipslay(state.firstNumber);
    }
    else{
        state.secondNumber = -state.secondNumber;
        addToDipslay(state.secondNumber);
    }

    console.log(state);
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
        operatorHighlight(item);
    })
})

// DOT EVENT

dot.addEventListener("click", () => {
    dotInput(dot);
})

// CLEAR EVENT

clearBtn.addEventListener("click", clearAll);

// EQUALS 

equalsBtn.addEventListener("click", equalsInput);

// NEGATE 

negateBtn.addEventListener("click", negate);