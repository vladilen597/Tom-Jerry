var player2img = new Image();
player2img.src = "images/cousin.png"



var player2 = new Jerry();

player2.y = canvas1.height - 200;

player2.draw = function(){
    ctx.drawImage(player2img, this.x, this.y, this.width, this.height);
}


player2.move = function(edit){
    if(edit === "W"){
        this.y -= this.speedY; 
    } else if(edit === "S"){
        this.y += this.speedY;  //speed Y
    } else if( edit === "A"){
        this.x -= this.speedX;
    } else if( edit === "D"){
        this.x += this.speedX;
    }

    this.x = Math.min(canvas1.width - this.width, Math.max(0, this.x));
    this.y = Math.min(canvas1.height - this.height, Math.max(0, this.y));
};
