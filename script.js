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
    var elements = inCon.getElementIDs;

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



var totalPoints = 100;
var count = 1;

var questions = [{
    question: 'Where are the Cubs?',
    answers: ['Chicago', 'New York', 'Miami'],
    correct: 0,
    category: 'sports'
    }, {
    question: 'Where are the Saints?',
    answers: ['Chicago', 'London', 'New Orleans'],
    correct: 2,
    category: 'sports'
    }, {
    question: 'The Laws of Thermodynamics were invented by whom?',
    answers: ['Newton', 'Tesla', 'Galileo'],
    correct: 0,
    category: 'history'
    }, {
    question: 'What was the name of the famous ship Darwin rode to Galapagos Islands?',
    answers: ['SS Darwin', 'HMS Beagle', 'RMS Joseph'],
    correct: 1,
    category: 'history'
    }
];


function getWager() {
    wagerAmount = parseInt(document.getElementById('wager').value);
    return wagerAmount;
}

function removeWager() {
    document.getElementById('input-form').reset();
}
function clearAnswers() {
    document.getElementById('answer-list').reset();
}

function eventListeners() {
    document.getElementById('bet').addEventListener('click', function() {
        if (!isNaN(getWager())) {
            getQuestion();
        }
    });

    document.getElementById('submit').addEventListener('click', function() {
        checkAnswer();
        activateResult();
    });

    document.getElementById('next').addEventListener('click', function() {
        clearAnswers();
        removeWager();
        activateNext();
    });

    document.getElementById('skip').addEventListener('click', function() {
        clearAnswers();
        removeWager();
        activateAnswers();
    });
} 

function activateAnswers() {
    if (count < 4) {
        document.getElementById('bet').classList.toggle('inactive');
        document.getElementById('question-answer-box').classList.toggle('inactive');
    } else {
        gameOver();
    }
}

function activateResult() {
    document.getElementById('result-container').classList.toggle('inactive');
    document.getElementById('question-answer-box').classList.toggle('inactive');
}

function activateNext() {
    if (count < 4) {
        document.getElementById('bet').classList.toggle('inactive');
        document.getElementById('result-container').classList.toggle('inactive');
    } else {
        gameOver();
    }
}

function getQuestion() {    
    randInt = Math.floor(Math.random() * questions.length);
    randomQuestion = questions[randInt];
    document.getElementById('question-number').textContent = 'Question ' + count + '/4';
    document.getElementById('questions').textContent = randomQuestion.question;
    document.getElementById('choice-0').textContent = randomQuestion.answers[0];
    document.getElementById('choice-1').textContent = randomQuestion.answers[1];
    document.getElementById('choice-2').textContent = randomQuestion.answers[2];
    questions.splice(randInt, 1);
    if (count === 4) {
        gameOver();
    } else {
        activateAnswers();
        count++;
    }
}

function checkAnswer() {
    wager = getWager();
    if (document.getElementById('answer-' + randomQuestion.correct).checked) {
        document.getElementById('result').textContent = 'CORRECT!';
        totalPoints += wager;
        document.getElementById('points').textContent = 'Total points: ' + totalPoints;
    } else {
        document.getElementById('result').textContent = 'WRONG!';
    }
}

function gameOver() {
    document.getElementById('result-container').classList.remove('inactive');
    document.getElementById('question-answer-box').classList.add('inactive');
    document.getElementById('result').textContent = 'Game Over! You scored ' + totalPoints + ' points!'
}

eventListeners();

