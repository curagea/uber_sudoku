var BOARD = [0,8,2,4,0,5,7,0,3,0,1,0,6,8,3,5,0,0,5,3,9,7,0,0,6,4,8,0,7,4,3,5,6,0,8,9,8,0,0,9,0,7,0,0,6,9,6,3,0,0,8,4,7,0,7,4,5,0,0,0,2,3,1,0,0,8,5,3,4,0,6,0,3,0,6,2,0,1,8,5,0]
var SOLUTION = [6,8,2,4,9,5,7,1,3,4,1,7,6,8,3,5,9,2,5,3,9,7,1,2,6,4,8,2,7,4,3,5,6,1,8,9,8,5,1,9,4,7,3,2,6,9,6,3,1,2,8,4,7,5,7,4,5,8,6,9,2,3,1,1,2,8,5,3,4,9,6,7,3,9,6,2,7,1,8,5,4]


function Cell(row, col, digit, input) {
	var cell = this;

	this.row = row;
	this.col = col;
	this.block = [blockCoordinate(row), blockCoordinate(col)];
	this.digit = digit;
	this.input = input;

	this.input.value = (digit !== 0) ? digit : '';
	this.input.disabled = (digit !== 0);
};

function Board(boardContainer) {
	var board = this;

	this.rows = [];
	this.cols = [];
	this.blocks = [];
	this.cells = [];
	this.boardContainer = boardContainer;
	this.inputs = boardContainer.find('input');
	this.filledCellCount = 0;

	this.makeStorageGrid = function(emptyArray) {
		for (var i = 0; i < 9; i++) {
			emptyArray[i] = [];
		}
	};

	this.makeBlocksGrid = function(emptyArray) {
		for (var i = 0; i < 3; i++) {
			emptyArray[i] = [];
			for (var j = 0; j < 3; j++) {
				emptyArray[i][j] = [];
			}
		}
	};

	this.initBoard = function(boardData) {
		board.makeStorageGrid(this.rows);
		board.makeStorageGrid(this.cols);
		board.makeBlocksGrid(this.blocks);
		board.makeStorageGrid(this.cells);

		for (var row = 0; row < 9; row++) {
			for (var col = 0; col < 9; col++) {
				var digit = boardData[9 * row + col];
				board.initCell(digit, board.inputs[9 * row + col]);
				board.rows[row][col] = digit;
				board.cols[col][row] = digit;
				board.blocks[blockCoordinate(row)][blockCoordinate(col)][blockCellLocation(row, col)] = digit;
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
		board.filledCellCount = board.filledCellCount++;
	};

	this.downFillCount = function() {
		board.filledCellCount = board.filledCellCount--;
	};

	this.insertDigit = function(row, col, digit) {
		board.rows[row][col] = digit;
		board.cols[col][row] = digit;
		board.blocks[blockCoordinate(row)][blockCoordinate(col)][blockCellLocation(row, col)] = digit;
	};

	this.removeDigit = function(row, col) {
		board.rows[row][col] = 0;
		board.cols[col][row] = 0;
		blocks[blockCoordinate(row)][blockCoordinate(col)][blockCellLocation(row, col)] = 0;
	};

	this.checkInput = function(inputElement) {
		var row = inputElement.data('row');
		var col = inputElement.data('col');

		var value = inputElement.val();
		if (value === '') {
			board.removeDigit(row, col);
		} else {
			value = parseInt(inputElement.val());

			var unionArray = union_arrays(board.rows[row], board.cols[col]);
			unionArray = union_arrays(unionArray, board.blocks[blockCoordinate(row)][blockCoordinate(col)]);
			if (!isValidDigit(value) || ($.inArray(value, unionArray) !== -1)) {
				board.yell(inputElement);
			} else {
				board.insertDigit(row, col, value);
				inputElement.removeClass('invalid');
			}
		}
	};

	this.yell = function(inputElement) {
		inputElement.addClass('invalid');
	};

}

function union_arrays(x, y) {
	var obj = {};
	for (var i = x.length-1; i >= 0; -- i)
		 obj[x[i]] = x[i];
	for (var i = y.length-1; i >= 0; -- i)
		 obj[y[i]] = y[i];
	var res = []
	for (var k in obj) {
		if (obj.hasOwnProperty(k))
			res.push(obj[k]);
	}
	return res;
}

function blockCoordinate(x) {
	return Math.floor(x/3);
}
function blockCellLocation(x, y) {
	return 3 * (x % 3) + (y % 3);
}

function isValidDigit(value) {
	return $.isNumeric(value) && 0 < value && value < 10;
}


var theBoard = new Board($('.sudoku'));
theBoard.initBoard(BOARD);
