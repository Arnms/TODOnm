import React, { Component } from 'react';
import './App.css';

import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TODOnm</h1>
        
        <div className='container'>
          <Todolist />
        </div>
      </div>
    );
  }
}

export default App;
