import Rx from 'rxjs/Rx'
const HEAD_CODE = 1;
class Game {
  constructor(gameStart, head_ = {x:0,y:0},vector_={x:1,y:0}, size_ = 20, tick_ = 500) {
    this.initData = {
      head: head_,
      size: size_,
      tick: tick_,
      vector: vector_,
      cherry: {x:1,y:3}
    }
    this.gameStart = gameStart;
    document.addEventListener('keydown', this.setVector)
  }
  setInitData = () => {
    this.newVector = null;
    this.head = this.initData.head;
    this.size = this.initData.size;
    this.tick = this.initData.tick;
    this.cherry = this.initData.cherry;
    this.vector = this.initData.vector;
    this.data = [];
    this.snake = [];
    this.snake.push(this.head);
    this.tail = this.head;
  }

  getSize = () => this.size

  dataAsObservable = () => {
    return Rx.Observable.create((observer) =>
      this.observer = observer
    )
  };
  setVector = (vector_) =>{ // 0,1; 0,-1; 1,0; -1,0;
    let newVector_;
        switch (vector_.key) {
          case 'ArrowUp':
            newVector_ = {x:0,y:-1};
            break;
          case 'ArrowRight':
            newVector_ = {x:1,y:0};
            break;
          case 'ArrowDown':
            newVector_ = {x:0,y:1};
            break;
          case 'ArrowLeft':
            newVector_ = {x:-1,y:0};
            break;
          default:
            newVector_ = this.vector
            break;
        }
    if(this.newVector){
      this.nextVector = newVector_;
    } else {
      const notRevers =
        (Math.abs(newVector_.x - this.vector.x) < 2
        && Math.abs(newVector_.y - this.vector.y) < 2)

      if (notRevers){
        this.vector = newVector_;
      }
    }

  };

  start(){
    this.setInitData();
    this.gameTickId = setInterval(this.gameTick, this.tick)
  }

  stop(){
    clearInterval(this.gameTickId);
  }

  gameTick = () => {
    this.data = []

    if (this.nextVector) {
      this.vector = this.nextVector;
      this.nextVector = null;
    }
    let nextHead = {
      x: this.head.x + this.vector.x,
      y: this.head.y + this.vector.y
    };
    nextHead.x = nextHead.x <0? this.size + nextHead.x : nextHead.x
    nextHead.y = nextHead.y <0? this.size + nextHead.y : nextHead.y
    nextHead.x = Math.round((nextHead.x>=this.size)?nextHead.x/this.size-1:nextHead.x);
    nextHead.y = Math.round((nextHead.y>=this.size)?nextHead.y/this.size-1:nextHead.y);
    let isGameEnd =
      !this.snake.every((elem) => this.getIndex(nextHead) !== this.getIndex(elem))
    if (isGameEnd) {
      this.stop();
      alert("GAMEOVER :(")
    } else {
      this.snake.push(nextHead);
    }

    // let nextTail = {
    //   x: this.tail.x + this.vector.x,
    //   y: this.tail.y + this.vector.y
    // };
    let isOnCherry = this.getIndex(nextHead) === this.getIndex(this.cherry);
    this.head = nextHead;
    let keyNextHead_ = this.getIndex(nextHead)
    let keyCherry_ = this.getIndex(this.cherry)
    if (isOnCherry) {
      this.tick*=0.98;
      clearInterval(this.gameTickId);
      this.gameTickId = setInterval(this.gameTick,this.tick);
      this.cherry = this.getNextCherry();
      keyCherry_ = this.getIndex(this.cherry)
      this.iterateSnake = true;
    } else {
      this.iterateSnake = false;
    }

    if (!this.iterateSnake){
      let keyOldTail_ = this.getIndex(this.snake.shift())
        this.data.push({
          key: keyOldTail_,
          value: 0 // TODO 0 --> EMPTYCELL_CODE
        })
    }
    this.data.push({
      key: keyNextHead_,
      value: HEAD_CODE // TODO HEAD_CODE --> TAIL_CODE
    },
    {
      key: keyCherry_,
      value: 2 // TODO 2 --> CHERRY_CODE
    });


    this.tail = nextHead;
    this.observer.next(this.data);
    this.newVector = null;
    // console.log(this.data[keyTail_].value);

    // this.data[oldTail_] = {
    //   key: oldTail_,
    //   value: 0 // TODO 0 --> EMPTYCELL_CODE
    // }

    // this.data = this.data.map((value,key) => {
    //   if (key === this.getIndex(nextHead)){
    //     return HEAD_CODE;
    //   } else if (key === this.getIndex(this.tail)) {
    //     return 0;
    //   } else {
    //     value;
    //   }
    // })
  };

  getNextCherry = () => {
    return {
      x:Math.floor(Math.random()*this.size),
      y:Math.floor(Math.random()*this.size)
    }
  }

  getIndex = (cell) => cell.y*this.size+cell.x
}

export default Game;
