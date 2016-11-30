require('../less/style.less')
const React = require('react');
const ReactDOM = require('react-dom');
const { Set,Paper,Text } = require('react-raphael');
const Box = require('./box');
const Utils = require('./utils')

var mine = require('../images/mine.gif');
var none = "";

class MineSweeping extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
			models: [],
			gameOver: false,
			gameWin: false
        }
    }
    componentDidMount(){
		this.handleClick = this.handleClick.bind(this);
		var {xSize,ySize,mineCount} = this.props;
		var models = Utils.Init(xSize,ySize,mineCount);
        this.setState({
			loaded: true,
			models: models
		})
    }
	handleClick(x,y){
		var models = Utils.Fill(x,y);
		var gameOver = Utils.gameOver;
		var {mineCount} = this.props;
		var closeSum = 0;
		for(var i = 0;i < Utils.ySum;i++){
			for(var j = 0;j < Utils.xSum;j++){
				if(!models[i][j].open) closeSum = closeSum +1;
			}
		}
        this.setState({
			gameOver: gameOver,
			models: models,
			gameWin: closeSum == mineCount
		})
		if(this.props.onClick){
			this.props.onClick({
				x: x,
				y: y,
				models: models,
				closeSum: closeSum,
				openSum: Utils.ySum* Utils.xSum - closeSum
			})
		}
	}
	replay(){
		var {xSize,ySize,mineCount} = this.props;
		var models = Utils.Init(xSize,ySize,mineCount);
        this.setState({
			loaded: true,
			models: models,
			gameOver: false,
			gameWin: false
		})
	}
    render(){
        var {xSize,ySize,mineCount,boxWidth} = this.props;
		var models = this.state.models;
		var handleClick = this.handleClick;
		var gameOver = this.state.gameOver;
		var gameWin = this.state.gameWin;
		var width = xSize*boxWidth;
		var height = ySize*boxWidth;
        return (<Paper ref="paper" width={xSize*boxWidth} height={ySize*boxWidth}>
            {
				models.map(function(model,pos){
					return (<Set key={pos}>
						{
							model.map(function(ele){
								return (<Box key={ ele.x+'-'+ele.y } {...ele}  onClick={handleClick} width={boxWidth} height={boxWidth}/>);
							})
						}	
					</Set>)
					
				})	
			}
			<Text x={width/2} y={height/2} text="Game Over" attr={{"fill": "red","font-size": 32 }} hide={!gameOver}/>
			<Text x={width/2} y={height/2} text="Game Win" attr={{"fill": "green","font-size": 32 }} hide={!gameWin}/>
        </Paper>)
    }
}

MineSweeping.propTypes = { 
	xSize: React.PropTypes.number, 
	ySize: React.PropTypes.number,
    mineCount: React.PropTypes.number,
	boxWidth: React.PropTypes.number
};

MineSweeping.defaultProps = { 
	xSize: 24, 
	ySize: 24,
    mineCount: 60,
	boxWidth: 32
}

module.exports = MineSweeping;