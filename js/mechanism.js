var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');
var myAudio = document.getElementById('song');
var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";
var lvl;
var counter = 1;
var player;


window.onload = function(){
    document.getElementById('easy').onclick = function(){
        playGameEz();
        document.getElementById('normal').classList.add('hide');
        document.getElementById('hard').classList.toggle('hide');
        document.getElementById('choose').classList.add('hide');
      myAudio.play();
      lvl=1;
      jerry.speedX = 10;
      jerry.speedY = 10;
      player2.speedX = 10;
      player2.speedY = 10;
    };
    function playGameEz(){
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 1000);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 6000);
    }




    document.getElementById('normal').onclick = function(){
        playGameNormal();
        document.getElementById('easy').classList.add('hide');
        document.getElementById('hard').classList.toggle('hide');
        document.getElementById('choose').classList.add('hide');
      myAudio.play();
      lvl=2;
      jerry.speedX = 7;
      jerry.speedY = 7;
      player2.speedX = 7;
      player2.speedY = 7;

    };
    function playGameNormal(){
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 2000);      
        
        setInterval(function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 6000);
    }









    document.getElementById('hard').onclick = function(){
        playGameHard();
        document.getElementById('easy').classList.toggle('hide');
        document.getElementById('normal').classList.add('hide');
        document.getElementById('choose').classList.add('hide');
      myAudio.play();
      lvl=3;
      jerry.speedX = 5;
      jerry.speedY = 5;
      player2.speedX = 5;
      player2.speedY = 5;
    };
    function playGameHard(){
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 3000);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 6000);
    }


};









var keysPressed = {
    top: false,
    bottom: false,
    right: false, 
    left: false , //left
    W:false,
    A:false,
    S:false,
    D:false
};

var TOP_KEY = 87;
var LEFT_KEY = 65;
var RIGHT_KEY = 68;
var BOTTOM_KEY = 83;
var ESCAPE_KEY = 27;

var W_KEY = 38;
var S_KEY = 40;
var A_KEY = 37;
var D_KEY = 39;

var count = 0;


document.onkeydown = function(event){
    event.preventDefault();
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = true;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = true;  //Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = true;
        break;
        case LEFT_KEY:
        keysPressed.left = true;
        break;
        case W_KEY:
        keysPressed.W = true;
        break;
        case S_KEY:
        keysPressed.S = true;  //Поменять забыл при копировании свойства
        break;
        case D_KEY:
        keysPressed.D = true;
        break;
        case A_KEY:
        keysPressed.A = true;
        break;
        case ESCAPE_KEY:
            jerry.stop();
            tom.stop();
            player2.stop();
            ProductCheese.stop();
        break;
    }
};



document.onkeyup = function(event){
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = false;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = false;//Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = false;
        break;
        case LEFT_KEY:
        keysPressed.left = false;
        break;
        case W_KEY:
        keysPressed.W = false;
        break;
        case S_KEY:
        keysPressed.S = false;  //Поменять забыл при копировании свойства
        break;
        case D_KEY:
        keysPressed.D = false;
        break;
        case A_KEY:
        keysPressed.A = false;
        break;
        case ESCAPE_KEY:
            jerry.stop();
            tom.stop();
            player2.stop();
            if(count%2 == 0){
                lvl = localStorage.getItem('lvl');
                jerry.moveAgain();
                player2.moveAgain();
                tom.moveAgain();
            }
            count++;
        break;
    }
};


