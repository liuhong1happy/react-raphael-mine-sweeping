const React = require('react');
const ReactDOM = require('react-dom');

const {Set,Rect,Image,Text,Path} = require('react-raphael');

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
    constructor(props){
        super(props);
        this.state = {
            mark: false
        }
    }
	shouldComponentUpdate(nextProps,nextState){
		var fOpen = this.props.open != nextProps.open;
		var fValue = this.props.value != nextProps.value;
        var fMark = this.state.mark != nextState.mark;
		return fOpen || fValue || fMark;
	}
	handleClick(e){
		var {x,y,onClick} = this.props;
		if(onClick){
			onClick(x,y);
		}
	}
    handleMouseDown(e){
        e = e || event;
        var button = e.button;
        if(button != 2) return;
        this.setState({
             mark: !this.state.mark
        })
    }
    clearMark(){
        this.setState({
            mark: false
        })
    }
	render(){
		var {x,y,width,height,value,open} = this.props;
		if(!open){
			return (<Set>
					<Rect x={x*width} y={y*height} width={width} height={height} attr={{"fill":"#7a9afa","stroke":"#fff","stroke-width":1 }} click={this.handleClick.bind(this)} mousedown={this.handleMouseDown.bind(this)}/>
                    <Path d={["M",x*width+10, y*height+4,"L", x*width+10, y*height +height-4 ]} attr={{"fill":"yellow","stroke":"yellow","stroke-width":2}} hide={!this.state.mark}/>
                    <Path d={["M",x*width+12, y*height+4,"L", x*width+width-4, y*height +(height-8)/4,"L", x*width+12, y*height +(height-8)/2 ,"Z"]} attr={{"fill":"red","stroke":"#333"}} hide={!this.state.mark}/>
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