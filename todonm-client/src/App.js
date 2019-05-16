import React, { Component } from 'react';
import './App.css';

import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todolist />
      </div>
    );
  }
}

export default App;
