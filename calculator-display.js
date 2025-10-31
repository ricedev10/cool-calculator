const digitsMenu = document.querySelector(
	".calculator-container .digits"
);

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];

// create the digits
{
	for (digit of DIGITS) {
		// create the button for the digit and add to display
		const button = document.createElement("button");
		button.textContent = digit.toString();
		button.setAttribute("digit", digit);

		digitsMenu.appendChild(button);
	}
}
