//requirements
const BasicCard = require('./basiccard.js');
const ClonzeCard = require('./clonzecard.js');

const inquirer = require('inquirer');
const fs = require('fs');

//=======================Prompt============================

//prompt add or show cards
inquirer.prompt([
   {
       name: 'start',
       message: 'pick and option',
       type: 'list',
       choices: ["add-a-flashcard", "show-all-cards"]
   }
    //determine answer and jump to appropriate function
]).then(function(answer){
    if (answer.start === 'add-a-flashcard'){
        addCard();
    }else if (answer.start === 'show-all-cards'){
        showCards();
    }
})


//======================Add Card=========================
var addCard = function () {
    inquirer.prompt([{
        name: 'cardType',
        message: 'What type of card would you like to make?',
        type: 'list',
        choices: ["basic-flashcard", "clonze-flashcard"]
    }]).then(function(answer) {
        //basic card add
      if (answer.cardType === 'basic-flashcards'){
          basicCardPrompt();
          //clonze card add
      }else if (answer.cardType === 'clonze-flashcard'){
          clonzeCardPrompt();
        }
        });
};
//basic cards
var basicCardPrompt = function (){
    inquirer.prompt([{
        name: 'front',
        message: 'What is your question?',
        type: 'input'
    },
        {
            name: 'back',
            message: 'What is the answer?',
            type: 'input'
        }]).then(function(answer){
            var newBasic = new BasicCard(answer.front, answer.back);
            newBasic.create();
            nextUp();
    })
};
//clonze card
var clonzeCardPrompt = function (){
    inquirer.prompt([{
        name: 'text',
        message: 'What is your full text?',
        type:'input'
    },
        {
            name: 'clonze',
            message: 'What is the Clonze portion?',
            type: 'input'
        }]).then(function(answer){
            var text = answer.text;
            var clonze = answer.clonze;
            if (text.includes(clonze)) {
                var newClonze = new ClonzeCard(text, clonze);
                newClonze.create();
                nextUp();
            } else {
                console.log('Try again the clonze you entered was not found in the full text.')
                addCard();
            }
    })
};
//=======================show cards======================
var showCards = function (){
    fs.readFile('./log.txt', 'utf8', function (err, data) {
        if (err){
            console.log(err);
        }
        var questions = data.split(',');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestions(questions, count);

    });
};

//======================show questionz=================
var showQuestions = function (array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
                showQuestions(array, index + 1);
            }
        } else {
            console.log('Incorrect!');
            if (index < array.length - 1) {
                showQuestions(array, index + 1);
            }
        }
    });
};

//=====================Next Prompt==================
var nextUp = function () {
    inquirer.prompt([{
        name: 'next',
        message: 'What would you like to do next?',
        type: 'list',
        choices: ["add-a-flashcard", "show-all-cards"]
    }]).then(function(answer){
        if(answer.next === "add-a-flashcard"){
            addCard();
        }else if(answer.next==="show-all-cards"){
            showCards();
        }

    })

};

