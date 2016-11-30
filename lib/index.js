'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../less/style.less');
var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('react-raphael'),
    Set = _require.Set,
    Paper = _require.Paper,
    Text = _require.Text;

var Box = require('./box');
var Utils = require('./utils');

var mine = require('../images/mine.gif');
var none = "";

var MineSweeping = function (_React$Component) {
	_inherits(MineSweeping, _React$Component);

	function MineSweeping(props) {
		_classCallCheck(this, MineSweeping);

		var _this = _possibleConstructorReturn(this, (MineSweeping.__proto__ || Object.getPrototypeOf(MineSweeping)).call(this, props));

		_this.state = {
			loaded: false,
			models: [],
			gameOver: false,
			gameWin: false
		};
		return _this;
	}

	_createClass(MineSweeping, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.handleClick = this.handleClick.bind(this);
			var _props = this.props,
			    xSize = _props.xSize,
			    ySize = _props.ySize,
			    mineCount = _props.mineCount;

			var models = Utils.Init(xSize, ySize, mineCount);
			this.setState({
				loaded: true,
				models: models
			});
		}
	}, {
		key: 'handleClick',
		value: function handleClick(x, y) {
			var models = Utils.Fill(x, y);
			var gameOver = Utils.gameOver;
			var mineCount = this.props.mineCount;

			var closeSum = 0;
			for (var i = 0; i < Utils.ySum; i++) {
				for (var j = 0; j < Utils.xSum; j++) {
					if (!models[i][j].open) closeSum = closeSum + 1;
				}
			}
			var gameWin = closeSum == mineCount;
			if (this.state.gameOver || this.state.gameWin) return;
			if (gameOver) {
				var over = this.refs.over.getElement();
				over.toFront();
			}
			if (gameWin) {
				var win = this.refs.win.getElement();
				win.toFront();
			}
			this.setState({
				gameOver: gameOver,
				models: models,
				gameWin: gameWin
			});
			if (this.props.onClick) {
				this.props.onClick({
					x: x,
					y: y,
					models: models,
					closeSum: closeSum,
					openSum: Utils.ySum * Utils.xSum - closeSum
				});
			}
		}
	}, {
		key: 'replay',
		value: function replay() {
			var _props2 = this.props,
			    xSize = _props2.xSize,
			    ySize = _props2.ySize,
			    mineCount = _props2.mineCount;

			var models = Utils.Init(xSize, ySize, mineCount);
			this.setState({
				loaded: true,
				models: models,
				gameOver: false,
				gameWin: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    xSize = _props3.xSize,
			    ySize = _props3.ySize,
			    mineCount = _props3.mineCount,
			    boxWidth = _props3.boxWidth;

			var models = this.state.models;
			var handleClick = this.handleClick;
			var gameOver = this.state.gameOver;
			var gameWin = this.state.gameWin;
			var width = xSize * boxWidth;
			var height = ySize * boxWidth;
			return React.createElement(
				Paper,
				{ ref: 'paper', width: xSize * boxWidth, height: ySize * boxWidth },
				models.map(function (model, pos) {
					return React.createElement(
						Set,
						{ key: pos },
						model.map(function (ele) {
							return React.createElement(Box, _extends({ key: ele.x + '-' + ele.y }, ele, { onClick: handleClick, width: boxWidth, height: boxWidth }));
						})
					);
				}),
				React.createElement(Text, { ref: 'over', x: width / 2, y: height / 2, text: 'Game Over', attr: { "fill": "red", "font-size": 32 }, hide: !gameOver }),
				React.createElement(Text, { ref: 'win', x: width / 2, y: height / 2, text: 'Game Win', attr: { "fill": "green", "font-size": 32 }, hide: !gameWin })
			);
		}
	}]);

	return MineSweeping;
}(React.Component);

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
};

module.exports = MineSweeping;