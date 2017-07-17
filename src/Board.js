import React from 'react'
import Square from './Square'
import  './Board.css'
import Game from './Game'
class Board extends React.Component{
    constructor(props){
        super(props);
        this.game = new Game();
        this.game.dataAsObservable().subscribe({next: data => this.setState({data})})
        this.game.start();
        this.props = props;
        this.state = {
            data: this.dataInit(),
            i:0,
            currentKey:0
        };
        // setInterval(() => {
        //     this.clickSquareHandle(this.state.currentKey)
        //     this.keyUpdate()
        // }, 30)
    }

    dataInit = (start) => {
      let arr = [];
        for(let i=0; i<this.props.size*this.props.size; i++){
          arr[i] = 0;
        }
        return arr;
    }
    keyUpdate = () => {
        if (this.state.currentKey === this.props.size*this.props.size - 1) {
            this.setState({currentKey: 0})
        } else {
            this.setState({currentKey: this.state.currentKey + 1})
        }

    };

    getDataArr = () => {
        let arrColl = [];
        for(let i=0; i<this.props.size; i++){
            let arrRow = [];
            for(let j=0; j<this.props.size; j++) {
                arrRow.push(<td><Square value = {this.state.data[i*this.props.size+j]} id = {i*this.props.size+j} click={this.clickSquareHandle.bind(this)}/></td>)
            }
            arrColl.push(<tr>{arrRow}</tr>)
        }
        return <table><tbody>{arrColl}</tbody></table>
    };
    render = () => <div>{this.getDataArr()}</div>;

    clickSquareHandle = (key) => {

        console.log(`click on ${key}`)
        this.setState((prevState) => {
            return {
                data: prevState.data.map((value, key_) => {
                    if (key === key_) {
                        return value + 1
                    } else {
                        return value
                    }
                })
            }
        });

    }

}


export default Board;
