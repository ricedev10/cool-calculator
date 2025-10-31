"use strict";

const display = document.querySelector(".display");
const displayUpdated = new CustomEvent("displayUpdated");

// keep track of digits
let digitA = "0";
let digitB = null;
let operation = null;

const digitButtons = document.querySelectorAll(
	".calculator-container .digits > *"
);
for (let button of digitButtons) {
	let value = button.getAttribute("digit");
	button.addEventListener("click", () => {
		console.log(digitA);
		if (!digitB) {
			digitA = `${digitA == "0" ? "" : digitA}${value}`;
			display.dispatchEvent(displayUpdated);
		}
	});
}

// update display
display.addEventListener("displayUpdated", () => {
	display.textContent = digitA;
});

// calculator functions
const ORDER_OF_OPERATIONS = [
	"multiplication",
	"division",
	"addition",
	"subtraction",
];

let numbers = [];

let operations = {
	add: function (a, b) {
		return a + b;
	},
	subtract: function (a, b) {
		return a - b;
	},
	multiply: function (a, b) {
		return a * b;
	},
	divide: function (a, b) {
		return a / b;
	},
};

//
function calculate(operator, a, b) {
	return operations[operations](a, b);
}
