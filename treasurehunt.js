//create a random number for the treasure and the bomb
var treasureLocation = Math.floor(Math.random()*25)
var bombLocation = Math.floor(Math.random()*25)

//make sure the bomb and the treasure aren't the same number
if(treasureLocation === bombLocation){
  bombLocation = Math.floor(Math.random() * 25)
}

//set the initial counter value
var counter = 20

function treasure(location){
  //changing the counter after each click
  counter = counter - 1
  document.getElementById("counter").innerHTML = counter
  console.log(counter)

  if(treasureLocation === location){
    document.getElementById("outcome").innerHTML = "You WIN! &#x1F4B0"
    document.getElementById("gameboard").innerHTML = ""
  }
  else if(bombLocation === location){
    document.getElementById("outcome").innerHTML = "Sorry, you lose &#x2620"
    document.getElementById("gameboard").innerHTML = ""
  }
  else if(counter === 0){
    document.getElementById("outcome").innerHTML = "Sorry, you lose &#x2620"
    document.getElementById("gameboard").innerHTML = ""
  }
  else if(treasureLocation !== location && bombLocation !== location){
    document.getElementById(location).innerHTML = "&#x1f332"
  }
}