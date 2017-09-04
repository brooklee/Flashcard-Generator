//requirements
const fs = require('fs');

//===========================Constructor=============================
function BasicCard(front,back) {
    this.front = front;
    this.back = back;
    this.create = function() {

        var data = {
            front: this.front,
            back: this.back,
            type: "basic"
        };

        //===================add card to log=================================
        fs.appendFile('log.txt', JSON.stringify(data) + ';', 'utf8', function(err) {
            if (err) {
                console.log(err);
            }
        })
    }
}

module.exports = BasicCard;