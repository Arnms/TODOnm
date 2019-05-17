import React, { Component } from 'react';
import './App.css';

import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TODOnm</h1>
        
        <Todolist />
      </div>
    );
  }
}

export default App;
