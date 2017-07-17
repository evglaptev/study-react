import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'

class App extends Component {
  render() {
    return (
      <Board size={20} />
    );
  }
}

export default App;
