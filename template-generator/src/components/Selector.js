import React from 'react';

function Selector() {
    return (
        <div className="selector-panel">
            <form>
                <label><input name="code-selector" type="radio" value="1" />Without Fill Answer</label>
                <label><input name="code-selector" type="radio" value="2" />With Fill Answer</label>
            </form>
        </div>
    );
}

export default Selector;