import React, { Component } from 'react';

class Quetionpart extends Component {
  render() {
    return (
      <table className="inputTable_Que" cellspacing="0" border="1">
        <tr>
          <th>Step Name</th>
          <th>Editor types</th>
          <th>No.of Editors object</th>
          <th>No.of Dropdowns object</th>
          <td><button id="Add-Que">Add Question </button></td>
        </tr>
      </table>
    );
  }
}

export default Quetionpart;