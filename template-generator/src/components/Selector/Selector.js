import React, { Component } from 'react';
import './Selector.scss';

class Selector extends Component {
    render() {
        return (
            <div className="selector-panel">
                <form>
                    <label><input name="code-selector" type="radio" value="1" checked="checked" />With Fill Answer</label><br />
                    <label><input name="code-selector" type="radio" value="2" />Without Fill Answer</label>
                </form>
            </div>
        );
    }
}

export default Selector;