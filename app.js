//requirements
const BasicCard = require('./BasicCard.js');
const ClonzeCard = require('./ClonzeCard.js');

const inquirer = require('inquirer');
const fs = require('fs');

//=======================Prompt============================

//prompt add or show cards
inquirer.prompt([
   {
       name: 'start',
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
        message: 'What type of card would you like to make?'
        type: 'list',
        choices: ["basic-flashcard", "clonze-flashcard"]
    }]).then(function(answer) {
        //basic card add
      if (answer.cardType === 'basic-flashcards'){
          basicCardPrompt();
          //clonze card add
      }else (answer.cardType === 'clonze-flashcard'){
          clonzeCardPrompt();
        }
        })
}
//basic cards
var basicCardPrompt = function (){
    inquirer.prompt([{
        name: 'front',
        message: 'What is your question',
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
}
//clonze card
var clonzeCardPrompt = function (){

}
//=======================show cards======================
var showCards = function (){

}

//======================show questionz=================

//=====================Next Prompt==================
var nextUp = function () {

}

