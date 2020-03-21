

window.addEventListener('load', function load(event){
    addMainForm(); 
});

var statementModuleList = [];
var statementModuleListQuoted = [];
var resolutionModuleList = [];
var resolutionModuleListQuoted = [];
var totalModuleList = [];
var main_editor_array = [];
var editorModule = [];
var countDDm=[];
var toolType=[];
var countEditor=[];
var mainModuleData = [];
var object_reference = [];
var object_reference_editor = [];
var ans_editor = [];
var teacherModule =[];

function addMainForm() {
    const main_form = `Number of Parts:<input name=I1_size id="I1_Input" value="1" /><br/><br/>
          Number of Guided Solutions:<input name=GS1_size id="GS1_Input" /><br/><br/>
          <input type="submit" id="submit-btn" value="Submit"><br/><br/>`;
    document.getElementById("inputfields").innerHTML = main_form;
    var createButton = document.getElementById('submit-btn');
    createButton.addEventListener('click', function () {
        initializeSteps();
    });
}

function initializeSteps() {
    var i1_size = document.getElementById("I1_Input").value;
    var gs1_size = document.getElementById("GS1_Input").value;

    document.getElementById("inputfields").innerHTML = "";
    generateEditorList(i1_size,gs1_size);
    generateTableView(totalModuleList.length,i1_size);
    getReturnTypeList(statementModuleList);
    getReturnTypeList(resolutionModuleList);

}

function generateTableView(total_steps,i1_size) {
    var table_rows = "<tr><th>Step Name</th><th>Static</th><th>Editor types</th><th>No. of Editors object</th><th>No. of Dropdowns object</th><th>No. of Tries</th><th>Has Step Label</th><th>Separate AP for Dropdown</th></tr>";
    var tool_select=` 
    <option value="formed">formed</option>
    <option value="tabed">tabed</option>
    <option value="figed">figed</option>
  `;
    for(let i = 1; i<=total_steps; i++) {   
        var tool_select=` 
            <option id=formed-`+i+` value="formed">formed</option>
            <option id=tabed-`+i+` value="tabed">tabed</option>
            <option id=figed-`+i+` value="figed">figed</option>
        `;
        if (i<=i1_size){
        table_rows += "<tr><td>"+totalModuleList[i-1]+"</td><td><input style='display:none;' type='checkbox' id='checkbox-"+i+"' name='static' value='static' onchange='toggleSelection("+i+")'></td><td><select id='tools-"+i+"' name='tool-"+i+"'>"+tool_select+"</select></td><td><input name='editor-"+i+"' id='editor-"+i+"' size='1' value='1' /></td><td><input name='ddm-"+i+"' size='1' id='ddm-"+i+"' value='0'/></td><td><input name='tries-"+i+"' id='tries-"+i+"' type=number size='1' min='1' max='3' value='3' /></td><td></td><td><input type='checkbox' id='separate-"+i+"' name='separate-"+i+"' /></td></tr>"
        }
        else{
        table_rows += "<tr><td>"+totalModuleList[i-1]+"</td><td><input type='checkbox' id='checkbox-"+i+"' name='static' value='static' onchange='toggleSelection("+i+")'></td><td><select id='tools-"+i+"' name='tool-"+i+"'>"+tool_select+"</select></td><td><input name='editor-"+i+"' id='editor-"+i+"' size='1' value='1' /></td><td><input name='ddm-"+i+"' size='1' id='ddm-"+i+"' value='0'/></td><td></td><td><input type='checkbox' id='gsstep-"+i+"' name='gsstep-"+i+"'></td><td><input type='checkbox' id='separate-"+i+"' name='separate-"+i+"' /></td></tr>"
        }
    }
    var table = "<form><table border=1>"+table_rows+"</table></form>";
    var table_submit_btn = "<input type='submit' id='submit-table-btn' value='Submit'>";    

    var table_view = document.getElementById("table-view");
    table_view.innerHTML = table; 
    table_view.innerHTML += table_submit_btn;

    var tableButton = document.getElementById('submit-table-btn');
    tableButton.addEventListener('click', function() { parseTableResponse(i1_size); });
}

