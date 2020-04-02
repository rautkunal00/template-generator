import React from 'react';
import './App.css';
import Selector from './components/Selector';
import Input from './components/Input';
import Output from './components/Output';

function App() {
  return (
    <div className="main-page">
      <Selector />
      <Input />
      <Output />
    </div>
  );
}

export default App;
