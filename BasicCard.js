//requirements
const fs = require ('fs');

module.exports = BasicCard;

//===========================Constructor=============================
function BasicCard(front,back) {
    this.front = front;
    this.back = back;
    this.make = function() {

        var data = {
            front: this.front,
            back: this.back,
            type: "basic"
        };

        //===================add card to log=================================
        fs.appendFile('log.txt', JSON.stringify(data) + ',', 'utf8', function(err) {
            if (err ) {
                console.log(err);
            }
        })
    }
}

