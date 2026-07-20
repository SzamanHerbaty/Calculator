const operators = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const equalsBtn = document.querySelector(".equals");
const negateBtn = document.querySelector(".negate");
const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const display = document.querySelector(".input");
const dot = document.querySelector(".dot");
const history = document.querySelector(".history");
const clearHistoryBtn = document.querySelector(".history_clear_btn");

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
    currentOperator: "",
    calculated: false
};

function resetState(){

    clearHighlight();

    state.firstNumber = "";
    state.secondNumber = "";
    state.clearNeed = false;
    state.currentOperator = "";
    state.calculated = false;

}

function errorCheck(){
    if(state.firstNumber === "! ERROR !"){
        resetState();
    }
}

// MATH FUNCTIONS
function operate(op, a, b){
  let result = null;

  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        return "! ERROR !";
      } else {
        result = a / b;
      }
  }

  if (result !== undefined) {
    result = parseFloat(result.toFixed(10));

    return result.toString();
  }

}

// CALCULATOR DIPSLAY FUNCTIONS
function addToDisplay(value){
    display.textContent = value;
}

// NUMBER INPUT FUNCTION
function numberInput(item){


    if(state.clearNeed){
        display.textContent = "";
        state.clearNeed = false;
    }

    if (state.calculated) {
        state.firstNumber = ""; 
        state.calculated = false;
    }

    errorCheck();

    if(state.currentOperator === ""){
        
        if (state.firstNumber === "0") {
            state.firstNumber = item.textContent; 
        } 
        else {
            state.firstNumber += item.textContent;
        }

        addToDisplay(state.firstNumber);
    }
    else{
        if (state.firstNumber === ""){
            state.firstNumber = "0";
        }
        
        if (state.secondNumber === "0") {
            state.secondNumber = item.textContent;
        } 
        else {
            state.secondNumber += item.textContent;
        }
        
        addToDisplay(state.secondNumber);
    }

}

// OPERATOR INPUT FUNCTION
function operatorInput(item){

    errorCheck();

    if (state.calculated) {
        state.calculated = false;
    }

    if(state.currentOperator !== "" && state.secondNumber === ""){
        state.currentOperator = item.textContent;
    }
    
    if(state.currentOperator !== "" && state.secondNumber !== ""){
        let result = operate(state.currentOperator, parseFloat(state.firstNumber), parseFloat(state.secondNumber));

        addToHistory(result);

        state.firstNumber = result;
        state.secondNumber = "";
        addToDisplay(state.firstNumber);
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
        addToDisplay(state.firstNumber);
    }
    else{
        if (state.secondNumber === "") state.secondNumber = "0.";
        else if (!state.secondNumber.includes(".")) state.secondNumber += ".";
        addToDisplay(state.secondNumber);
    }
      
    
}

// EQUALS FUNCTION

function equalsInput(){

    errorCheck();

    if(state.firstNumber !== "" && state.secondNumber !== ""){

        let result = operate(state.currentOperator, parseFloat(state.firstNumber), parseFloat(state.secondNumber));

        addToHistory(result);

        state.firstNumber = result;
        state.secondNumber = "";
        state.currentOperator = "";
        state.calculated = true;

        addToDisplay(state.firstNumber);
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
    if (state.currentOperator === ""){
        state.firstNumber = (-state.firstNumber).toString();
        addToDisplay(state.firstNumber);
    }
    else{
        state.secondNumber = (-state.secondNumber).toString();
        addToDisplay(state.secondNumber);
    }

}

// DEL FUNCTION 

function deletePrevious(){

    if (state.currentOperator === ""){
        state.firstNumber = state.firstNumber.toString().slice(0, -1);
        addToDisplay(state.firstNumber || "0");
    }
    else{
        state.secondNumber = state.secondNumber.toString().slice(0, -1);
        addToDisplay(state.secondNumber || "0");
    }
}

// ADD TO HISTORY FUNCTION

function addToHistory(result){
    let text = state.firstNumber + " "+ state.currentOperator + " " +state.secondNumber + " = " + result;

    let historyItem = document.createElement("div");

    historyItem.classList.add("history_item");

    historyItem.textContent = text;

    history.appendChild(historyItem);
}

// CLEAR HISTORY FUNCTION


function clearHistory(){

    console.log(history.querySelectorAll(".history_item"));
    
    history.querySelectorAll(".history_item").forEach(n => n.remove());
    

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

// DEL 

delBtn.addEventListener("click", deletePrevious);

// CLEAT HISTORY

clearHistoryBtn.addEventListener("click", clearHistory);