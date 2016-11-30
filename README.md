# react-raphael-mine-sweeping

so easy! create mine sweeping game with react-raphael!

## Install

    npm install --save react-raphael-mine-sweeping
    
## Quickly Start

``` js
var React = require('react');
var ReactDOM = require('react-dom');
var MineSweeping = require('react-raphael-mine-sweeping');
	
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
		var {mineCount,openSum,closeSum} = this.state;
        return (<div>
        <div>
                <button onClick={this.replay.bind(this)}>replay</button>
                <span>open box count:</span>
                <span>{openSum}</span>
                <span>close box count:</span>
                <span>{closeSum}</span>
                <span>mine count:</span>
                <span>{mineCount}</span>
        </div>        
        <MineSweeping ref="mine" mineCount={60} xSize={24} ySize={24} onClick={this.handleClick.bind(this)}/>
        </div>)
    }
}

ReactDOM.render(<div>
                <MineSweepingApp />
                </div>,document.getElementById("react-container"));
```

## API

#### All Scrawl Props

- width `number` width of the canvas
- height `number` height of the canvas
- attr `object` attr of the scrawl path, you can see [http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.attr](http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.attr)

#### All Scrawl Ref

- clear `function` clear all scrawl path

## Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)