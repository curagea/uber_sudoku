/**
 * Constants
 * XXX: BOARD and SOLUTION would actually be data fetched somehow, either by an
 * async call for JSON data, or the data would already be loaded within the template
 * and then entered into the Board object upon initialization. They wouldn't be
 * constants. For the sake of simplicity though, board data is placed here.
 *
 * SOLUTION isn't actually used yet... it's here for completeness and if/when a
 * "show solution" action exists.
 */

// Board data is stored as an array of digits, with "0" representing blank cells.
var BOARD = [0,8,2,4,0,5,7,0,3,0,1,0,6,8,3,5,0,0,5,3,9,7,0,0,6,4,8,0,7,4,3,5,6,0,8,9,8,0,0,9,0,7,0,0,6,9,6,3,0,0,8,4,7,0,7,4,5,0,0,0,2,3,1,0,0,8,5,3,4,0,6,0,3,0,6,2,0,1,8,5,0]
var SOLUTION = [6,8,2,4,9,5,7,1,3,4,1,7,6,8,3,5,9,2,5,3,9,7,1,2,6,4,8,2,7,4,3,5,6,1,8,9,8,5,1,9,4,7,3,2,6,9,6,3,1,2,8,4,7,5,7,4,5,8,6,9,2,3,1,1,2,8,5,3,4,9,6,7,3,9,6,2,7,1,8,5,4]

/**
 * Santa's moods :)
 */
var HAPPY = 'Merry Christmas and a Happy New Year!';
var MAD = 'Lump of coal for you!';
var NEUTRAL = 'Flying to the next house...';

/**
 * The Board object
 * Handles loading up the initial digits, and checking for valid digits on input
 */
function Board(boardContainer, santa) {
	var board = this;

	this.grid = [];

	// While `boardContainer` isn't used anywhere within Board, it's stored here
	// anyways in case more stuff needs to be done to it in the future.
	this.boardContainer = boardContainer;
	this.santa = santa;
	this.inputs = boardContainer.find('input');

	// `validCellCount` counts how many valid digits have been entered so far.
	// It starts at the number of digits already in the board data.
	this.validCellCount = 0;

	this.initBoard = function(boardData) {
		board.grid = boardData;

		// Fill the initial board state
		for (var row = 0; row < 9; row++) {
			for (var col = 0; col < 9; col++) {
				var digit = boardData[9 * row + col];
				board.initFilledCell(digit, board.inputs[9 * row + col]);
				if (digit !== 0) {
					board.validCellCount++;
				}
			}
		}

		board.inputs.on('change', function() {
			board.checkInput($(this));
		});
	};

	/**
	 * Populates the input for a pre-filled digit, and disables the input so it can't
	 * be changed.
	 */
	this.initFilledCell = function(digit, inputElement) {
		if (digit !== 0) {
			inputElement.value = digit;
			inputElement.disabled = true;
		}
	}

	/** The big workhorse of the Board object: checking validity of an entered digit */
	this.checkInput = function(inputElement) {
		var row = inputElement.data('row');
		var col = inputElement.data('col');

		var value = inputElement.val();
		// If the input is blanked out, clear out the corresponding cell.
		if (value === '') {
			board.removeDigit(row, col);
		} else {
			value = parseInt(inputElement.val());

			// Take the row, column, and 3x3 block that the current digit is in, and get
			// the union of them. If the digit already exists in the union, then it is
			// invalid, in which case Santa's got some coal...
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
				board.neutralizeCell(inputElement);
				// If all 81 cells are filled correctly, then the game ends
				if (board.validCellCount === 81) {
					board.gameFinished();
				}
			}
		}
	};

	this.insertDigit = function(row, col, digit) {
		board.grid[9 * row + col] = digit;
		board.validCellCount++;
	};

	this.removeDigit = function(row, col) {
		// If the cell wasn't empty in the first place, decrease the validCellCount.
		if (board.grid[9 * row + col] !== 0) {
			board.validCellCount--;
		}
		board.grid[9 * row + col] = 0;
	};

	/** Shows that the digit is invalid */
	this.showBadCell = function(inputElement) {
		inputElement.addClass('invalid');
		board.changeSanta(MAD);
	}

	/** If the digit is fine, clear any errors from the input */
	this.neutralizeCell = function(inputElement) {
		inputElement.removeClass('invalid');
		board.changeSanta(NEUTRAL);
	}

	/** Helper functions to fetch a row, column, and 3x3 block */
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

	/** Functions to show the board's condition */
	this.gameFinished = function() {
		board.changeSanta(HAPPY);
	};

	this.changeSanta = function(state) {
		if (state === HAPPY) {
			board.santa.removeClass('coal').addClass('merry-christmas');
		} else if (state === MAD) {
			board.santa.removeClass('merry-christmas').addClass('coal');
		} else {
			board.santa.attr('class', 'santa');
		}
	}
};

/** Checks if a value is a valid integer, and if it's within [1-9]. */
function isValidDigit(value) {
	return $.isNumeric(value) && 0 < value && value < 10;
};

/** Load up the board data when the page is loaded */
$(document).ready(function() {
	var theBoard = new Board($('.sudoku'), $('.santa'));
	theBoard.initBoard(BOARD);
});
