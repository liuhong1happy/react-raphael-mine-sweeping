"use strict";

var Model = function Model(x, y, value, open) {
	this.x = x;
	this.y = y;
	this.value = value;
	this.open = open;
	this.mineCount = 0;
};

module.exports = Model;