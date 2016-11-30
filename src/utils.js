var Model = require('./model');

var Utils = {
	xSum: 24,
	ySum: 24,
	mineCount: 25,
	models: [],
	mines: [],
	NONE: "",
	MINE: require('../images/mine.gif'),
	gameOver: false,
	Init: function(xSum,ySum,mineCount){
		Utils.xSum = xSum || Utils.xSum;
		Utils.ySum = ySum || Utils.ySum;
		Utils.mineCount = mineCount || Utils.mineCount;
		Utils.gameOver = false; 
		var sum = Utils.xSum*Utils.ySum;
		var rIndexs = [];
	    var i = 0;
		while(i <= Utils.mineCount -1){
			var r = parseInt(Math.random()*100000) % sum;
			if(rIndexs.indexOf(r) ==-1) {
				rIndexs.push(r);
				i = i+1;
			}
		}
		Utils.models = [];
		for(var i=0;i<Utils.ySum;i++){
			Utils.models[i] = [];
			for(var j=0;j<Utils.xSum;j++){
				var value = rIndexs.indexOf(i*Utils.xSum + j) == -1 ? Utils.NONE: Utils.MINE;
				Utils.models[i][j] = new Model(j,i,value,false);
			}
		}
		for(var i=0;i<Utils.ySum;i++){
			for(var j=0;j<Utils.xSum;j++){
				Utils.models[i][j].mineCount = Utils.CountMine(j,i);
			}
		}
		
		return Utils.models;
	},
	Fill: function(x,y){
		var mine = 0;
		if(Utils.models[y][x].value != Utils.MINE){
			// Continue
			Utils.models[y][x].open = true;
			mine = Utils.models[y][x].mineCount;
			if(mine == 0){
				for(var i = y - 1;i <= y + 1;i++){
					for(j = x - 1;j <= x + 1;j ++) {
						//越界
						if(!Utils.models[i] || !Utils.models[i][j]){
							continue;
						}
						//自己
						if(i == y && j == x){
							continue;
						}
						//已遍历
						if(Utils.models[i][j].open == true){
							continue;
						}
						Utils.Fill(Utils.models[i][j].x, Utils.models[i][j].y);
					}
				}
			} else {
				Utils.models[y][x].value = String(mine);
			}
		}else{
			// Game Over
			Utils.gameOver = true;
			for(var i = 0;i < Utils.ySum;i++){
				for(var j = 0;j < Utils.xSum;j++){
					if(Utils.models[i][j].value == Utils.MINE){
						Utils.models[i][j].open = true;
					} else {
						var mine = Utils.models[i][j].mineCount
						if(mine > 0){
							Utils.models[i][j].value = String(mine);
							Utils.models[i][j].open = true;
						}
					}
				}
			}
		}
		return Utils.models;
	},
	CountMine: function(x,y){
		var count = 0;
		for(var i = y - 1;i <= y + 1;i++){
			for(var j = x - 1;j <= x + 1;j++) {
				if(Utils.models[i] && Utils.models[i][j]){
					if(Utils.models[i][j].value == Utils.MINE){
						count++;
					}
				}
			}
		}
		return count;
	}
}

module.exports = Utils;