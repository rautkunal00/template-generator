let mainQueForm = () => {
    let form = `
    <div class="formData hide" id="mainPopupForm">
        <form class="form-container">
            <table>
                <tr>
                    <th>Attribute Name</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Step Name</td>
                    <td id="mainStepName">I${noMainQue}</td>
                </tr>
                <tr>
                    <td>Editor type</td>
                    <td><select id="mainEditorSelector">${editorsList}</select></td>
                </tr>
                <tr>
                    <td>No. of Editbox</td>
                    <td><input type=number id="mainEditboxCount" name="mainEditboxCount" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td>No. of Dropdowns</td>
                    <td><input type=number id="mainDropdownCount" name="mainDropdownCount" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td>No. of Tries</td>
                    <td><input type=number id="mainTriesCount" name="mainTriesCount" value="3" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td><button id="cancelMainForm">Cancel</button></td>
                    <td><button id="submitMainForm" disabled="disabled">Submit</button></td>
                </tr>
            </table>
        </form>
    </div>`;
    return form;
}

let gsQueForm = () => {
    let form = `
    <div class="formData hide" id="gsPopupForm">
        <form class="form-container">
            <table>
                <tr>
                    <th>Attribute Name</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Step Name</td>
                    <td id="gsStepName">GS${noGsQue}</td>
                </tr>
                <tr>
                    <td>Static Step</td>
                    <td><input type=checkbox id="isStaticGS" name="isStaticGS" /></td>
                </tr>
                <tr>
                    <td>Editor type</td>
                    <td><select id="gsEditorSelector" disabled="disabled">${editorsList}</select></td>
                </tr>
                <tr>
                    <td>No. of Editbox</td>
                    <td><input type=number id="gsEditboxCount" name="gsEditboxCount" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td>No. of Dropdowns</td>
                    <td><input type=number id="gsDropdownCount" name="gsDropdownCount" disabled="disabled" /></td>
                </tr>
                <tr>
                    <td><button id="cancelGsForm">Cancel</button></td>
                    <td><button id="submitGsForm" disabled="disabled">Submit</button></td>
                </tr>
            </table>
        </form>
    </div>`;
    return form;
}