function updateCanvas1(){
    Object.keys(keysPressed).forEach(function(edit){
        if(keysPressed[edit]){
            jerry.move(edit); 
            player2.move(edit);           
        }
    });


ctx.drawImage(backgroundImg, 0, 0);


ctx.fillText("1st player points:  " + jerry.pointCounter + '', 600 , 20);
if(player === 2){
    player2.draw();
    ctx.fillText("2nd player points: " + player2.pointCounter + '' , 100 , 20);
};

jerry.draw();
tom.draw();
tom.move(tom.tomArray);
cheese.draw();

if(jerry.isDead(tom.tomArray)){
    gameOver();
}

if(player2.isDead(tom.tomArray)&&player===2){
    gameOver();
}

for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length && jerry.eatCheese(cheese.cheeseArr)&& lvl===1){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                jerry.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                jerry.pointCounter += 100;
                jerry.speedX = 5;
                jerry.speedY = 5;
                setTimeout(function(){
                    jerry.speedX = 10;  //jerry был неправильно написан
                    jerry.speedY = 10;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }



        if(cheese.cheeseArr.length && jerry.eatCheese(cheese.cheeseArr)&& lvl===2){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                jerry.pointCounter += 100;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                jerry.pointCounter += 200;
                jerry.speedX = 3;
                jerry.speedY = 3;
                setTimeout(function(){
                    jerry.speedX = 7;  //jerry был неправильно написан
                    jerry.speedY = 7;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }




        if(cheese.cheeseArr.length && jerry.eatCheese(cheese.cheeseArr)&& lvl===3){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                jerry.pointCounter += 150;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                jerry.pointCounter += 300;
                jerry.speedX = 1;
                jerry.speedY = 1;
                setTimeout(function(){
                    jerry.speedX = 5;  //jerry был неправильно написан
                    jerry.speedY = 5;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }
}






if(player === 2){
for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length && player2.eatCheese(cheese.cheeseArr)&& lvl===1){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                player2.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                player2.pointCounter += 100;
                player2.speedX = 5;
                player2.speedY = 5;
                setTimeout(function(){
                    player2.speedX = 10;  //jerry был неправильно написан
                    player2.speedY = 10;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }



        if(cheese.cheeseArr.length && player2.eatCheese(cheese.cheeseArr)&& lvl===2){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                player2.pointCounter += 100;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                player2.pointCounter += 200;
                player2.speedX = 7;
                player2.speedY = 7;
                setTimeout(function(){
                    player2.speedX = 15;  //jerry был неправильно написан
                    player2.speedY = 15;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }




        if(cheese.cheeseArr.length && player2.eatCheese(cheese.cheeseArr)&& lvl===3){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                player2.pointCounter += 150;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                player2.pointCounter += 300;
                player2.speedX = 10;
                player2.speedY = 10;
                setTimeout(function(){
                    player2.speedX = 20;  //jerry был неправильно написан
                    player2.speedY = 20;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }
}

};




requestAnimationFrame(updateCanvas1);


};




// Создание экзмепляров класса
var cheese = new ProductCheese();
var jerry = new Jerry();
var tom = new Tom();

function gameOver(){
    cancelAnimationFrame(cheese);
    cancelAnimationFrame(jerry);
    cancelAnimationFrame(tom);
    cancelAnimationFrame(player2);

    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'black';
    if(jerry.pointCounter + player2.pointCounter > localStorage.getItem('record')){
    localStorage.setItem('record',jerry.pointCounter + player2.pointCounter);
    }
    ctx.fillText('Record : ' + localStorage.getItem('record'), canvas1.width / 2 - 200, canvas1.height / 2 + 150)
    ctx.fillText('Game over', canvas1.width / 2 - 200, canvas1.height / 2);
    ctx.fillText('1st player got: ' + jerry.pointCounter, canvas1.width / 2 - 200, canvas1.height / 2 + 100);
    if(player===2)
    ctx.fillText('2nd player got: ' + player2.pointCounter, canvas1.width / 2 - 200, canvas1.height / 2 + 50);

    setInterval(function(){
        location.reload();
    }, 10000)

    jerry.pointCounter();
    player2.pointCounter();
 
}



btn1 = document.getElementById('btn1');
btn2 = document.getElementById('btn2');


diff = document.getElementById('diff')


btn1.onclick = function(){
    player = 1;
    diff.classList.remove('hide');
    btn2.classList.add('hide');
}

btn2.onclick = function(){
    player = 2;
    diff.classList.remove('hide');
    btn1.classList.add('hide');
}