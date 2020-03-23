var jerryImage = new Image();
jerryImage.src = "images/jerry.png";


function Jerry(){
    this.x = canvas1.width / 2;
    this.y = canvas1.height - 100;
    this.width = 25;
    this.height = 25;
    this.name = "Jerry";
    this.speedX = 10;
    this.speedY = 10;
    this.pointCounter = 0;
}
Jerry.prototype.stop = function(){
    this.speedX = 0;
    this.speedY = 0;
}
Jerry.prototype.moveAgain = function(){
    if(lvl=1){
    this.speedX = 10;
    this.speedY = 10;
    }
    if(lvl=2){
        this.speedX = 15;
        this.speedY = 15;
    }
    if(lvl=3){
        this.speedX = 20;
        this.speedY = 20;
    }
    
}
Jerry.prototype.move = function(edit){
    if(edit === "top"){
        this.y -= this.speedY; 
    } else if(edit === "bottom"){
        this.y += this.speedY;  //speed Y
    } else if( edit === "left"){
        this.x -= this.speedX;
    } else if( edit === "right"){
        this.x += this.speedX;
    }

    this.x = Math.min(canvas1.width - this.width, Math.max(0, this.x));
    this.y = Math.min(canvas1.height - this.height, Math.max(0, this.y));
};

Jerry.prototype.draw = function(){
    ctx.drawImage(jerryImage, this.x, this.y, this.width, this.height);
}

Jerry.prototype.isStatus = function(array){
    return(
        this.x < array.x + array.w && 
        this.x + this.width > array.x &&
        this.y < array.y + array.h &&
        this.height + this.y > array.y
    );
};

Jerry.prototype.isDead = function(tom){
    return tom.some(this.isStatus.bind(this));
}

Jerry.prototype.eatCheese = function(cheese){
    return cheese.some(this.isStatus.bind(this));
}


