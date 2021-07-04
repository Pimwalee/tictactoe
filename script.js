const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]; 

const grid = () => Array.from(document.getElementsByClassName("q"));
// gridFn is to create an array from the q elements from the html document

const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));

 // replace q to remove q //means when we click on index q0 it's now "0" use .paresInt to integer number so now it's 0

const emptyQs = () => grid().filter(_qEl => _qEl.innerText === "");
//it is an array so we use filter to check q element innertext if it is empty "" OR to return an array of all the q that don't have an X or O in it so that AI can select

const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== "");
//which ever q element we are on the innertext, needs to be === or match to whatever first arr[0] innertext in that array //EX, if in that first array has X, the rest  has to be X too //only have winner if all 3 are XXX or OOO  -- it all has to be XXX and OOO

const takeTurn = (index, letter) => grid()[index].innerText = letter;
// index is which q is taking turn and letter is X or O
// access it by index that we pass it then innertext for whichever q ele we access going to be = whichever letter we pass this function Ex. index q0 put O there

const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);
//random number * emptyQs().length means random number between0-1(by default) to *emptyQs().length (9)and floor the number down
//the length of array is 9 but the last index number is 8 cos we start from 0 - 8
//if the random number is not empty, random again till they get the empty spot

const endGame = (winningSequence) => {
    winningSequence.forEach(_qEl => _qEl.classList.add("winner"));
    disableListeners();
};
const checkForVictory = () => {
    let victory = false; // make false by default and change to true when win
    winningCombos.forEach(_c => { 
    // loop all through winningcombos we want to check if this sequence is all the same if not all same go through & keep checking all of these sequences and if any winningcombo happen to all be the same on this grid then we know we have a victory
    // if none of them are all same on this grid means no victory
    //_c represent which combination[[,,,][,,,],[,,,],[,,,]]; we are on

        const _grid = grid();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });
return victory;
};

const opponentTurn = () => {
    disableListeners(); // its opponent turn so we cant click
    setTimeout(() => { // to make it naturally wait a sac before taking turn
        takeTurn(opponentChoice(), "o");
        if(!checkForVictory()) // check if anyone wins if not then next person turn
         enableListeners();// now we can click
    }, 1000);
}

const clickFn = ($event) => { 
    takeTurn(qNumId($event.target), "x");
    if(!checkForVictory());
    opponentTurn(); // me switching turn to the opponent
};
//ID
// this function gets called whenever we click on it And also be the function that gets called when the opponent(the other player) takes their turn too 

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener("click", clickFn));// ("click" is everytime when we click ,  pass to this -> clickFn  funciton automaticlly) 
// listen to click and target to add X
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener("click", clickFn));

enableListeners();

