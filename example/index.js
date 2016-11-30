require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var MineSweeping = require('../lib/index');
	
class MineSweepingApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			mineCount: 60,
			xSize: 24,
			ySize: 24,
			openSum: 24 * 24,
			closeSum: 0
		}
	}
    replay(){
        this.refs.mine.replay();
		this.setState({
			openSum: 24 * 24,
			closeSum: 0
		})
    }
	handleClick(context){
		this.setState({
			openSum: context.openSum,
			closeSum: context.closeSum
		})
	}
    render(){
		var {mineCount,openSum,closeSum,xSize,ySize} = this.state;
        return (<div>
        <div>
                <button onClick={this.replay.bind(this)}>replay</button>
                <span>  open:</span>
                <span>{openSum}</span>
                <span>  close:</span>
                <span>{closeSum}</span>
                <span>  mine:</span>
                <span>{mineCount}</span>
        </div>        
        <MineSweeping ref="mine" mineCount={mineCount} xSize={xSize} ySize={ySize} onClick={this.handleClick.bind(this)}/>
        </div>)
    }
}

ReactDOM.render(<div>
                <MineSweepingApp />
                </div>,document.getElementById("react-container"));