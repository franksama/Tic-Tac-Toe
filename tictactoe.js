/*
	Modular Pattern for Tic Tac Toe game
*/

var tictactoe = (function(my, $) {
	
	// Private variables using the _ convention
	var _board = new Array(3), 
	    _cols = 3, 
	    _rows = 3, 
	    _currentMove = true, 
	    _numOfMoves = _cols * _rows,
	    _winnerFound = false,
		_winner = "",
		_cat = false;
	
	
	// Initializer function
	function _init() {
		
		// initialize the board matrix
		_initBoard();
				
		/*
			Attaching an event handler on the div with id #board.  We listen for click events from the .col class link tags.
			We use event bubbling rather than attaching a click handler to every link tag.  This also helps with creating
			dynamic rows because an event handler would not need to be attached everytime.  We also namespace the handler
			to unbind in case it is needed in the future.
		*/
		$("#board").on("click.move", ".col", function(event){
			
			// if game is over then reset the board for next game
			if(_winnerFound || _cat) {
				// reset game board
				_initBoard();
			}
			
			// local variables
			var col, row;
			
			// clear any outcome
			$("#outcome").html("");
			
			// prevent the event from bubbling up any futher (optional)
			event.stopPropagation();
			event.preventDefault();
			
			// check if the cell is empty to check for valid moves
			if($(this).text().length === 0) {
				
				// get the row and col index
				col = $(this).data("col");
				row = $(this).parent().data("row");
				
				// Update the UI
				if(_currentMove) {
					_board[row][col] = "X";
					$(this).html('<span class="x">X</span>');
					_currentMove = false;
				} else {
					_board[row][col] = "O";
					$(this).html('<span class="o">O</span>');
					_currentMove = true;
				}
			
				// check moves
				_checkMoves();
				
				// check outcome
				_checkResults();
				
			} else {
				
				// invalid move 
				$("#outcome").html('Invalid move');
				
			}
			
		});
		
	}
	
	/*
		This function checks if the game outcome was determined or if the game is a Cat
	*/
	function _checkResults() {
		// decrement number of moves
		_numOfMoves--;
		
		// check if moves have expired and winner has not been found
		if(_numOfMoves === 0 && !_winnerFound) {
			_cat = true;
			$("#outcome").html('Cat! Click on board to start new game.');
		}
		
		if(_winnerFound) {
			$("#outcome").html(_winner + " is the winner! Click on board to start new game.");
		}
	}
	
	/*
		Reallocates the matrix
	*/
	function _initBoard(){
				
		// initialize the board matrix
		for(i = 0; i < _cols; i++) {
			_board[i] = new Array(_rows);
		}
		
		// clear out any previous moves
		$(".col").html("");
		
		// reset winner found
		_winnerFound = false;
		
		// reset cat
		_cat = false;
		
		// reset number of moves
		_numOfMoves = _cols * _rows;
	}
	
	/*
		This function checks the row x col matrix for valid moves by checking top and bottom, left and right, and then the diagonals.
		This solution has no hard coded rows or cols, thus it is scalable to bigger tic-tac-toe boards larger than 3x3.
	*/
	function _checkMoves() {
		
		// iterate through the rows
		for(row = 0; row < _rows; row++) {
			
			// iterate through the cols
			for (col = 0; col < _cols; col++) {
				
				// check top and bottom
				if(row - 1 >= 0 && typeof _board[row - 1][col] !== "undefined"
				   && row + 1 < _rows && typeof _board[row + 1][col] !== "undefined"){
					
					if(_board[row - 1][col] === _board[row][col] && _board[row + 1][col] === _board[row][col]) {
						_winnerFound = true;
						_winner = _board[row][col];
						break;
					}
					
				}
				
				// check left and right
				if(col - 1 >= 0 && typeof _board[row][col - 1] !== "undefined"
				   && col + 1 < _cols && typeof _board[row][col + 1] !== "undefined"){
					
					if(_board[row][col - 1] === _board[row][col] && _board[row][col + 1] === _board[row][col]) {
						_winnerFound = true;
						_winner = _board[row][col];
						break;
					}
				}
				
				// check diagonals
				if(col - 1 >= 0 && col + 1 < _cols && row - 1 >= 0 && row + 1 < _rows){

					if(typeof _board[row - 1][col - 1] !== "undefined"
					   && typeof _board[row + 1][col + 1] !== "undefined"
					   && _board[row - 1][col - 1] === _board[row][col] 
					   && _board[row + 1][col + 1] === _board[row][col]) {
						_winnerFound = true;
						_winner = _board[row][col];
						break;
					} else if(typeof _board[row - 1][col + 1] !== "undefined"
					    && typeof _board[row + 1][col - 1] !== "undefined"
					    && _board[row - 1][col + 1] === _board[row][col] 
						&& _board[row + 1][col - 1] === _board[row][col]) {
						_winnerFound = true;
						_winner = _board[row][col];
						break;
					}
					
				}
				
			}
			
			// if winner was found, then break out of loop
			if(_winnerFound) {
				break;
			}
			
		}
	}
	
	// initialize the game
	_init();
	
	// return any publicly exposed functions/variables
	return my;
	
}(tictactoe || {}, jQuery));