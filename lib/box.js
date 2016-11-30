'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('react-raphael'),
    Set = _require.Set,
    Rect = _require.Rect,
    Image = _require.Image,
    Text = _require.Text,
    Path = _require.Path;

var colors = {
	"": "#000",
	"1": "#0000ff",
	"2": "#00cc00",
	"3": "#ff0000",
	"4": "#ee0000",
	"5": "#dd0000",
	"6": "#cc0000",
	"7": "#bb0000",
	"8": "#aa0000"
};

var Box = function (_React$Component) {
	_inherits(Box, _React$Component);

	function Box(props) {
		_classCallCheck(this, Box);

		var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, props));

		_this.state = {
			mark: false
		};
		return _this;
	}

	_createClass(Box, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			var fOpen = this.props.open != nextProps.open;
			var fValue = this.props.value != nextProps.value;
			var fMark = this.state.mark != nextState.mark;
			return fOpen || fValue || fMark;
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			var _props = this.props,
			    x = _props.x,
			    y = _props.y,
			    onClick = _props.onClick;

			if (onClick) {
				onClick(x, y);
			}
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(e) {
			e = e || event;
			var button = e.button;
			if (button != 2) return;
			this.setState({
				mark: !this.state.mark
			});
		}
	}, {
		key: 'clearMark',
		value: function clearMark() {
			this.setState({
				mark: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    x = _props2.x,
			    y = _props2.y,
			    width = _props2.width,
			    height = _props2.height,
			    value = _props2.value,
			    open = _props2.open;

			if (!open) {
				return React.createElement(
					Set,
					null,
					React.createElement(Rect, { x: x * width, y: y * height, width: width, height: height, attr: { "fill": "#7a9afa", "stroke": "#fff", "stroke-width": 1 }, click: this.handleClick.bind(this), mousedown: this.handleMouseDown.bind(this) }),
					React.createElement(Path, { d: ["M", x * width + 10, y * height + 4, "L", x * width + 10, y * height + height - 4], attr: { "fill": "yellow", "stroke": "yellow", "stroke-width": 2 }, hide: !this.state.mark }),
					React.createElement(Path, { d: ["M", x * width + 12, y * height + 4, "L", x * width + width - 4, y * height + (height - 8) / 4, "L", x * width + 12, y * height + (height - 8) / 2, "Z"], attr: { "fill": "red", "stroke": "#333" }, hide: !this.state.mark })
				);
			} else if (value.length > 1) {
				return React.createElement(
					Set,
					null,
					React.createElement(Rect, { x: x * width, y: y * height, width: width, height: height, attr: { "fill": "#cfcfcf", "stroke": "#fff", "stroke-width": 1 } }),
					React.createElement(Image, { src: value, x: x * width + 2, y: y * height + 2, width: width - 4, height: height - 4 })
				);
			} else {
				return React.createElement(
					Set,
					null,
					React.createElement(Rect, { x: x * width, y: y * height, width: width, height: height, attr: { "fill": "#cfcfcf", "stroke": "#fff", "stroke-width": 1 } }),
					React.createElement(Text, { x: x * width + width / 2, y: y * height + height / 2, text: value, attr: { "fill": colors[value] } })
				);
			}
		}
	}]);

	return Box;
}(React.Component);

module.exports = Box;