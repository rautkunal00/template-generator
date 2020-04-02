import React from 'react';

function Output() {
  return (
    <div className="output-panel">
      <table>
        <tr>
          <td>ISL</td>
          <td>ENG</td>
        </tr>
        <tr>
          <td>
            <textarea readonly></textarea>
          </td>
          <td>
            <textarea readonly></textarea>
          </td>
        </tr>
      </table>
    </div>
  );
}
export default Output;