//disables input when static is selected
function toggleSelection(moduleNumber){
    console.log("checked "+moduleNumber);
    if(document.getElementById("checkbox-"+moduleNumber).checked){
        document.getElementById("formed-"+moduleNumber).setAttribute("disabled","disabled");
        document.getElementById("tabed-"+moduleNumber).setAttribute("disabled","disabled");
        document.getElementById("editor-"+moduleNumber).setAttribute("disabled","disabled");
        document.getElementById("ddm-"+moduleNumber).setAttribute("disabled","disabled");
        document.getElementById("separate-"+moduleNumber).setAttribute("disabled","disabled");
        var optionNone = document.createElement("option");
        var textNone=document.createTextNode("None");
        optionNone.appendChild(textNone);
        optionNone.setAttribute("id","none-"+moduleNumber);
        optionNone.setAttribute("value","none");
        document.getElementById("tools-"+moduleNumber).appendChild(optionNone);
        document.getElementById("none-"+moduleNumber).setAttribute("selected","selected");
    }
    if(!document.getElementById("checkbox-"+moduleNumber).checked){
        document.getElementById("formed-"+moduleNumber).removeAttribute("disabled");
        document.getElementById("tabed-"+moduleNumber).removeAttribute("disabled");
        document.getElementById("figed-"+moduleNumber).removeAttribute("selected");
        document.getElementById("editor-"+moduleNumber).removeAttribute("disabled");
        document.getElementById("ddm-"+moduleNumber).removeAttribute("disabled");
        document.getElementById("gsstep-"+moduleNumber).removeAttribute("disabled","disabled");
        document.getElementById("separate-"+moduleNumber).removeAttribute("disabled","disabled");
        var toolElement=document.getElementById("tools-"+moduleNumber);
        var noneElement=document.getElementById("none-"+moduleNumber);
        toolElement.removeChild(noneElement);
    }
}


function parseTableResponse(i1_size) {
    var module_data;
    var bStatic;
    var bSeparate;
    var elementId;
    var elementId_separate;
    var triesId;
    var noTries;
    var steplabel;
    for(let i=1; i<=totalModuleList.length; i++) {
        elementId = "checkbox-"+i;
        elementId_tool = "tools-"+i;
        elementId_editor = "editor-"+i;
        elementId_ddm = "ddm-"+i;
        elementId_separate = "separate-"+i;
        bStatic = document.getElementById(elementId).checked;
        tools_name = document.getElementById(elementId_tool).value;
        editors_count = Number(document.getElementById(elementId_editor).value);
        ddms_count = Number(document.getElementById(elementId_ddm).value);
        bSeparate = document.getElementById(elementId_separate).checked;
        if(i<=i1_size){
            triesId = "tries-"+i;
            noTries=Number(document.getElementById(triesId).value);
            module_data = {module_name:totalModuleList[i-1],isStatic:bStatic,tool_type:tools_name,editor_count:editors_count,ddm_count:ddms_count,isSeparateApNeeded:bSeparate,total_tries:noTries};
        }
        else{
            hasStepId = "gsstep-"+i;
            steplabel = document.getElementById(hasStepId).checked;
            module_data = {module_name:totalModuleList[i-1],isStatic:bStatic,tool_type:tools_name,editor_count:editors_count,ddm_count:ddms_count,isSeparateApNeeded:bSeparate,hasLabel:steplabel};
        }
        mainModuleData.push(module_data);
    }
    document.getElementById("table-view").innerHTML=""
    generateISLCode();
    var resetButton = document.getElementById('reset-table-btn');
    resetButton.addEventListener('click', function () {
        resetForm();
    });
}


function resetForm() {
    document.getElementById("finalCode").innerHTML = "";
    statementModuleList = [];
    statementModuleListQuoted = [];
    resolutionModuleList = [];
    resolutionModuleListQuoted = [];
    totalModuleList = [];
    main_editor_array = [];
    editorModule = [];
    countDDm=[];
    toolType=[];
    countEditor=[];
    mainModuleData = [];
    object_reference = [];
    object_reference_editor = [];
    ans_editor = [];
    teacherModule =[];
    addMainForm();
}
