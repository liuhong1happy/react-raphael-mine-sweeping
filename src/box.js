const React = require('react');
const ReactDOM = require('react-dom');

const {Set,Rect,Image,Text} = require('react-raphael');

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
}

class Box extends React.Component{
	handleClick(e){
		var {x,y,onClick} = this.props;
		if(onClick){
			onClick(x,y);
		}
	}
	render(){
		var {x,y,width,height,value,open} = this.props;
		if(!open){
			return (<Set>
					<Rect x={x*width} y={y*height} width={width} height={height} attr={{"fill":"#7a9afa","stroke":"#fff","stroke-width":1 }} click={this.handleClick.bind(this)} />
				</Set>)
		}else if(value.length>1){
			return (<Set>
				<Rect x={x*width} y={y*height} width={width} height={height} attr={{"fill":"#cfcfcf","stroke":"#fff","stroke-width":1 }} />
				<Image src={ value } x={x*width+2} y={y*height+2} width={width-4} height={height-4}/>		
			</Set>)
		}else{
			return (<Set>
				<Rect x={x*width} y={y*height} width={width} height={height} attr={{"fill":"#cfcfcf","stroke":"#fff","stroke-width":1 }} />
				<Text x={x*width+width/2} y={y*height+height/2} text={ value } attr={{"fill": colors[value]}}></Text>	
			</Set>)
		}
	}
}
			
module.exports = Box;