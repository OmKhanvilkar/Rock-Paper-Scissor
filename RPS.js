let score=JSON.parse(localStorage.getItem('score')) || 
{                       
    Wins:0,				//default or operator
    Losses:0,
    Ties:0
}; 

document.querySelector('.js-autoPlay-btn')
    .addEventListener('click',()=>{
        autoPlay();
    });


updateScore();
let isAutoplaying=false;
let intervalID;

function autoPlay(){
    if(!isAutoplaying){
        intervalID=setInterval(function(){
            const playerMove=pickCompMove();
            playGame(playerMove);
        },1000);
        isAutoplaying=true;
    }else{
        clearInterval(intervalID);
        isAutoplaying=false;
    }
    
}

document.querySelector('.js-rock-btn')
    .addEventListener('click',()=>{
        playGame('Rock');
    });
document.querySelector('.js-paper-btn')
    .addEventListener('click',()=>{
        playGame('Paper');
    });
document.querySelector('.js-scissor-btn')
    .addEventListener('click',()=>{
        playGame('Scissor');
    });


//reset btn
document.querySelector('.js-reset-btn')
    .addEventListener('click',()=>{
        score.Wins=0;
        score.Losses=0;
        score.Ties=0;
        localStorage.removeItem('score');
        updateScore();
    })

    
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }
    else if(event.key==='p'){
        playGame('Paper');
    }
    else if(event.key==='s'){
        playGame('Scissor');
    }
});



function playGame(playerMove){
    const computerMove=pickCompMove();

    let result='';
    if(playerMove==='Scissor'){
        if(computerMove=== 'Rock'){
        result='You lost';
        }else if(computerMove=== 'Scissor'){
        result='Tie';
        }else if(computerMove=== 'Paper'){
        result='You win';
        }
        
    }else if(playerMove==='Paper'){
        if(computerMove=== 'Rock'){
        result='You win';
        }else if(computerMove=== 'Scissor'){
        result='You lost';
        }else if(computerMove=== 'Paper'){
        result='Tie';
        }

    }else if(playerMove==='Rock'){
        if(computerMove=== 'Rock'){
        result='Tie';
        }else if(computerMove=== 'Scissor'){
        result='You win';
        }else if(computerMove=== 'Paper'){
        result='You lost';
        }
    }
    
    if(result==='You win'){
        score.Wins+=1;
    }
    else if(result=== 'You lost'){
        score.Losses+=1;
    }
    else if(result=== 'Tie'){
        score.Ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    //converted in string bcz localStorage only saves strimg

    updateScore();
    
    document.querySelector('.js-result')
        .innerHTML=result;
    document.querySelector('.js-moves')
        .innerHTML=`You
        <img src="rps-img/${playerMove}-emoji.png" class="move-icon">
        <img src="rps-img/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

//global variable
//if we put it in function then it acess for function only not outside it
//let computerMove=''; //let because coputer moves value will be change in rock paper or Scissor


function pickCompMove(){

    const randomNumber=Math.random();

    let computerMove='';

        if(randomNumber>=0 && randomNumber<1/3){
            computerMove='Rock';
        }
        else if (randomNumber>=1/3 && randomNumber<2/3){
            computerMove='Paper';
        }
        else{
            computerMove='Scissor';
        }
    
    return computerMove;
    /*insted of puting in global var we put in return statment so it will acess 
    outside the function*/   
}

function updateScore(){
    
    const jsScore=document.querySelector('.js-score')
        .innerHTML=`Wins:${score.Wins},Losses:${score.Losses},Ties:${score.Ties}`;
}
