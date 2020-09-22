

window.addEventListener('load', function load(event){
    addMainForm(); 
});

var features=['numbers', 'plusbox', 'minusbox', 'dot', 'times', 'pow', 'sub', 'list', 'ratio', 'less', 'greater', 'equals', 'factorial', 'chemarrow', 'percent', 'letters', 'tilde', 'div', 'divs', 'divP', 'pair', 'par1', 'par2', 'par3', 'par'];
var feedbacks=['checkVariablesNoEqual:"x"', 'fractionNotReduced:"true"', 'nestedFraction:"true"', 'noDecimal:true', 'checkExponentValue:"neg|msg_neg_exponent"', 'notNumber:"true"', 'repeatList:"true"', 'useUnion:"true"', 'extraInterval:"true"', 'pairNotParentheses:"true"', 'reducedRoots:"true"','pairNotComma:"true"','repeatVariable:"true"'];
var buttons=['abs', 'alpha', 'approx', 'arccos', 'arccot', 'arccsc', 'arcsec', 'arcsin', 'arctan', 'am', 'and', 'bar', 'beta', 'biconditional', 'chemC', 'chemH', 'chemO', 'chemarrow', 'chisqCDF', 'chisq_inv', 'cm', 'cm2', 'cm3', 'conditional', 'conjunction', 'cos', 'cot', 'csc', 'cup', 'dam', 'dam2', 'dam3', 'degree', 'disjunction', 'div', 'divs', 'dm', 'dm2', 'dm3', 'doesnotexist', 'dot', 'dotdotdot', 'emptyset', 'equals', 'eval', 'exp_', 'fischerCDF', 'factorial', 'fischer_inv', 'floz', 'ft', 'ft2', 'ft3', 'gal', 'gamma', 'gram', 'greater', 'greaterequal', 'i', 'in', 'inch', 'inch2', 'inch3', 'infimany', 'infinity', 'interval', 'intervalCO', 'intervalOC', 'invcos', 'invsin', 'invtan', 'nPInInZ', 'kL', 'kg', 'km', 'km2', 'km3', 'lambda', 'lb', 'leftsupsub', 'less', 'lessequal', 'line_bar', 'list', 'liter', 'ln', 'log', 'logn', 'm', 'm2', 'm3', 'mL', 'mat11', 'mat21', 'mat31', 'mat41', 'mat12', 'mat22', 'mat32', 'mat13', 'mat23', 'mat33', 'mat34', 'mat14', 'mat44', 'mi', 'mg', 'minusbox', 'mixednb', 'mm', 'mm2', 'mm3', 'more', 'more2', 'mu', 'negation', 'neginfinity', 'nobutton', 'normalCDF', 'normal_inv', 'nosol', 'notequal', 'nroot', 'nu', 'or', 'oz', 'ozliq', 'p', 'p_hat', 'pair', 'par', 'percent', 'pi', 'pie', 'pie2', 'pie3', 'pint', 'plusbox', 'plusminus1', 'pm', 'pow', 'pulg', 'pulg2', 'pulg3', 'qt', 'ratio', 'R', 'ray', 'rho', 's', 'scinot', 'sec', 'segment_line', 'set', 'setbuilder', 'setbuilderwithx', 'setempty', 'sigma', 'sin', 'sqrt', 'studentCDF', 'student_inv', 'sub', 'suchthat', 'tan', 'theta', 'times', 'tz', 'undefined', 'undefined2', 'union', 'vector2', 'vector_i', 'vector_j', 'x', 'xbar', 'xprime', 'yhat', 'yprime', 'yd', 'yd2', 'yd3', 'Z','All', 'basic', 'basic2', 'basic3', 'basic4', 'basic_segment', 'basic_segment2', 'bigdot', 'bigdotline', 'bigdotruler', 'bigdotsegment', 'chemistry_attraction', 'chemistry_crystal', 'chemistry_distribution', 'chemistry_line_distribution', 'chemistry_polarization', 'compass_tutorial', 'conic', 'conic2', 'conic3', 'conic4', 'conic_grid', 'crop', 'crop2', 'croporientation', 'cst', 'cst_jump', 'cstp', 'cstp_tutorial', 'cstPanel', 'cstpSE', 'cstSE', 'curve', 'e_log', 'easy_ray_tutorial', 'easy_ruler', 'easy_ruler_tutorial', 'easy_segment_tutorial', 'functiontransformation', 'functiontransformation2', 'graphCalcTest', 'label_tutorial', 'lineray', 'linerayline', 'lineraysegment', 'lineraysegment_nopencil', 'lineraysegment2', 'linesegment', 'measure_ruler', 'measure_rulers', 'movevector', 'numline', 'numline_highed', 'numlinenosol', 'numlinepoint', 'orientation1', 'orientation2', 'ruler_points', 'segment', 'parabola', 'parabola2', 'parabola_noruler', 'parabola_tutorial', 'parabola_zone', 'parabola_zone2', 'phase', 'piecewise', 'piecewisetest', 'point', 'point_no_grid', 'polar', 'polarbasic', 'polarsimple', 'polynomialfunctions', 'protractor', 'rational', 'rational2', 'rational_demo', 'reflection', 'ruler', 'ruler_only', 'seruler_only', 'square', 'tangent', 'transformation3', 'trigo2', 'trigo2_tutorial', 'trigo3_tutorial', 'pencilgrid_graphfunction', 'trigo_asym', 'trigo_tutorial', 'trigoD', 'trigoSimple', 'vector', 'vector_tutorial', 'zone', 'zone1', 'zone2', 'zone_label', 'zone_only', 'zone_prob', 'zonefull_only'];
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
var object_reference_text = [];
var object_reference_editor = [];
var ans_editor = [];
var teacherModule =[];
var englishFileTexts=[];
var ShowMeTexts=[];
var i1_size;
var table_structure=``;

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
    i1_size = document.getElementById("I1_Input").value;
    var gs1_size = document.getElementById("GS1_Input").value;

    document.getElementById("inputfields").innerHTML = "";
    generateEditorList(i1_size,gs1_size);
    generateTableView(totalModuleList.length,i1_size);
    getReturnTypeList(statementModuleList);
    getReturnTypeList(resolutionModuleList);  
}
function generateTableView(total_steps,i1_size) {
    var table_rows = "<tr><th>Step Name</th><th>Static</th><th>Editor types</th><th>No. of Editors object</th><th>No. of Dropdowns object</th><th>No. of Tries</th><th>Has Step Label</th><th>Separate AP for Dropdown</th><th>Total no. of statements</th><th>No. of passive statements</th><th>Position of editor</th><th>Position of table (Comma separated list)</th><th>Buttons</th><th>Features</th><th>Feedbacks</th></tr>";
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
        var button_select=buttons.map( (element) => {
            return `<option value=${element}>${element}</option>`
        });
        var button_options=button_select.join("");
        var feature_select=features.map( (element) => {
            return `<option value=${element}>${element}</option>`
        });
        var feature_options=feature_select.join("");
        var feedbacks_select=feedbacks.map( (element) => {
            return `<option value=${element}>${element}</option>`
        });
        var feedbacks_options=feedbacks_select.join("");
        if (i<=i1_size){
        table_rows += "<tr><td>"+totalModuleList[i-1]+"</td><td><input style='display:none;' type='checkbox' id='checkbox-"+i+"' name='static' value='static' onchange='toggleSelection("+i+")'></td><td><select id='tools-"+i+"' name='tool-"+i+"'>"+tool_select+"</select></td><td><input name='editor-"+i+"' id='editor-"+i+"' size='1' value='1' /></td><td><input name='ddm-"+i+"' size='1' id='ddm-"+i+"' value='0'/></td><td><input name='tries-"+i+"' id='tries-"+i+"' type=number size='1' min='1' max='3' value='3' /></td><td></td><td><input type='checkbox' id='separate-"+i+"' name='separate-"+i+"' /></td><td><input name='text-"+i+"' size='1' id='text-"+i+"' value='0'/></td><td><input disabled name='passivetext-"+i+"' size='1' id='passivetext-"+i+"' value='0'/></td><td><input name='edittext-"+i+"' size='1'  id='edittext-"+i+"' value='0'/></td><td><input name='table-"+i+"' id='table-"+i+"' value='0'/></td><td><select class='option"+i+"' multiple='multiple'>"+button_options+"</select></td><td><select class='feature"+i+"' multiple='multiple'>"+feature_options+"</select></td><td><select style='width: 201px;word-wrap: break-word;' class='feedback"+i+"' multiple='multiple'>"+feedbacks_options+"</select></td></tr>"
        }
        else{
        table_rows += "<tr><td>"+totalModuleList[i-1]+"</td><td><input type='checkbox' id='checkbox-"+i+"' name='static' value='static' onchange='toggleSelection("+i+")'></td><td><select id='tools-"+i+"' name='tool-"+i+"'>"+tool_select+"</select></td><td><input name='editor-"+i+"' id='editor-"+i+"' size='1' value='1' /></td><td><input name='ddm-"+i+"' size='1' id='ddm-"+i+"' value='0'/></td><td></td><td><input type='checkbox' id='gsstep-"+i+"' name='gsstep-"+i+"'></td><td><input type='checkbox' id='separate-"+i+"' name='separate-"+i+"' /></td><td><input name='text-"+i+"' size='1' id='text-"+i+"' value='0'/></td><td><input name='passivetext-"+i+"' size='1' id='passivetext-"+i+"' value='0'/></td><td><input name='edittext-"+i+"' size='1'  id='edittext-"+i+"' value='0'/></td><td><input name='table-"+i+"' id='table-"+i+"' value='0'/></td><td><select class='option"+i+"' multiple='multiple'>"+button_options+"</select></td><td><select class='feature"+i+"' multiple='multiple'>"+feature_options+"</select></td></tr>"
        }
    }
    var table = "<form><table  border=1>"+table_rows+"</table></form>";
    var table_submit_btn = "<input type='submit' id='submit-table-btn' value='Submit'>";    

    var table_view = document.getElementById("table-view");
    table_view.innerHTML = table; 
    table_view.innerHTML += table_submit_btn;
    for(let i = total_steps; i>=1; i--) {   $('.option' + i).select2();}
    for(let i = total_steps; i>=1; i--) {   $('.feature' + i).select2();}
    for(let i = i1_size; i>=1; i--) {   $('.feedback' + i).select2();}
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
    var button_data=[]
    var feature_data=[]
    var feedback_data=[]
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
        elementId_textstatement = "text-"+i;
        elementId_passivestatement = "passivetext-"+i;
        elementId_editstatement = "edittext-"+i;
        elementId_table = "table-"+i;
        button_data=$(".option"+i).select2('val');
        feature_data=$(".feature"+i).select2('val');
        bStatic = document.getElementById(elementId).checked;
        tools_name = document.getElementById(elementId_tool).value;
        editors_count = Number(document.getElementById(elementId_editor).value);
        ddms_count = Number(document.getElementById(elementId_ddm).value);
        bSeparate = document.getElementById(elementId_separate).checked;
        text_statement = Number(document.getElementById(elementId_textstatement).value);
        passive_statement = Number(document.getElementById(elementId_passivestatement).value);
        edit_statement = Number(document.getElementById(elementId_editstatement).value);
        array_table = document.getElementById(elementId_table).value.split(",").map(function (item) {
            return parseInt(item, 10);
        });
        if(i<=i1_size){
            feedback_data=$(".feedback"+i).select2('val');
            triesId = "tries-"+i;
            noTries=Number(document.getElementById(triesId).value);
            module_data = {module_name:totalModuleList[i-1],isStatic:bStatic,tool_type:tools_name,editor_count:editors_count,ddm_count:ddms_count,isSeparateApNeeded:bSeparate,total_tries:noTries,textstatement:text_statement,passivestatement:passive_statement,edit_statement:edit_statement,table:array_table,button:button_data,feature:feature_data,feedback:feedback_data};
        }
        else{
            hasStepId = "gsstep-"+i;
            steplabel = document.getElementById(hasStepId).checked;
            module_data = {module_name:totalModuleList[i-1],isStatic:bStatic,tool_type:tools_name,editor_count:editors_count,ddm_count:ddms_count,isSeparateApNeeded:bSeparate,hasLabel:steplabel,textstatement:text_statement,passivestatement:passive_statement,edit_statement:edit_statement,table:array_table,button:button_data,feature:feature_data};
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
    document.getElementById("englishCode").innerHTML = "";
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
