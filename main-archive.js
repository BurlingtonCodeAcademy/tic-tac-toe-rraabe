
//Getting all the cells indiviually and then making an array of all the cells
let cell0 = document.getElementById('cell-0');
let cell1 = document.getElementById('cell-1');
let cell2 = document.getElementById('cell-2');
let cell3 = document.getElementById('cell-3');
let cell4 = document.getElementById('cell-4');
let cell5 = document.getElementById('cell-5');
let cell6 = document.getElementById('cell-6');
let cell7 = document.getElementById('cell-7');
let cell8 = document.getElementById('cell-8');
let allCells = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];

//Getting all the board elements
let status = document.getElementById("status-area");
let startButton = document.getElementById("start");
let twoPlayerButton = document.getElementById("2player");
let onePlayerButton = document.getElementById("1player");
let zeroPlayerButton = document.getElementById("0player");
let board = document.querySelector('.board')

//Variables that control the game state
let gameStarted = false;
let cellClicked;
let playerTurn = true;
let gameOver = false;


//Start Button
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  status.textContent = `Player X's turn`; //Maybe change this to reference a variable that says which turn it is
  gameStarted = true;
  timerFunction(); //starts the game timer
});

//Get the cell that's been clicked on and check what to do by calling checkClick
board.addEventListener("click", e => {
  cellClicked = event.target;   
  checkClick(cellClicked);                  //event.target is the cell being clicked on
});



//Checks if the game has started and the cell is empty then who's turn it is to determine which value to put it
function checkClick(cell){
  if(!cell.textContent && gameStarted){
    if(playerTurn){
      cell.textContent = 'X';
      checkforWinner();
      playerTurn = false; //Changes variable to check if it's the player's turn
      status.textContent = `Player O's turn`;
      if(!gameOver){
        computerPicks();
      }
  }else{ //otherwise it's the computer's turn
  cell.textContent = 'O'
  checkforWinner();
  playerTurn = true;
      status.textContent = `Player X's turn`;
    }
  }else if(gameStarted == false){
    alert('Please press Start')
  }else{ //if a cell with a value is being clicked on
    blink(cell);
    status.textContent = `Please select an empty cell`;
  }
}
//An inelegant way to blink the text color red - used when an already used cell is selected
function blink(cell) {
  setTimeout(function() {
      cell.style.color = "red";
  }, 150);
  setTimeout(function() {
    cell.style.color = "";
  }, 650);
  setTimeout(function() {
    cell.style.color = "red";
  }, 1150);
  setTimeout(function() {
    cell.style.color = "";
  }, 1650);
}

//Checking for a winner - Be more clever later
function checkforWinner(){
  let row1 = cell0.textContent+cell1.textContent+cell2.textContent; //These are all the winning combinations
  let row2 = cell3.textContent+cell4.textContent+cell5.textContent;
  let row3 = cell6.textContent+cell7.textContent+cell8.textContent;
  let col1 = cell0.textContent+cell3.textContent+cell6.textContent;
  let col2 = cell1.textContent+cell4.textContent+cell7.textContent;
  let col3 = cell2.textContent+cell5.textContent+cell8.textContent;
  let diagL = cell0.textContent+cell4.textContent+cell8.textContent;
  let diagR = cell2.textContent+cell4.textContent+cell6.textContent;
  let checkAnswer = [row1, row2, row3, col1, col2, col3, diagL, diagR]; //All winning combinations added to array for iteration

  //checks to see if there's a winning or drawn state, if so it gives an alert and calls resetBoard to reset the game board 
  checkAnswer.forEach((cond)=>{
    if(cond === "XXX"){
      //alert('You win!')
      status.textContent = "You win!"
      gameOver = true;
      resetBoard()
    }
    if(cond === "OOO"){
      alert('The computer wins!')
      resetBoard()
    }
    //checks if the game has started (to stop drawing on an empty board when the game starts) and if all the cells have text content
  })
  if(gameStarted && allCells.every(element => element.textContent !== "")){
    alert(`It's a draw!`);
    resetBoard();
  }
}

//Reset the board and re-enable the start button
function resetBoard(){
  allCells.forEach(cell => cell.textContent = "");
  gameStarted = false;
  startButton.disabled = false;
  playerTurn = false;
}

//Timer
function timerFunction(){
  let seconds = 1; //Set to one when the timer starts because the next call isn't for another second
  let mins = 0;
  let hours = 0;
  let gameTime = window.setInterval(countSecs, 1000); //This is getting restarted every time the game starts so it will count by 2-3 seconds
  let timer = document.getElementById('timer');
  function countSecs(){
    //resetBoard() changes gameStarted to false when the game is won
    if(!gameStarted){
      clearInterval(gameTime);
      seconds = 0;
    }
    if(seconds==60){ //Ticks up mins after 60 seconds
      mins++;
      seconds = 0;
    }
    if(mins==60){
      hours++;
      mins = 0;
    } 
    if(gameOver){
      clearInterval(gameTime);
    }
    timer.textContent = `Time Elapsed: ${hours.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
    seconds++;
  }
}

//Computer picks a cell at random from an array of empty cells
let compButton = document.getElementById("computer");
compButton.addEventListener("click", () => {
  computerPicks();
});



let emptyCells = [];
 function computerPicks() { 
    for(let i = 0; i<allCells.length; i++){
      if(allCells[i].textContent === ""){
        emptyCells.push(allCells[i]);
      }
    }
  let compChoice = Math.floor(Math.random() * Math.floor(emptyCells.length))
  emptyCells[compChoice].textContent = "O";
  status.textContent = "Player X's turn";
  checkforWinner();
  playerTurn = true;
  emptyCells=[];
 }
