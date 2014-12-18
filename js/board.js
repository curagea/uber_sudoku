function Cell() {
	var cell = this;

	this.row = row;
	this.column = column;
	this.block = block;
	this.digit = digit || null;

	this.checkDigit = function(digit) {
		var unionArray = union_arrays(cell.row, cell.column);
		unionArray = union_arrays(unionArray, cell.block);
		if ($.inArray(cell.digit, unionArray)) {
			yell();
		} else {
			cell.row.addDigit(digit);
			cell.column.addDigit(digit);
			cell.Block.addDigit(digit);
		}
	};

};


function Group() {
	var group = this;

	this.digits = new Array();

	this.addDigit = function() {

	};

	this.removeDigit = function() {

	};

};

function Row() {
	var row = this;
	Group.call(this);
}

function Column() {
	var column = this;
	Group.call(this);
}

function Block() {
	var block = this;
	Group.call(this);
}

function yell() {
	alert("Hey!");
}

function union_arrays (x, y) {
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

var BOARD = "[0,8,2,4,0,5,7,0,3,0,1,0,6,8,3,5,0,0,5,3,9,7,0,0,6,4,8,0,7,4,3,5,6,1,8,9,8,0,0,9,0,7,0,0,6,9,6,3,1,2,8,4,7,0,7,4,5,0,0,9,2,3,1,0,0,8,5,3,4,0,6,0,3,0,6,2,0,1,8,5,0]"
var SOLUTION = "[6,8,2,4,9,5,7,1,3,4,1,7,6,8,3,5,9,2,5,3,9,7,1,2,6,4,8,2,7,4,3,5,6,1,8,9,8,5,1,9,4,7,3,2,6,9,6,3,1,2,8,4,7,5,7,4,5,8,6,9,2,3,1,1,2,8,5,3,4,9,6,7,3,9,6,2,7,1,8,5,4]"
