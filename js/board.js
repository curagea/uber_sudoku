var BOARD = [0,8,2,4,0,5,7,0,3,0,1,0,6,8,3,5,0,0,5,3,9,7,0,0,6,4,8,0,7,4,3,5,6,0,8,9,8,0,0,9,0,7,0,0,6,9,6,3,0,0,8,4,7,0,7,4,5,0,0,0,2,3,1,0,0,8,5,3,4,0,6,0,3,0,6,2,0,1,8,5,0]
var SOLUTION = [6,8,2,4,9,5,7,1,3,4,1,7,6,8,3,5,9,2,5,3,9,7,1,2,6,4,8,2,7,4,3,5,6,1,8,9,8,5,1,9,4,7,3,2,6,9,6,3,1,2,8,4,7,5,7,4,5,8,6,9,2,3,1,1,2,8,5,3,4,9,6,7,3,9,6,2,7,1,8,5,4]

var SOLVED = 'solved!';
var INVALID = 'booooo';


function Board(boardContainer) {
	var board = this;

	this.grid = [];

	this.boardContainer = boardContainer;
	this.inputs = boardContainer.find('input');
	this.validCellCount = 0;
	this.invalidCellCount = 0;

	this.initBoard = function(boardData) {
		board.grid = boardData;

		for (var row = 0; row < 9; row++) {
			for (var col = 0; col < 9; col++) {
				var digit = boardData[9 * row + col];
				board.initCell(digit, board.inputs[9 * row + col]);
				if (digit !== 0) {
					board.upFillCount();
				}
			}
		}

		board.inputs.on('change', function() {
			board.checkInput($(this));
		});
	};

	this.initCell = function(digit, inputElement) {
		if (digit !== 0) {
			inputElement.value = digit;
			inputElement.disabled = true;
		}
	}

	this.upFillCount = function() {
		board.validCellCount = board.validCellCount++;
	};

	this.downFillCount = function() {
		board.validCellCount = board.validCellCount--;
	};

	this.insertDigit = function(row, col, digit) {
		board.grid[9 * row + col] = digit;
		board.upFillCount();
	};

	this.removeDigit = function(row, col) {
		board.grid[9 * row + col] = digit;
		board.downFillCount();
	};

	this.checkInput = function(inputElement) {
		var row = inputElement.data('row');
		var col = inputElement.data('col');

		var value = inputElement.val();
		if (value === '') {
			board.removeDigit(row, col);
		} else {
			value = parseInt(inputElement.val());

			var unionArray = [];
			var cellRow = board.fetchRowDigits(row);
			var cellCol = board.fetchColumnDigits(col);
			var cellBlock = board.fetchBlockDigits(row, col);
			$.merge(unionArray, cellRow);
			$.merge(unionArray, cellCol);
			$.merge(unionArray, cellBlock);

			if (!isValidDigit(value) || ($.inArray(value, unionArray) !== -1)) {
				board.showBadCell(inputElement);
			} else {
				board.insertDigit(row, col, value);
				inputElement.removeClass('invalid');
				if (board.validCellCount === 81) {
					board.gameFinished(SOLVED);
				}
			}
		}
	};

	this.gameFinished = function(endState) {

	};

	this.showBadCell = function(inputElement) {
		inputElement.addClass('invalid');
	};

	this.fetchRowDigits = function(row) {
		var rowDigits = [];
		for (var i = 0; i < 9; i++) {
			rowDigits.push(board.grid[9 * row + i]);
		}
		return rowDigits;
	};

	this.fetchColumnDigits = function(col) {
		var colDigits = [];
		for (var i = 0; i < 9; i++) {
			colDigits.push(board.grid[9 * i + col]);
		}
		return colDigits;
	};

	this.fetchBlockDigits = function(row, col) {
		var blockDigits = [];
		var blockRow = Math.floor(row/3);
		var blockCol = Math.floor(col/3);

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var absoluteRow = 3 * blockRow + i;
				var absoluteCol = 3 * blockCol + j;
				blockDigits.push(board.grid[9 * absoluteRow + absoluteCol])
			}
		}

		return blockDigits;
	};

}

function isValidDigit(value) {
	return $.isNumeric(value) && 0 < value && value < 10;
}


var theBoard = new Board($('.sudoku'));
theBoard.initBoard(BOARD);
