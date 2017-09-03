//requirements
const fs = require('fs');

module.exports = ClonzeCard;

//===========================Constructor=============================
function ClonzeCard(text,clonze) {
    this.text = text;
    this.clonze = clonze;
    //partial sentance/front card
    this.partial = this.text.replace (this.clonze, '___________');
    
        //full txt/answer/bck card
        this.create = function () {
            var data = {
                text: this.text,
                clonze: this.clonze,
                partial: this.partial,
                type: 'clonze'
            };
       
//===================add card to log=================================
       fs.appendFile('log.txt', JSON.stringify(data) + "," , 'utf8' , function (err) {
           if (err) {
               console.log("err");
           }
       });
};

}