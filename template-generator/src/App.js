import React, { Component } from 'react';
import './App.scss';
import Selector from './components/Selector/Selector';
import Input from './components/Input/Input';
import Output from './components/Output/Output';

class App extends Component {
  render() {
    return (
      <div className="main-page">
        <Selector />
        <Input />
        <Output />
      </div>
    );
  }
}

export default App;
