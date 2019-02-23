
var questions, totalPoints, count, topicList;

init();

//--------------- INITIALIZE GAME---------------//
function init() {
    
    questions = [{
        sports: [{
            question: 'There are 2 teams in the NFL that share nicknames with Premier League soccer clubs. Can you name one of them?',
            answers: ['Cardinals', 'Vikings', 'Ravens', 'Saints'],
            correct: 3,
            }, {
            question: 'Which country hosted the first World Cup, in 1930?',
            answers: ['Uruguay', 'Brazil', 'France', 'Italy'],
            correct: 0,
            }, {
            question: 'Which country has won the most modern Olympic Games medals (Summer & Winter)?',
            answers: ['Russia', 'Germany', 'USA', 'Great Britain'],
            correct: 2,
            }
        ]}, {
        history: [{
            question: 'Who created The Laws of Motion?',
            answers: ['Newton', 'Tesla', 'Galileo', 'Copernicus'],
            correct: 0,
            }, {
            question: 'Which modern nation was once the home of the Persian empire?',
            answers: ['Iraq', 'Turkey', 'Iran', 'Pakistan'],
            correct: 2,
            }, {
            question: 'King Henry VIII of England was famous for having how many wives?',
            answers: ['10', '4', '1', '6'],
            correct: 3,
            }
        ]}, {
        technology: [{
            question: 'Which college did Bill Gates drop out of before starting Microsoft?',
            answers: ['Stanford', 'MIT', 'Princeton', 'Harvard'],
            correct: 3,
            }, {
            question: 'In which year did the iPhone debut?',
            answers: ['2007', '2004', '2010', '2000'],
            correct: 0,
            }, {
            question: 'High Frequency Band exists in which range?',
            answers: ['300 - 3000 kHz', '3 - 30 MHz', '30 - 300 MHz', '300 - 3000 MHz'],
            correct: 1,
            }
        ]}, {
        music: [{
            question: 'From which country did the mandolin originate?',
            answers: ['Italy', 'India', 'Austria', 'China'],
            correct: 0,
            }, {
            question: 'The Beatles released 12 studio albums. According to the RIAA, how many of those albums went Platinum?',
            answers: ['9', '11', '4', '7'],
            correct: 1,
            }, {
            question: '"Ol\' Blue Eyes" is the nickname given to which singer?',
            answers: ['Miles Davis', 'Frank Sinatra', 'B.B. King', 'Elvis Presley'],
            correct: 1,
            }
        ]}, {
        movies: [{
            question: 'Who won the Oscar for Best Actor for "Gone With The Wind?"',
            answers: ['Humphrey Bogart', 'Laurence Olivier', 'Gene Kelly', 'Clark Gable'],
            correct: 3,
            }, {
            question: 'What is the highest grossing film of all time?',
            answers: ['Titanic', 'Avatar', 'Gone With The Wind', 'Star Wars: The Force Awakens'],
            correct: 1,
            }, {
            question: 'Leonardo DiCaprio was nominated for an Oscar for Best Actor 4 times. For which film did he win?',
            answers: ['Blood Diamond', 'The Aviator', 'The Revenant', 'Titanic'],
            correct: 2,
            }
        ]}
    ];
    
    totalPoints = 100;
    count = 1;
    topicList = document.querySelectorAll('.topics');

    document.getElementById('next').classList.remove('no-display');
    document.getElementById('new-game').classList.add('no-display');
    document.getElementById('result-container').classList.add('inactive');
    document.getElementById('bet').classList.remove('inactive');
    document.getElementById('intro').classList.remove('inactive');

    document.getElementById('points').textContent = 'Total points: ' + totalPoints;

    resetCategories();
}
//---------------


//--------------- EVENT LISTENERS ---------------//
document.getElementById('ok').addEventListener('click', function() {
    document.getElementById('intro').classList.add('inactive');
})

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

document.getElementById('submit').addEventListener('click', checkAnswer);

document.getElementById('next').addEventListener('click', function() {
    if (totalPoints > 0) {
        clearAnswers();
        removeWager();
        activateNext();
    } else {
        gameOver();
    }
    
});

