var randomNumber;
var randomChosenColor;
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).keydown(function(){
    if(!started)
    {
        nextSequence();
        started=true;
    }
});


$(".btn").click(function()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSequence(userClickedPattern.length-1);
    console.log(userClickedPattern);
});

function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}

function playSound(name)
{
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("btn "+currentColor).addClass("pressed");
    setTimeout(function(){
        $("btn "+currentColor).removeClass("pressed");
    },100);
}

function checkSequence(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("SUCCESS");
        
        if(gamePattern.length===userClickedPattern.length)
        setTimeout(nextSequence(),1000);
    }
    else
    {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        });

        $("h1").text("Game Over, Press Any Key to Restart");
        StartOver();
    }
    
}

function StartOver()
{
    level=0;
    gamePattern=[];
    started=false;
}






