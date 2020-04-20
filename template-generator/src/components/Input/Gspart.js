import React, { Component } from 'react';

class Gspart extends Component {
  render() {
    return (
      <table className="inputTable_GS" cellspacing="0" border="1">
        <tr>
          <th>Step Name</th>
          <th>Static</th>
          <th>Editor types</th>
          <th>No.of Editors object</th>
          <th>No.of Dropdowns object</th>
          <td><button id="Add-GS">Add GS</button></td>
        </tr>
      </table>
    );
  }
}

export default Gspart;