/*jslint browser: true */
/*global window */

var controlX = window.innerWidth / 2;
var controlY = window.innerHeight * 0.85;
var controller = new controlComponet();
var objComp = new objComponet(0);
var objComp2 = new objComponet(window.innerHeight/2);
var count = 0;
var bob

function startGame() {
    //gameArea.start();
   // window.alert("a");
    bob = setInterval(updateGameArea, 20);//20
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.addEventListener('touchmove', function(e) {
        tMove(e);
        e.preventDefault();
    }, false);
}

var gameArea = {
    
    clear : function () {

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
};

function controlComponet() {
    this.controlWidth = 40;
    this.controlHeight = 40;
    this.controlColor = 'red';
    this.y = 100;
    this.gravity = 1;
    this.gravitySpeed = 0;
    this.update = function () {
        this.gravitySpeed += this.gravity;
        this.y += 0 + this.gravitySpeed - 0.5;
        
        if(this.y > window.innerHeight + 100){
            
            //window.alert("you lose!");
            //window.location.reload();
            clearInterval(bob);
            document.getElementById("message").innerHTML = "Total Score: " + (count + 1).toString() + "<br>Tap To Reset";
            document.getElementById("message").style.visibility = 'visible';
            
            document.getElementById("message").addEventListener("click", function (e) {
                                                                window.location.reload();
                                                                })
}
        
        
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = this.controlColor;
        this.ctx.fillRect(controlX, controlY, this.controlWidth, this.controlHeight);
        this.ctx.fillRect(controlX, this.y, this.controlWidth, this.controlHeight);
    };
    this.crashWith = function(otherObj) {
        var myleft = controlX;
        var myright = controlX + this.controlWidth;
        var mytop = this.y;
        var mybottom = this.y + this.controlHeight;
        
        var otherleft = otherObj.objX;
        var otherright = otherObj.objX + otherObj.objWidth;
        var othertop = otherObj.objY;
        var otherbottom = otherObj.objY + otherObj.objHeight;
        var crash = false;
        if (mybottom > othertop && myright > otherleft && myleft < otherright && mytop < otherbottom && this.gravitySpeed > 0) {
            crash = true;
        } else if (mytop < otherbottom && myright > otherleft && myleft < otherright && mybottom > othertop && this.gravitySpeed < 0) {
           this.y = otherbottom;
           if (this.gravitySpeed >= -8){
               //this.y = otherbottom;
               this.gravitySpeed = -8;
           }
            crash = true; 
            //this.bounce();
            //window.alert("bob");
        }
        return crash;
        
    };
    this.bounce = function() {
        this.gravitySpeed = this.gravitySpeed * -1;
    };
}
function objComponet(objY) {
    this.objWidth = 200;
    this.objHeight = 10;
    this.objColor = 'green';
    this.objY = objY;
    this.objX = window.innerWidth / 2 -10;
    this.update = function () {
        
        this.objY += 8;
        if(this.objY > window.innerHeight + 100) {
            this.objY = 0;
            this.objWidth = getRandomArbitrary(40, window.innerWidth / 2);
            this.objX = getRandomArbitrary(0, window.innerWidth - this.objWidth);
        }
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = this.objColor;
        this.ctx.fillRect(this.objX, this.objY, this.objWidth, this.objHeight)
    };
}

function updateGameArea() {
    
    if(controller.crashWith(objComp2)) {
        controller.bounce();
    }
  if(controller.crashWith(objComp)) {
    controller.bounce();
  }
    
    gameArea.clear();
    controller.update();
    objComp.update();
    objComp2.update();
    count++;
    document.getElementById("counter").innerHTML = count;
    
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function tMove(e) {
    var touch = e.targetTouches[0];
    controlX = touch.pageX;
    //draw();
    e.preventDefault();
}
window.addEventListener('keydown', function (e) {
    e.preventDefault();
    if(e.keyCode == 37){
        controlX -= 10;
    }
    else if (e.keyCode == 39) {
        controlX += 10;
    }
}, false);
window.addEventListener('load', startGame, false);
