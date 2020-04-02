import React from 'react';
import Addrow from './Addrow';
import './Input.scss';

function Input() {
  return (
    <div className="input-panel">
      <form>
        <p>Input Table</p>
        <table className="inputTable" cellspacing="0">
          <Addrow />
        </table>
      </form>
    </div>
  );
}

export default Input;