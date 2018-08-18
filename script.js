/*
var inputOutput = (function() {

    return {
        getInput: function() {
            return {
                numberInParty: parseInt(document.getElementById('party-num').value),
                billAmount: parseFloat(document.getElementById('bill').value),
                desiredTip: parseInt(document.getElementById('tip-percent').value)
            };
        },

        sendOutput: function(tip, bill, num) {
            return {
                tipOutput: document.getElementById('tip').innerHTML = 'Total tip: ' + tip,
                billOutput: document.getElementById('total-bill').innerHTML = 'Total bill: ' + bill,
                numOutput: document.getElementById('per-person').innerHTML = 'Total per person: ' + num
            };
        }

    };
})();


var calculations = (function() {
    return {
        calcBill: function(num, bill, tip) {
            return {
                tipAmount: parseInt((bill * (tip / 100)).toFixed(0)),
                totalBill: parseFloat((bill + (bill * (tip / 100))).toFixed(2)),
                perPerson: parseFloat(((bill + (bill * (tip / 100))) / num).toFixed(2))
            };
        }
    };
})();


var controller = (function(inCon, calc) {

    var eventListeners = function() {
        document.getElementById('submit-button').addEventListener('click', function() {
            totalCalc();
        });
        document.addEventListener('keypress', function(event, inputOutput) {
            if (event.keyCode === 13 || event.which === 13) {
                totalCalc();
            }
        });
        document.getElementById('reset-button').addEventListener('click', function() {
            resetForm();
        });
    };

    var totalCalc = function() {
        var input, newCalc;
        input = inCon.getInput();

        // ADD IF STATEMENT FOR EMPTY INPUT FIELDS
        if (!isNaN(input.billAmount) && !isNaN(input.desiredTip) && !isNaN(input.numberInParty)) {
            newCalc = calc.calcBill(input.numberInParty, input.billAmount, input.desiredTip);
            output = inCon.sendOutput(newCalc.tipAmount, newCalc.totalBill, newCalc.perPerson);
        }
    }

    var resetForm = function() {
        document.getElementById('input-form').reset();

        document.getElementById('tip').innerHTML = 'Total tip: ';
        document.getElementById('total-bill').innerHTML ='Total bill: ';
        document.getElementById('per-person').innerHTML = 'Total per person: ';
    }

    return {
        init: function() {
            eventListeners();
        }
    };

})(inputOutput, calculations);


controller.init();

*/
var controller = (function() {

    var changeClass = function() {
        document.getElementById('topics').addEventListener('click', function() {
            activateAnswers();
        });
        document.getElementById('submit').addEventListener('click', function() {
            activateResult();
        });
        document.getElementById('next').addEventListener('click', function() {
            activateNext();
        });
        document.getElementById('skip').addEventListener('click', function() {
            activateAnswers();
        });
    }

    var activateAnswers = function() {
        document.getElementById('topics-wager-container').classList.toggle('inactive');
        document.getElementById('question-answer-box').classList.toggle('inactive');
    }

    var activateResult = function() {
        document.getElementById('result-container').classList.toggle('inactive');
        document.getElementById('question-answer-box').classList.toggle('inactive');
    }

    var activateNext = function() {
        document.getElementById('topics-wager-container').classList.toggle('inactive');
        document.getElementById('result-container').classList.toggle('inactive');
    }
    return {
        init: function() {
            changeClass();
        }
    };
})();

controller.init();




