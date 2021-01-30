//This counts as one global no? Because its an object?
const calc = {
    displayValue: '0',
    previousValue: null,
    operationType: null,
    waitingForSecondValue: false,
};

(function () {
    "use strict";

    function onClearPress() {

        document.getElementById("output").value = "";
        calc.displayValue = '0'
        calc.previousValue = null;
        calc.operationType = null;
        calc.waitingForSecondValue = false;
    }

    function onNumberPress(number) {
        
        return function() {
            
            if (calc.waitingForSecondValue === true) {
                
                calc.displayValue = number;
                document.getElementById("output").value = number;
                calc.waitingForSecondValue = false;
                return;
            }

            if (number === "." && calc.displayValue.includes(".")) {
                alert(hello);
                return;
            }
            
            calc.displayValue = document.getElementById("output").value + number;
            document.getElementById("output").value = document.getElementById("output").value + number;
        }
    }

    function onOperationPress(operation) {
        return function() {
            //Override the operationType to now be the operation. If operationType is null dont.
            if (calc.waitingForSecondValue && calc.operationType) {
                calc.operationType = operation;
                return;
            }
            
            //If the previous value is null set it to the display value.
            if (calc.previousValue == null && !isNaN(parseFloat(calc.displayValue))) {
                calc.previousValue = parseFloat(calc.displayValue);
            }

            //Calculate and set the result.
            else {
                evaluate();
            }

            calc.waitingForSecondValue = true;
            calc.operationType = operation;
        }
    }

    //Evaluate the calculator.
    function evaluate() {
        const val1 = calc.previousValue;
        //alert(val1);
        const val2 = parseFloat(calc.displayValue);
        
        var result;
        if (calc.operationType === '⩲') {
            result = val1 + val2;
        }
        if (calc.operationType === '-') {
            result = val1 - val2;
        }
        if (calc.operationType === 'x') {
            result = val1 * val2;
        }
        if (calc.operationType === '÷') {
            result = val1 / val2;
        }
        calc.displayValue = String(result);
        calc.previousValue = result;
        document.getElementById("output").value = calc.displayValue;
    }

    function init() {

        var buttons = document.getElementsByTagName("button");
        var buttonsCount = buttons.length;
        for (var i = 0; i < buttonsCount; i++) {
            
            var someVar = buttons[i].innerHTML;
            if (!isNaN(someVar) || someVar === ".") {
                buttons[i].addEventListener("click", onNumberPress(someVar));
            }
            else if (someVar === "⩲" || someVar === "-" || someVar === "x" || someVar === "÷") {
                buttons[i].addEventListener("click", onOperationPress(someVar));
            }
            // else if (someVar === "⩲") {
            //     buttons[i].addEventListener('click', onPlusEqualsPress);
            // }
            // else if (someVar === "-") {
            //     buttons[i].addEventListener('click', onSubtractionPress);
            // }
            // else if (someVar === "x") {
            //     buttons[i].addEventListener('click', onMultiplicationPress);
            // }
            // else if (someVar === "÷") {
            //     buttons[i].addEventListener('click', onDivisionPress);
            // }
            else if (someVar === "c") {
                buttons[i].addEventListener('click', onClearPress);
            }

        }
    }

    window.addEventListener("load", init, false);
})();
