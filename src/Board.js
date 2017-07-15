import React from 'react'
import Square from './Square'

const SIZE = 3;
class Board extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [0,0,0,0,0,0,0,0,0],
            i:0,
            currentKey:0
        };
        setInterval(() => {
            this.keyUpdate()
            this.clickSquareHandle(this.state.currentKey)
        }, 30)
    }
    keyUpdate = () => {
        if (this.state.currentKey === 8) {
            this.setState({currentKey: 0})
        } else {
            this.setState({currentKey: this.state.currentKey + 1})
        }

    };

    getDataArr = () => {
        let arrColl = [];
        for(let i=0; i<SIZE; i++){
            let arrRow = [];
            for(let j=0; j<SIZE; j++) {
                arrRow.push(<td><Square value = {this.state.data[i*SIZE+j]} id = {i*SIZE+j} click={this.clickSquareHandle.bind(this)}/></td>)
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