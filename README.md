# react-raphael-mine-sweeping

[![Version](https://img.shields.io/npm/v/react-raphael-mine-sweeping.svg)](https://www.npmjs.com/package/react-raphael-mine-sweeping)
[![Downloads](https://img.shields.io/npm/dt/react-raphael-mine-sweeping.svg)](https://www.npmjs.com/package/react-raphael-mine-sweeping)

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

- mineCount `number` mine count of the game
- xSize `number` column count of the boxs
- ySize `number`  row count of the boxs
- onClick `function` click event of the game `context=>{x,y,models,openSum,closeSum}`

#### All Scrawl Ref

- replay `function` replay the game

## Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)