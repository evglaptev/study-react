import Rx from 'rxjs/Rx'
const HEAD_CODE = 1;
class Game {
  constructor(head_ = {x:0,y:0},vector_={x:1,y:0}, size_ = 10, tick_ = 300) {
    this.head = head_;
    this.size = size_;
    this.tick = tick_;
    this.data = this.dataInit(this.head);
    this.vector = vector_;
    this.snake = [].push(head_);
    this.tail = head_;
    document.addEventListener('keydown', this.setVector)
  }

  dataInit = (head_) => {
    let arr = [];
      for(let i=0; i<this.size*this.size; i++){
        if (i === head_.x*this.size+head_.y){
          arr[i] = 1;
        } else {
          arr[i] = 0;
        }
      }
      return arr;
  }

  dataAsObservable = () => {
    return Rx.Observable.create((observer) => {
      setInterval(() => observer.next(this.data), this.tick)
    })
  }

  setVector = (vector_) =>{ // 0,1; 0,-1; 1,0; -1,0;
    switch (vector_.key) {
      case 'ArrowUp':
        console.log(this);
        this.vector = {x:0,y:-1};
        console.log(this.vector);
        break;
      case 'ArrowRight':
      console.log("{x:1,y:0}");
        this.vector = {x:1,y:0};
        break;
      case 'ArrowDown':
        this.vector = {x:0,y:1};
        break;
      case 'ArrowLeft':
        this.vector = {x:-1,y:0};
        break;

    }
  }

  start(){
    setInterval(this.gameTick, this.tick)
  }

  gameTick = () => {
    console.log(this.vector.x);
    let nextHead = {
      x: this.head.x + this.vector.x,
      y: this.head.y + this.vector.y
    }
    this.head = nextHead
    this.data = this.data.map((value,key) => {
      if (key === this.getIndex(nextHead)){
        console.log(nextHead.x);
        return HEAD_CODE;
      } else if (key === this.getIndex(this.tail)) {
        return 0;
      } else {
        value;
      }
    })
  }


  getIndex = (cell) => cell.y*this.size+cell.x


}

export default Game;
