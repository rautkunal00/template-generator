import React, { Component } from 'react';
import Quetionpart from './Quetionpart';
import './Input.scss';
import Gspart from './Gspart';

class Input extends Component {
  render() {
    return (
      <div className="input-panel">
        <form>
          <p>Input Table</p>
          <Quetionpart />
          <Gspart />
        </form>
      </div>
    );
  }
}

export default Input;