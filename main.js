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

//Getting all the game elements
let status = document.getElementById("status-area");
let twoPlayerButton = document.getElementById("2player");
let onePlayerButton = document.getElementById("1player");
let zeroPlayerButton = document.getElementById("0player");
let board = document.querySelector('.board')

//Variables that control the game state
let gameStarted = false; //Checked when clicking. Could combine with gameOver but left as two variables for clarity. 
let whosTurn; //updates status
let gameOver = false; //Stops turn switching and the computer turns
let numOfPlayers; //0, 1, 2 - controls turn switching
let buttonArr = [onePlayerButton, twoPlayerButton, zeroPlayerButton]; //for ease of disabling/enabling all buttons

//Event listeners
onePlayerButton.addEventListener("click", () => {
  numOfPlayers = 1;
  initializeGame();
  buttonArr.forEach((button)=> button.disabled = true);
  status.textContent = `Player X's turn`; //Maybe change this to reference a variable that says which turn it is
  timerFunction(); //starts the game timer
});

twoPlayerButton.addEventListener("click", () => {
  numOfPlayers = 2; 
  initializeGame();
  buttonArr.forEach((button)=> button.disabled = true);
  status.textContent = `Player X's turn`; //Maybe change this to reference a variable that says which turn it is
  timerFunction(); //starts the game timer
});

zeroPlayerButton.addEventListener("click", () => {
  numOfPlayers = 0; 
  initializeGame();
  buttonArr.forEach((button)=> button.disabled = true);
  status.textContent = `Computer X's turn`; //Maybe change this to reference a variable that says which turn it is
  timerFunction(); //starts the game timer
  computerPicks();
});

board.addEventListener("click", e => {
  let cellClicked = event.target;   
  checkClick(cellClicked);  
  checkforWinner(); 
  if(!gameOver){switchTurn()};
  if(!gameOver && numOfPlayers === 1 && whosTurn.includes('computer')){
    computerPicks();
  }
});

//Functions
function switchTurn(){ //Could use switch cases.
  if(numOfPlayers === 1){
    if(whosTurn === 'player1'){
      status.textContent = `Computer O's turn`;
      return whosTurn = 'computer2';
    }else{
      status.textContent = `Player X's turn`;
      return whosTurn = 'player1'
    }
  }
  if(numOfPlayers === 2) {
    if(whosTurn === 'player1'){
      status.textContent = `Player O's turn`;
      return whosTurn = 'player2'
    }else{
      status.textContent = `Player X's tTurn`;
      return whosTurn = 'player1'
    }
  }
  if(numOfPlayers === 0) {
    if(whosTurn === 'computer1'){
      status.textContent = `Computer O's turn`;
      whosTurn = 'computer2'
    }else{
      status.textContent = `Computer X's turn`;
      whosTurn = 'computer1'
    }
  }
}

function checkClick(cell){
  if(!cell.textContent && gameStarted){
    updateCell(cell);
  }else if(gameStarted === false){
    alert('Please press Start')
  }else{ //if a cell with a value is being clicked on
    blink(cell);
    status.textContent = `Please select an empty cell`;
  }
}

function updateCell(cell){
  return (whosTurn.includes('1') ? cell.textContent = 'X' : cell.textContent = 'O');
}

function checkforWinner(){
  let row1 = cell0.textContent+cell1.textContent+cell2.textContent; //These are the text content for all the winning combinations
  let row2 = cell3.textContent+cell4.textContent+cell5.textContent;
  let row3 = cell6.textContent+cell7.textContent+cell8.textContent;
  let col1 = cell0.textContent+cell3.textContent+cell6.textContent;
  let col2 = cell1.textContent+cell4.textContent+cell7.textContent;
  let col3 = cell2.textContent+cell5.textContent+cell8.textContent;
  let diagL = cell0.textContent+cell4.textContent+cell8.textContent;
  let diagR = cell2.textContent+cell4.textContent+cell6.textContent;
  let checkAnswer = [row1, row2, row3, col1, col2, col3, diagL, diagR]; //All the div textContent for the winning combinations added to array for iteration
  let lines = ["url('images/TopRow.png')","url('images/MidRow.png')","url('images/BotRow.png')","url('images/LeftCol.png')", "url('images/CenterCol.png')", "url('images/RightCol.png')", "url('images/LeftDiag.png')", "url('images/RightDiag.png')"];
  
  checkAnswer.forEach((cond)=>{
    if(cond === "XXX"){
      status.textContent = `X's win!`;
      gameOver = true;
      gameStarted = false;
      buttonArr.forEach((button)=> button.disabled = false);
      board.style.backgroundImage = lines[checkAnswer.indexOf(cond)]; //I could change the lines array to an object with the win condition as the key and the image as the value
    }
    if(cond === "OOO"){
      status.textContent = `O's wins!`;
      gameOver = true;
      gameStarted = false;
      buttonArr.forEach((button)=> button.disabled = false);
      board.style.backgroundImage = lines[checkAnswer.indexOf(cond)];
    }
   
  })
  if(gameStarted && allCells.every(element => element.textContent !== "")){
    status.textContent = `It's a draw!`;
    gameOver = true;
    gameStarted = false;
    buttonArr.forEach((button)=> button.disabled = false);
  }
}

function timerFunction(){
  let seconds = 0;
  let mins = 0;
  let hours = 0;
  let gameTime = window.setInterval(countSecs, 1000);
  let timer = document.getElementById('timer');
  function countSecs(){
    if(gameOver){
      clearInterval(gameTime);
    }else{seconds++;}
    if(seconds==60){ 
      mins++;
      seconds = 0;
    }
    if(mins==60){
      hours++;
      mins = 0;
    } 
    timer.textContent = `Time Elapsed: ${hours.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  }
}

function initializeGame(){
  allCells.forEach(cell => cell.textContent = "");
  gameStarted = true;
  gameOver = false;
  board.style.backgroundImage = null;
  return (numOfPlayers > 0 ? whosTurn = 'player1' : whosTurn = 'computer1');
}

function computerPicks() { 
  let emptyCells = [];
  for(let i = 0; i<allCells.length; i++){
    if(allCells[i].textContent === ""){
      emptyCells.push(allCells[i]);
    }
  }
  let compChoice = Math.floor(Math.random() * Math.floor(emptyCells.length))
  if(whosTurn === 'computer1'){
    emptyCells[compChoice].textContent = "X";
  }else{
    emptyCells[compChoice].textContent = "O";
  }
  checkforWinner();
  if(!gameOver){switchTurn()};
  if(!gameOver && numOfPlayers === 0){
    setTimeout(computerPicks, 500);
  }
}