document.getElementById('skip').addEventListener('click', function() {
    if (totalPoints > 0) {
        wager = getWager();
        document.getElementById('result').textContent = 'You lost ' + wager + ' points!';
        totalPoints -= wager;
        document.getElementById('points').textContent = 'Total points: ' + totalPoints;
        clearAnswers();
        removeWager();
        activateResult();
    } else {
        gameOver();
    }
});

document.getElementById('new-game').addEventListener('click', init);
//---------------


//--------------- RESET HTML & CSS ON NEW GAME ---------------//
function resetCategories() {
    document.getElementById('sports').innerHTML = 'SPORTS<br>(3/3)';
    document.getElementById('sports').removeAttribute('disabled');
    document.getElementById('sports').classList.add('hover');

    document.getElementById('history').innerHTML = 'HISTORY<br>(3/3)';
    document.getElementById('history').removeAttribute('disabled');
    document.getElementById('history').classList.add('hover');

    document.getElementById('technology').innerHTML = 'TECHNOLOGY<br>(3/3)';
    document.getElementById('technology').removeAttribute('disabled');
    document.getElementById('technology').classList.add('hover');

    document.getElementById('music').innerHTML = 'MUSIC<br>(3/3)';
    document.getElementById('music').removeAttribute('disabled');
    document.getElementById('music').classList.add('hover');

    document.getElementById('movies').innerHTML = 'MOVIES<br>(3/3)';
    document.getElementById('movies').removeAttribute('disabled');
    document.getElementById('movies').classList.add('hover');
}
//---------------


function getWager() {
    wagerAmount = parseInt(document.getElementById('wager').value);
    if (wagerAmount <= totalPoints && wagerAmount > 0) {
        return wagerAmount;
    }
}


function removeWager() {
    document.getElementById('input-form').reset();
}


//--------------- CLEARS SELECTED CATEGORY AND RADIO BUTTON SELECTION ---------------//
function clearAnswers() {
    for (var i = 0; i < topicList.length; i++) {
        document.getElementById(topicList[i].id).classList.remove('select');
    }
    document.getElementById('answer-list').reset();
}
//---------------


//--------------- ALLOWS SELECTION OF CATEGORIES; 1 AT A TIME ---------------//
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
//---------------


function activateAnswers() {
    if (count < 16) {
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
    if (count < 16) {
        document.getElementById('bet').classList.toggle('inactive');
        document.getElementById('result-container').classList.toggle('inactive');
    } else {
        gameOver();
    }
}


//--------------- SELECTS & DISPLAYS QUESTION; REMOVES FROM ARRAY---------------//
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

    totalQuestions = questions[0].sports.length + questions[1].history.length + questions[2].technology.length + questions[3].music.length + questions[4].movies.length;
    randInt = Math.floor(Math.random() * selector.length);
    randomQuestion = selector[randInt];

    document.getElementById('question-number').textContent = 'Question ' + count + '/15';
    document.getElementById('questions').textContent = randomQuestion.question;
    document.getElementById('choice-0').textContent = randomQuestion.answers[0];
    document.getElementById('choice-1').textContent = randomQuestion.answers[1];
    document.getElementById('choice-2').textContent = randomQuestion.answers[2];
    document.getElementById('choice-3').textContent = randomQuestion.answers[3];
    selector.splice(randInt, 1);

    document.getElementById(Object.keys(category)[0]).innerHTML = Object.keys(category)[0].toUpperCase() + '<br>(' + selector.length + '/3)';

    if (selector.length < 1) {
        document.getElementById(Object.keys(category)[0]).setAttribute('disabled', '');
        document.getElementById(Object.keys(category)[0]).classList.remove('hover');
    }
    

    if (count === 15) {
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
                document.getElementById('result').innerHTML = 'CORRECT!<br>You gained ' + wager + ' points!';
                totalPoints += wager;
                document.getElementById('points').textContent = 'Total points: ' + totalPoints;
            } else {
                document.getElementById('result').innerHTML = 'WRONG!<br>You lost ' + wager + ' points!';
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
    document.getElementById('result').textContent = 'Game Over! You scored ' + totalPoints + ' points!';
    document.getElementById('new-game').classList.remove('no-display');
    document.getElementById('next').classList.add('no-display');
    removeWager();
    clearAnswers();
}







