'use strict';

var board = [
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
    [ , , , , , , , ],
];

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let WINNER = "winner";
let notWINNER = "loser";
let CURRENT_PLAYER="X";


console.log( displayBoard() );

/*
 *  This will prompt and prompt until rl is closed().
 */
rl.setPrompt(`Select a column (1-7) : ` );
rl.prompt();
rl.on('line' , playAturn );




/*
 *	Iterate through in memory board
 */
function displayBoard() {
    let horizontalSeparator = "+-+-+-+-+-+-+-+";
    let retString = " 1 2 3 4 5 6 7 \n";
    retString += horizontalSeparator;

    for ( let row=(board.length -1) ; row>=0 ; row-- ) {
        retString += "\n";
	for ( let col=0 ; col<board[row].length ; col++) {
            retString += "|";
            retString += ( board[row][col] ? board[row][col] : " " );
	}
        retString += ("|");
        retString += "\n";
        retString += horizontalSeparator;
    }
    return retString;
}




function togglePlayer() {
    CURRENT_PLAYER == "X" ? CURRENT_PLAYER = "O" : CURRENT_PLAYER = "X";
}

function playAturn( colSelected ) {
    if (colSelected == "quit" ) {
        console.log("you have quit");
        rl.close();

	return;
    } 

    if (notValidInput( colSelected ) ) {
        console.log(`[${colSelected}] is not a valid input \n`);
    } else  {

        let rowFilled = fillInSquare( colSelected );
	if (hasWon( rowFilled , colSelected) ) {
	    console.log( displayBoard() );
	    console.log(`\t\t Player ${CURRENT_PLAYER}     YOU HAVE WON`);
	    rl.close();

	    return;
	}
	togglePlayer();
	console.log( displayBoard() );
	console.log(`\n\n\n\n   Player ${CURRENT_PLAYER} , your turn`);

    }

    rl.prompt();
}




/*
 *  Must be a number between 1 and 7.
 *  column selected must be empty.
 */
function notValidInput( colSelected) {
    console.log(`      Validating [${colSelected}]  \n`);
    if ( isNaN( colSelected ) )  return CURRENT_PLAYER;
    if ( colSelected < 0 | colSelected >7 )  return CURRENT_PLAYER;
    if ( board[5][colSelected -1] != null ) return CURRENT_PLAYER;
}



/*
 *  Iterate through each row in the column selected.  
 *  If the row is empty (null) fill it in with the
 *  CURRENT_PLAYER.
 */
function fillInSquare( colSelected ) {
    for (let row=0 ; row<7 ; row++ ) {
        if(board[row][colSelected -1] == null) {
	    board[row][colSelected -1] = CURRENT_PLAYER;
	    return row;
        }
    }
}





/*
 *  Look for each type of win
 */
function hasWon( rowFilled , colSelected ) {
    if(verticalWin( rowFilled , colSelected ) ) return WINNER;
    if(horizontalWin( rowFilled , colSelected ) ) return WINNER;
    if(diagonalWin( rowFilled , colSelected ) ) return WINNER;
}



/*
 *	A vertical win is 4 up/down.  Because the player can
 *	only stack from top to bottom then the only way to win
 *	is to have 3 more below (rowFilled - 1)
 */
function verticalWin( rowFilled , colSelected ) {

    if (rowFilled < 3) return false;

    let piecesInArow = 1;
    for ( let row=rowFilled -1 ; row>=0 ; row-- ) {
        if ( board[row][colSelected -1] == CURRENT_PLAYER ) {
	    piecesInArow++;
	    //console.log(`row : ${row}     col : ${colSelected -1} `);
	} else break;
    }
    if ( piecesInArow >=4 ) return true;
}



/*
 *	Row does not change.  Check to the left and 
 *	to the right.
 */
function horizontalWin( rowFilled , colSelected ) {
    let piecesInArow = 1;

    //  Check to the LEFT
    //  Why -2?  Because of array indexing!!
    for ( let col=(colSelected-2) ; col>=0 ; col-- ) {
        if ( board[rowFilled][col] == CURRENT_PLAYER) {
	    piecesInArow++;
	    //console.log(`LEFT  row : ${rowFilled}     col : ${col}    -- ${piecesInArow}`);
	} else  
	    break;
    }

    //  Check to the RIGHT
    for ( let col=colSelected ; col<8 ; col++ ) {
        if ( board[rowFilled][col] == CURRENT_PLAYER) {
            piecesInArow++;
	    //console.log(`RIGHT row : ${rowFilled}     col : ${col} `);
        } else
	    break;
    }
    if ( piecesInArow >=4 ) return true;
}



/*
 *	Left/Up    &  Right/Down
 *	     or
 *	Left/Down  &  Right/Up
 */
function diagonalWin( rowFilled , colSelected ) {
    if ( leftUpRightDown( rowFilled , colSelected ) ) return WINNER;
    if ( leftDownRightUp( rowFilled , colSelected ) ) return WINNER;
}



function leftUpRightDown( rowFilled , colSelected ) {
    let piecesInArow = 1;

    //  Left & UP 
    let tempRow = rowFilled;
    for ( let col=colSelected -2 ; col>=0 && tempRow<5 ; col-- ) {
        //console.log(`lUp  row : ${tempRow+1}     col : ${col}    `);
        if ( board[++tempRow][col] == CURRENT_PLAYER ) {
	    piecesInArow++;
	    //console.log(`lUp  row : ${tempRow}     col : ${col}    -- ${piecesInArow}`);
	} else break;
    }

    //  Right & Down
    tempRow = rowFilled;
    for ( let col=colSelected ; col<8 && tempRow>0 ; col++) {
        //console.log(`rDn  row : ${tempRow-1}     col : ${col}    `);
	if ( board[--tempRow][col] == CURRENT_PLAYER ) {
	    piecesInArow++;
	    //console.log(`rDn  row : ${tempRow}     col : ${col}    -- ${piecesInArow}`);
	} else break;
    }

    if ( piecesInArow >=4 ) return true;
}



function leftDownRightUp( rowFilled , colSelected ) {
    let piecesInArow = 1;

    //  Left & DOWN
    let tempRow = rowFilled;
    for ( let col=colSelected -2 ; col>=0 && tempRow>0 ; col-- ) {
        console.log(`lDn  row : ${tempRow-1}     col : ${col}    `);
	if ( board[--tempRow][col] == CURRENT_PLAYER ) {
            piecesInArow++;
	    //console.log(`lDn  row : ${tempRow-1}     col : ${col}    -- ${piecesInArow}`);
	} else break;
    }

    //  Right & UP
    tempRow = rowFilled;
    for ( let col=colSelected  ; col<8 && tempRow<5 ; col++ ) {
        console.log(`rUp  row : ${tempRow+1}     col : ${col}    `);
	if ( board[++tempRow][col] == CURRENT_PLAYER ) {
            piecesInArow++;
	    //console.log(`rUp  row : ${tempRow}     col : ${col}    -- ${piecesInArow}`);
	} else break;
    }
    if ( piecesInArow >=4 ) return true;
}
