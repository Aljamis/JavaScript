/* Global Variables */ 
var board = [ 
				[ 'empty' , 'empty' , 'empty' ] ,
				[ 'empty' , 'empty' , 'empty' ] ,
				[ 'empty' , 'empty' , 'empty' ] ,
			];
var CURRENT_PLAYER = 'X';
var GAME_IS_WON = "";
var elemLeft;
var elemTop;


/* Draw the grid lines on the canvas */
function drawBoard() {
	var c          = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(100,0);
	ctx.lineTo(100,300);
	ctx.stroke();
	ctx.moveTo(200,0);
	ctx.lineTo(200,300);
	ctx.stroke();
	ctx.moveTo(0,100);
	ctx.lineTo(300,100);
	ctx.stroke();
	ctx.moveTo(0,200);
	ctx.lineTo(300,200);
	ctx.closePath();
	ctx.stroke();

}

function displayArray() {
	var arrayLength = board.length;
	for ( var idx=0 ; idx < arrayLength ; idx++ ) {
		console.log( board[idx] );
	}
}




/*  Process a turn :  
	   - If the game is won, retrurn. 
       - Is the cell empty?
	      - Draw the shape
	   - Is this a winning move?
	   - Toggle to the next player
 */ 
function playAturn( row , col ) {
	if ( GAME_IS_WON ) return;
	if ( fillInSquare( row , col ) ) return;
	if ( hasWon( row , col ) ) {
		var gameMsg = document.getElementById("whosTurn");
		gameMsg.innerHTML = CURRENT_PLAYER +"'s WINS !!!";
		gameMsg.style.color = "red";
		GAME_IS_WON = "YES";
	} else  {
		togglePlayer();	
	}

}


function fillInSquare( row , col ) {
	if ( board[row][col] != 'empty' ) {
		var gameMsg = document.getElementById("whosTurn");
		gameMsg.innerHTML = CURRENT_PLAYER +"'s !!  That space is taken.  Try again.";
		return "NO";
	} else {
		board[row][col] = CURRENT_PLAYER;
		drawXorO( row, col );
	}
}



/* Toggle from one player to the other */
function togglePlayer() {
	if (CURRENT_PLAYER == 'X') {
		CURRENT_PLAYER = 'O';
	} else {
		CURRENT_PLAYER = 'X';
	}
	
	var gameMsg = document.getElementById("whosTurn");
	gameMsg.innerHTML = CURRENT_PLAYER +"'s turn";
}


/* Draw either an X or O */
function drawXorO( row, col ) {
	if (CURRENT_PLAYER == 'X') {
		drawAnX( row , col);
	} else { 
		drawAnO( row, col);
	}
}


/* Draw an X in a cell */
function drawAnX( row, col) {
	var c   = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var x1 = (col *100) + elemLeft +10 , 
		y1 = (row *100) + 15 , 
		x2 = (col *100) + elemLeft + 80 ,
		y2 = (row *100) + 85 ;
	ctx.beginPath();
	ctx.lineWidth=5;
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth=5;
	ctx.moveTo(x1,y2);
	ctx.lineTo(x2,y1);
	ctx.closePath();
	ctx.stroke();
}



/* Draw an O in a cell */
function drawAnO( row, col) {
	console.log( elemLeft +" - "+ elemTop);
	var x1 = (col *100) + elemLeft +40 ,
		y1 = (row *100) + 50 ;
	console.log( x1 +" , "+ y1);

	var c   = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc( x1, y1, 40, 0, 2*Math.PI );
	ctx.lineWidth=5;
	ctx.stroke();
}




/* Check for 3 of the same  */
function hasWon( row , col ) {
	return ( (     board [row][0] == CURRENT_PLAYER
				&& board [row][1] == CURRENT_PLAYER
				&& board [row][2] == CURRENT_PLAYER  )
			|| (   board [0][col] == CURRENT_PLAYER
				&& board [1][col] == CURRENT_PLAYER
				&& board [2][col] == CURRENT_PLAYER  )
			|| (   board [0][0] == CURRENT_PLAYER
				&& board [1][1] == CURRENT_PLAYER
				&& board [2][2] == CURRENT_PLAYER  )
			|| (   board [0][2] == CURRENT_PLAYER
				&& board [1][1] == CURRENT_PLAYER
				&& board [2][0] == CURRENT_PLAYER  )
			)
}

