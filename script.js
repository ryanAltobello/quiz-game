
/*
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
*/

var questions = [{
    sports: [{
        question: 'Where are the Cubs?',
        answers: ['Chicago', 'New York', 'Miami'],
        correct: 0,
        }, {
        question: 'Where are the Saints?',
        answers: ['Chicago', 'London', 'New Orleans'],
        correct: 2,
        }
    ]}, {
    history: [{
        question: 'The Laws of Motion were invented by whom?',
        answers: ['Newton', 'Tesla', 'Galileo'],
        correct: 0,
        }, {
        question: 'What was the name of the famous ship Darwin rode to Galapagos Islands?',
        answers: ['SS Darwin', 'HMS Beagle', 'RMS Joseph'],
        correct: 1,
        }
    ]}
];

var totalPoints = 100;
var count = 1;
var topicList = document.querySelectorAll('.topics');


function eventListeners() {
    document.getElementById('topics').addEventListener('click', function(e) {
        activateSelection(e);
    })

    document.getElementById('bet').addEventListener('click', function() {
        for (var i = 0; i < topicList.length; i++) {
            if (document.getElementById(topicList[i].id).classList[2] == 'select' && !isNaN(getWager())) {
                getQuestion();
            }
        }
    });

    document.getElementById('submit').addEventListener('click', function() {
        checkAnswer();
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


function getWager() {
    wagerAmount = parseInt(document.getElementById('wager').value);
    if (wagerAmount <= totalPoints && wagerAmount > 0) {
        return wagerAmount;
    }
}


function removeWager() {
    document.getElementById('input-form').reset();
}


function clearAnswers() {
    for (var i = 0; i < topicList.length; i++) {
        document.getElementById(topicList[i].id).classList.remove('select');
    }
    document.getElementById('answer-list').reset();
}


function activateSelection(e) {
    if (e.target.className == 'topics hover') {
        for (var i = 0; i < topicList.length; i++) {
            if (document.getElementById(topicList[i].id).classList[2] == 'select') {
                document.getElementById(topicList[i].id).classList.remove('select');
            }
        }
        document.getElementById(e.target.id).classList.add('select');  
    }
}


function activateAnswers() {
    if (count < 5) {
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
    if (count < 5) {
        document.getElementById('bet').classList.toggle('inactive');
        document.getElementById('result-container').classList.toggle('inactive');
    } else {
        gameOver();
    }
}


function getQuestion() {
    var category, selector;
    if (document.getElementById('sports').classList[2] == 'select') {
        category = questions[0];
        selector = category.sports;
    } else if (document.getElementById('history').classList[2] == 'select') {
        category = questions[1];
        selector = category.history;
    }else if (document.getElementById('technology').classList[2] == 'select') {
        category = questions[2];
        selector = category.technology;
    }else if (document.getElementById('music').classList[2] == 'select') {
        category = questions[3];
        selector = category.music;
    }else if (document.getElementById('movies').classList[2] == 'select') {
        category = questions[4];
        selector = category.movies;
    }

    randInt = Math.floor(Math.random() * selector.length);
    randomQuestion = selector[randInt];

    document.getElementById('question-number').textContent = 'Question ' + count + '/4';
    document.getElementById('questions').textContent = randomQuestion.question;
    document.getElementById('choice-0').textContent = randomQuestion.answers[0];
    document.getElementById('choice-1').textContent = randomQuestion.answers[1];
    document.getElementById('choice-2').textContent = randomQuestion.answers[2];
    selector.splice(randInt, 1);

    document.getElementById(Object.keys(category)[0]).innerHTML = Object.keys(category)[0].toUpperCase() + '<br>(' + selector.length + '/2)';

    if (selector.length < 1) {
        document.getElementById(Object.keys(category)[0]).setAttribute('disabled', '');
        document.getElementById(Object.keys(category)[0]).classList.remove('hover');
    }
    

    if (count === 5) {
        gameOver();
    } else {
        activateAnswers();
        count++;
    }
}


function checkAnswer() {
    var answerList = document.getElementsByName('answers');

    for (var i = 0; i < answerList.length; i++) {
        if (answerList[i].checked) {
            wager = getWager();
            if (document.getElementById('answer-' + randomQuestion.correct).checked) {
                document.getElementById('result').textContent = 'CORRECT! You gained ' + wager + ' points!';
                totalPoints += wager;
                document.getElementById('points').textContent = 'Total points: ' + totalPoints;
            } else {
                document.getElementById('result').textContent = 'WRONG! You lost ' + wager + ' points!';
                totalPoints -= wager;
                document.getElementById('points').textContent = 'Total points: ' + totalPoints;
            }
            activateResult();
        }
    }
}


function gameOver() {
    document.getElementById('result-container').classList.remove('inactive');
    document.getElementById('question-answer-box').classList.add('inactive');
    document.getElementById('result').textContent = 'Game Over! You scored ' + totalPoints + ' points!'
}


eventListeners();




