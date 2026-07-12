const operators = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const equals = document.querySelector(".equals");
const negate = document.querySelector(".negate");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");

function appendClick(item){
    item.addEventListener("click", () => {
        console.log(item.textContent);
    })
}

operators.forEach(appendClick);
number.forEach(appendClick);
appendClick(equals);
appendClick(negate);
appendClick(del);
appendClick(clear);