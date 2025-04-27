$(document).ready(function () {
    "use strict";

    var leftField = $("#left-field"),
        middleField = $("#middle-field"),
        rightField = $("#right-field"),
        answerField = $("#answer-field"),
        leftFieldValue = "",
        middleFieldValue = "",
        rightFieldValue = "",
        answerFieldValue = "",
        numberButtons = $(".numberKey"),
        numberSystem = 10,
        baseField = $("#number-system"),
        numbers = true,
        gravity = false;


    // -----------------------------------------------------------------------
    // Credit to Kevin Smith on stackoverflow for this function.
    // It redefines the parseFloat() function to one that can accept a radix for use with different base number systems.
    // -----------------------------------------------------------------------

    function parseFloat(string, radix)
    {
        //split the string at the decimal point
        string = string.split(/\./);

        //if there is nothing before the decimal point, make it 0
        if (string[0] == '') {
            string[0] = "0";
        }

        //if there was a decimal point & something after it
        if (string.length > 1 && string[1] != '') {
            var fractionLength = string[1].length;
            string[1] = parseInt(string[1], radix);
            string[1] *= Math.pow(radix, -fractionLength);
            return parseInt(string[0], radix) + string[1];
        }

        //if there wasn't a decimal point or there was but nothing was after it
        return parseInt(string[0], radix);
    }


    function clickNumberButton() {
        // don't do anything unless the value of the button clicked exists within the current base number system
        if (parseInt(this.innerText, numberSystem) < numberSystem) {
            if (answerFieldValue != "") {
                clearField();
            }
            // which side are we working with?
            if (middleFieldValue == "") {
                leftFieldValue += this.innerText;
                leftField.val(leftFieldValue.toUpperCase());
                leftFieldValue = leftFieldValue.toLowerCase();
            // don't allow input into the right side if the square root button was clicked
            } else if (middleFieldValue != "sqrt") {
                rightFieldValue += this.innerText;
                rightField.val(rightFieldValue.toUpperCase());
                rightFieldValue = rightFieldValue.toLowerCase();
            }
        }
    }

    function clickSecondF() {
        if (numbers) {
            numberButtons[0].innerText = "A";
            numberButtons[1].innerText = "B";
            numberButtons[2].innerText = "C";
            numberButtons[3].innerText = "D";
            numberButtons[4].innerText = "E";
            numberButtons[5].innerText = "F";
            numberButtons[6].innerText = "";
            numberButtons[7].innerText = "";
            numberButtons[8].innerText = "";
            numbers = false
        } else {
            numberButtons[0].innerText = "1";
            numberButtons[1].innerText = "2";
            numberButtons[2].innerText = "3";
            numberButtons[3].innerText = "4";
            numberButtons[4].innerText = "5";
            numberButtons[5].innerText = "6";
            numberButtons[6].innerText = "7";
            numberButtons[7].innerText = "8";
            numberButtons[8].innerText = "9";
            numbers = true
        }
    }

    function clickNegative() {
        if (answerFieldValue != "" && (numberSystem == 10 || !hasPoint(answerFieldValue))) {
            leftFieldValue = answerFieldValue;
            clearField("middle");
            clearField("right");
            clearField("answer");
        }
        // which side are we working with?
        if (middleFieldValue == "") {
            if (leftFieldValue.substring(0, 1) != "-") {
                leftFieldValue = "-" + leftFieldValue;
                leftField.val(leftFieldValue);
            } else {
                leftFieldValue = leftFieldValue.substring(1);
                leftField.val(leftFieldValue);
            }
        } else {
            if (rightFieldValue.substring(0, 1) != "-") {
                rightFieldValue = "-" + rightFieldValue;
                rightField.val(rightFieldValue);
            } else {
                rightFieldValue = rightFieldValue.substring(1);
                rightField.val(rightFieldValue);
            }
        }
    }

    function hasPoint(value) {
        var array = value.split(""),
            point = false;
            array.forEach(function (element, index, array) {
                if (element == ".") {
                    point = true;
                }
            });
            return point;
    }

    function clickPoint() {
        // don't do anything unless in decimal mode
        if (numberSystem == 10) {
            if (answerFieldValue != "") {
                clearField();
                leftFieldValue += "0";
            }
            if (middleFieldValue == "") {
                if (leftFieldValue == "") {
                    leftFieldValue += "0";
                }
                if (!hasPoint(leftFieldValue)) {
                    leftFieldValue += ".";
                    leftField.val(leftFieldValue);
                }
            } else if (middleFieldValue != "sqrt") {
                if (rightFieldValue == "") {
                    rightFieldValue += "0";
                }
                if (!hasPoint(rightFieldValue)) {
                    rightFieldValue += ".";
                    rightField.val(rightFieldValue);
                }
            }
        }
    }

    function clickOperator() {
        if (leftFieldValue == "") {
            leftFieldValue = "0";
            leftField.val(leftFieldValue);
        }
        if (answerFieldValue != "") {
            leftFieldValue = answerFieldValue;
            leftField.val(leftFieldValue.toUpperCase());
            clearField("right");
            clearField("answer");
        }
    }

    function clickPlus() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "plus";
            middleField.val("+");
        }
    }

    function clickMinus() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "minus";
            middleField.val("−");
        }
    }

    function clickTimes() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "times";
            middleField.val("×");
        }
    }

    function clickDivide() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "divide";
            middleField.val("÷");
        }
    }

    function clickPower() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "power";
            middleField.val("^");
        }
    }

    function clickSqrt() {
        if ((numberSystem == 10 || !hasPoint(answerFieldValue)) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "sqrt";
            middleField.val("√");
        }
    }

    function clickPercent() {
        if ((numberSystem == 10) && answerFieldValue != '...') {
            clickOperator();
            middleFieldValue = "percent";
            middleField.val("%");
        }
    }

    function convertBase(x) {
        if (leftFieldValue != "" && leftFieldValue != "-") {
            leftFieldValue = parseFloat(leftFieldValue, numberSystem).toString(x);
            leftField.val(leftFieldValue.toUpperCase());
        }
        if (rightFieldValue != "" && rightFieldValue != "-") {
            rightFieldValue = parseFloat(rightFieldValue, numberSystem).toString(x);
            rightField.val(rightFieldValue.toUpperCase());
        }
        if (answerFieldValue != "") {
            answerFieldValue = parseFloat(answerFieldValue, numberSystem).toString(x);
            answerField.val(answerFieldValue.toUpperCase());
        }
    }

    function convertToHex() {
        if (numberSystem != 16 && !hasPoint(leftFieldValue) && !hasPoint(rightFieldValue) && !hasPoint(answerFieldValue)) {
            baseField.val("Hex");
            convertBase(16);
            numberSystem = 16;
        }
    }

    function convertToBin() {
        if (numberSystem != 2 && !hasPoint(leftFieldValue) && !hasPoint(rightFieldValue) && !hasPoint(answerFieldValue)) {
            baseField.val("Bin");
            convertBase(2);
            numberSystem = 2;
        }
    }

    function convertToDec() {
        if (numberSystem != 10 && !hasPoint(leftFieldValue) && !hasPoint(rightFieldValue) && !hasPoint(answerFieldValue)) {
            baseField.val("Dec");
            convertBase(10);
            numberSystem = 10;
        }
    }

    function convertToOct() {
        if (numberSystem != 8 && !hasPoint(leftFieldValue) && !hasPoint(rightFieldValue) && !hasPoint(answerFieldValue)) {
            baseField.val("Oct");
            convertBase(8);
            numberSystem = 8;
        }
    }

    function clearField(fieldToClear) {
        switch (fieldToClear) {
            case "left":
                leftFieldValue = "";
                leftField.val(leftFieldValue);
                break;
            case "middle":
                middleFieldValue = "";
                middleField.val(middleFieldValue);
                break;
            case "right":
                rightFieldValue = "";
                rightField.val(rightFieldValue);
                break;
            case "answer":
                answerFieldValue = "";
                answerField.val(answerFieldValue);
                break;
            default:
                leftFieldValue = "";
                middleFieldValue = "";
                rightFieldValue = "";
                answerFieldValue = "";
                leftField.val(leftFieldValue);
                middleField.val(middleFieldValue);
                rightField.val(rightFieldValue);
                answerField.val(answerFieldValue);
        }
    }

    function performOperation(a, b, operator) {
        switch (operator) {
            case "equals":
                return (parseFloat(a, numberSystem)).toString(numberSystem);
            case "plus":
                return (parseFloat(a, numberSystem) + parseFloat(b, numberSystem)).toString(numberSystem);
            case "minus":
                return (parseFloat(a, numberSystem) - parseFloat(b, numberSystem)).toString(numberSystem);
            case "times":
                return (parseFloat(a, numberSystem) * parseFloat(b, numberSystem)).toString(numberSystem);
            case "divide":
                if (b == 0) {
                    if (!gravity) {
                        $('#container').jGravity({
                            'target': 'input, button',
                            'ignoreClass': 'ignoreMe',
                            'drag': true
                        });
                        gravity = true
                    }
                    return "...";
                } else {
                    return (parseFloat(a, numberSystem) / parseFloat(b, numberSystem)).toString(numberSystem);
                }
            case "power":
                return Math.pow(parseFloat(a, numberSystem), parseFloat(b, numberSystem)).toString(numberSystem);
            case "sqrt":
                return Math.sqrt(parseFloat(a, numberSystem)).toString(numberSystem);
            case "percent":
                return ((parseFloat(a, numberSystem) * parseFloat(b, numberSystem)) / 100).toString(numberSystem);
        }
    }

    // Previously, this function was used for the exponent button
    // but then I realized that the way I have it, it won't handle negative exponents correctly
    // so I have disabled it and replaced it with the standard Math.pow() function

    // function power(a, b) {
    //     var c = a;
    //     switch (b) {
    //         case 0:
    //             return 1;
    //         case 1:
    //             return a;
    //         default:
    //             for (var i = 1; i < b; i++) {
    //                 c *= a;
    //             }
    //             return c;
    //     }
    // }

    function clickEquals() {
        if (answerFieldValue != "...") {
            if (leftFieldValue == "") {
                leftFieldValue = "0";
                leftField.val(leftFieldValue);
            }
            if (middleFieldValue == "") {
                middleFieldValue = "equals";
                middleField.val("=");
            } else if (answerFieldValue != "" && (numberSystem == 10 || !hasPoint(answerFieldValue))) {
                leftFieldValue = answerFieldValue;
                leftField.val(leftFieldValue.toUpperCase());
                middleFieldValue = "equals";
                middleField.val("=");
                clearField("right");
            } else if (rightFieldValue == "" && middleFieldValue != "sqrt") {
                rightFieldValue = "0";
                rightField.val(rightFieldValue);
            }
            answerFieldValue = performOperation(leftFieldValue, rightFieldValue, middleFieldValue);
            answerField.val(answerFieldValue.toUpperCase());
        }
    }

    for (var i = 0; i < numberButtons.length; i++) {
        var numberButton = numberButtons[i];
            numberButton.addEventListener("click", clickNumberButton, false);
    }

    $("#btn-point").on("click", clickPoint);
    $("#btn-plus").on("click", clickPlus);
    $("#btn-minus").on("click", clickMinus);
    $("#btn-times").on("click", clickTimes);
    $("#btn-divide").on("click", clickDivide);
    $("#btn-clear").on("click", clearField);
    $("#btn-equals").on("click", clickEquals);
    $("#btn-power").on("click", clickPower);
    $("#btn-sqrt").on("click", clickSqrt);
    $("#btn-negative").on("click", clickNegative);
    $("#btn-percent").on("click", clickPercent);
    $("#btn-hex").on("click", convertToHex);
    $("#btn-bin").on("click", convertToBin);
    $("#btn-dec").on("click", convertToDec);
    $("#btn-oct").on("click", convertToOct);
    $("#btn-scnd").on("click", clickSecondF);

    $(document).keydown(function (e) {
        // console.log(e.key);
        if (numbers) {
            switch (e.key) {
                case "1":
                    numberButtons[0].click();
                    break;
                case "2":
                    numberButtons[1].click();
                    break;
                case "3":
                    numberButtons[2].click();
                    break;
                case "4":
                    numberButtons[3].click();
                    break;
                case "5":
                    numberButtons[4].click();
                    break;
                case "6":
                    numberButtons[5].click();
                    break;
                case "7":
                    numberButtons[6].click();
                    break;
                case "8":
                    numberButtons[7].click();
                    break;
                case "9":
                    numberButtons[8].click();
                    break;
            }
        }
        if (!numbers) {
            switch (e.key) {
                case "a":
                    numberButtons[0].click();
                    break;
                case "b":
                    numberButtons[1].click();
                    break;
                case "c":
                    numberButtons[2].click();
                    break;
                case "d":
                    numberButtons[3].click();
                    break;
                case "e":
                    numberButtons[4].click();
                    break;
                case "f":
                    numberButtons[5].click();
                    break;
            }
        }
        switch (e.key) {
            case "0":
                numberButtons[9].click();
                break;
            case "+":
                $("#btn-plus").click();
                break;
            case "-":
                $("#btn-minus").click();
                break;
            case "*":
                $("#btn-times").click();
                break;
            case "/":
                $("#btn-divide").click();
                break;
            case "=":
                $("#btn-equals").click();
                break;
            case "Enter":
                $("#btn-equals").click();
                break;
            case "^":
                $("#btn-power").click();
                break;
            case ".":
                $("#btn-point").click();
                break;
            case "_":
                $("#btn-negative").click();
                break;
            case "Escape":
                $("#btn-clear").click();
                break;
            case "Backspace":
                if (answerFieldValue == "") {
                    if (middleFieldValue == "") {
                        leftFieldValue = leftFieldValue.substring(0, leftFieldValue.length - 1);
                        leftField.val(leftFieldValue);
                    } else if (rightFieldValue == "") {
                        middleFieldValue = "";
                        middleField.val(middleFieldValue);
                    } else {
                        rightFieldValue = rightFieldValue.substring(0, rightFieldValue.length - 1);
                        rightField.val(rightFieldValue);
                    }
                }
        }
    });
});