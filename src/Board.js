import React from 'react'
import Square from './Square'
import  './Board.css'
import Game from './Game'
class Board extends React.Component{

  gameStart = () => {
    this.game = new Game(this.gameStart.bind(this));
    this.game.start();
    const size_ = this.game.getSize();
    this.setState({
        size: size_,
        data: this.dataInit(size_),
        i:0,
        currentKey:0
    });
    this.game.dataAsObservable().subscribe({next: data =>{
      let dat_ = this.state.data;
      data.forEach((elem) => {
        dat_[elem.key].value = elem.value
      } )
      this.setState({data:dat_});
      }
    });

  }

  gameStop = () => this.game.stop()
    constructor(props){
        super(props);
        this.state = {};
    }

    dataInit = (size) => {
      let obj = {};
        for(let i=0; i<size*size; i++){
          obj[i] = {
            key:i,
            value: 0
          };
        }
        return obj;
    }
    keyUpdate = () => {
        if (this.state.currentKey === this.state.size*this.state.size - 1) {
            this.setState({currentKey: 0})
        } else {
            this.setState({currentKey: this.state.currentKey + 1})
        }

    };

    getData = () => {
        let arrColl = [];
        for(let i=0; i<this.state.size; i++){
            let arrRow = [];
            for(let j=0; j<this.state.size; j++) {
                arrRow.push(<td key={j}><Square value={this.state.data[i*this.state.size+j].value} key={this.state.data[i*this.state.size+j].key}/></td>)
            }
            arrColl.push(<tr key={i}>{arrRow}</tr>)
        }
        return <table className="center"><tbody>{arrColl}</tbody></table>
    };

    render = () => <div><div>{this.getData()}</div>
    <div className="start center" onClick={this.gameStart.bind(this)}>START!</div>
    <div className="stop center" onClick={this.gameStop.bind(this)}>STOP!</div>
    </div>

    clickSquareHandle = (key) => {

        // console.log(`click on ${key}`)
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
