import React, { Component } from 'react';
import './App.css';

import AddList from "./AddList";
class App extends Component {
  render() {
    return (
      <div className="App">
        <AddList/>
      </div>
    );
  }
}

export default App;