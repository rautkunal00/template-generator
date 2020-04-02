import React from 'react';
import './App.scss';
import Selector from './components/Selector/Selector';
import Input from './components/Input/Input';
import Output from './components/Output/Output';

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
