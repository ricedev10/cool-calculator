"use strict";

const display = document.querySelector(".display");
const displayUpdated = new CustomEvent("displayUpdated");

// keep track of digits
let digitA = "0";
let digitB = null;
let operation = null;
let operationSymbol = "";

const digitButtons = document.querySelectorAll(
	".calculator-container .digits > *"
);
function onDigitClicked(value) {
	if (!operation) {
		digitA = `${digitA == "0" ? "" : digitA}${value}`;
	} else {
		digitB = !digitB
			? value
			: `${digitB == "0" ? "" : digitB}${value}`;
	}
	display.dispatchEvent(displayUpdated);
}
for (let button of digitButtons) {
	let value = button.getAttribute("digit");
	button.addEventListener("click", () => {
		onDigitClicked(value);
	});
}

const operatorButtons = document.querySelectorAll(
	".calculator-container .operators > .operation"
);
function onOperationClicked(buttonOperation, symbol) {
	operation = buttonOperation;
	operationSymbol = ` ${symbol} `;
	display.dispatchEvent(displayUpdated);
	console.log(buttonOperation, symbol);
}
for (let button of operatorButtons) {
	let buttonOperation = button.getAttribute("operation");
	let symbol = button.getAttribute("symbol");
	button.addEventListener("click", () => {
		onOperationClicked(buttonOperation, symbol);
	});
}

// enter and delete buttons
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");
function onEqualsClicked() {
	if (digitB != null) {
		let result = calculate(operation, +digitA, +digitB);
		digitA = result.toString();
		digitB = null;
		operation = null;
		operationSymbol = "";
		display.dispatchEvent(displayUpdated);
	}
}
function onDeleteClicked() {
	if (digitB != null) {
		console.log(digitB, typeof digitB);
		digitB = digitB.slice(0, -1);
	} else if (operation != null) {
		operation = null;
		operationSymbol = "";
	} else {
		digitA = digitA.slice(0, -1);
	}
	display.dispatchEvent(displayUpdated);
}
deleteButton.addEventListener("click", onDeleteClicked);
equalsButton.addEventListener("click", onEqualsClicked);

// add keyboard support
const body = document.querySelector("body");
body.addEventListener("keydown", (event) => {
	if (!isNaN(+event.key)) {
		onDigitClicked(+event.key);
	} else if (event.key == "Enter" || event.key == "=") {
		onEqualsClicked();
	} else if (event.key == "+") {
		onOperationClicked("add", "+");
	} else if (event.key == "-") {
		onOperationClicked("subtract", "-");
	} else if (event.key == "*") {
		onOperationClicked("multiply", "x");
	} else if (event.key == "/") {
		onOperationClicked("divide", "/");
	}
});

// update display
display.addEventListener("displayUpdated", () => {
	display.textContent =
		digitA + operationSymbol + (digitB ?? "");
});

// calculator functions
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
	return (
		Math.floor(operations[operator](a, b) * 1000) / 1000
	);
}
