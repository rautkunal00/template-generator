// Generates the list of  Main parts and GS steps
function generateEditorList(main_part, g_steps) {
    let editor_name_quoted;
    let editor_name;
    for (let i=1; i<=main_part; i++) {
        editor_name_quoted = '"'+'I'+i+'"';
        editor_name = 'I'+i;
        statementModuleListQuoted.push(editor_name_quoted);
        statementModuleList.push(editor_name);
    } 
    for (let i=1; i<=g_steps; i++) {
        editor_name_quoted = '"'+'GS'+i+'"';
        editor_name = 'GS'+i;
        resolutionModuleListQuoted.push(editor_name_quoted);
        resolutionModuleList.push(editor_name);
    } 
    totalModuleList = statementModuleList.concat(resolutionModuleList);
    console.log(statementModuleList);
    console.log(resolutionModuleList);
    console.log(totalModuleList);
} 


function generateISLCode() {
    let statementModuleReturnValues = generateStatementSteps(statementModuleListQuoted)
    let resolutionModuleReturnValues = generateResolutionSteps(resolutionModuleListQuoted);
    let statementSteps = getStatementSteps(statementModuleList);
    let resolutionSteps = getResolutionSteps(resolutionModuleList);
    let ansproMapping = getAnsproMapping()
    let evaluationBlocks = generateEvaluations();
    let teacherModule = generateTeacherModule();
    let teacherHTMLModule = generateHTMLTeacherModule();
    var table_reset_btn = "<input type='reset' id='reset-table-btn' value='Reset'>";
    document.getElementById("finalCode").innerHTML = "<textarea id=\"finalCode\" rows=200 cols=\"150\">" + getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule) + "</textarea><br/><br/>" + table_reset_btn;
    console.log(getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule))
}
function getReturnTypeList(ModuleList) {
    var module_list = ModuleList.join(',');
    module_list = "{"+module_list+"}";
    console.log(module_list);
}

function getAnsproMapping() {
    var anspro_mapping =[];
    var editor;
    var mapping;
    for (let i=1; i<=statementModuleList.length; i++) {
        if(!mainModuleData[i-1].isStatic) {
            editor = mainModuleData[i-1].tool_type+"_"+mainModuleData[i-1].module_name;
            mapping = mainModuleData[i-1].module_name+":{\""+mainModuleData[i-1].tool_type+"_"+mainModuleData[i-1].module_name+"\"}";
            main_editor_array.push(editor);
            anspro_mapping.push(mapping);
            editorModule.push(mainModuleData[i-1].module_name);
            countDDm.push(mainModuleData[i-1].ddm_count)
            countEditor.push(mainModuleData[i-1].editor_count)
            toolType.push(mainModuleData[i-1].tool_type)
        }
    } 
    for (let i=1; i<=resolutionModuleList.length; i++) {
        if(!mainModuleData[i-1+statementModuleList.length].isStatic) {
            editor = mainModuleData[i-1+statementModuleList.length].tool_type+"_"+mainModuleData[i-1+statementModuleList.length].module_name;
            mapping = mainModuleData[i-1+statementModuleList.length].module_name+":{\""+mainModuleData[i-1+statementModuleList.length].tool_type+"_"+mainModuleData[i-1+statementModuleList.length].module_name+"\"}";            
            main_editor_array.push(editor);
            anspro_mapping.push(mapping);
            editorModule.push(mainModuleData[i-1+statementModuleList.length].module_name);
            countDDm.push(mainModuleData[i-1+statementModuleList.length].ddm_count)
            countEditor.push(mainModuleData[i-1+statementModuleList.length].editor_count)
            toolType.push(mainModuleData[i-1+statementModuleList.length].tool_type)
        }
    } 
    console.log(main_editor_array);
    console.log(anspro_mapping);
    const final_mapping = "<return value=#{"+anspro_mapping.join(',').toString()+"}>";
    return final_mapping;
}

function generateStatementSteps(statementSteps) {
    const returnValueStatementSteps = "<return value={"+statementSteps.join(',').toString()+"}>";
    return returnValueStatementSteps;
}

function generateResolutionSteps(resolutionSteps) {
    const returnValueResolutionSteps = "<return value={"+resolutionSteps.join(',').toString()+"}>";
    
    return returnValueResolutionSteps;
}

function getStatementSteps(statementSteps) {
    let statementModuleArr = [];
    for(let i=1; i<=statementSteps.length; i++) {
        let statementModuleTool;
        let statementVarTool = (mainModuleData[i-1].tool_type=="figed")?`
              @indent_start;`:``;
        if(!mainModuleData[i-1].isStatic || mainModuleData[i-1].tool_type=="figed") {
           statementModuleTool= generateToolWithObjects(i-1,i-1,statementSteps)           
        let toolMode= (mainModuleData[i-1].tool_type=="figed" && mainModuleData[i-1].isStatic)?"display":"editor";
            statementVarTool += `
                @`+mainModuleData[i-1].tool_type+`_`+toolMode+`_`+statementSteps[i-1]+`;
            `;
        }
        else {
            statementModuleTool = ``;
            statementVarTool = ``;
        }
        statementVarTool += (mainModuleData[i-1].tool_type=="figed")?`  @indent_end;
            `:``;         

        let commentHeader = "<!-- *************************************** " + statementSteps[i - 1] + " ***************************************-->";
        let statementModuleTitle = "<function name=StatementModule_"+statementSteps[i-1]+" list={modeRequested}>";
       let statementModule = `
        ${commentHeader}
        ${statementModuleTitle}  ${statementModuleTool}
            <TEXT REF=INTERACTION>${statementVarTool}</TEXT>
            <return value="INTERACTION">
        </function>
        `;
        statementModuleArr.push(statementModule);
    }
    return statementModuleArr.join("");
}

function getResolutionSteps(resolutionSteps) {
    let resolutionModuleArr = [];
    for(let i=1; i<=resolutionSteps.length; i++) {
        let resolutionModuleTool;
        let resolutionVarTool = (mainModuleData[i-1+statementModuleList.length].tool_type=="figed")?`
              @indent_start;`:``;
        if(!mainModuleData[i-1+statementModuleList.length].isStatic || mainModuleData[i-1+statementModuleList.length].tool_type=="figed") {
           resolutionModuleTool = generateToolWithObjects(i-1+statementModuleList.length,i-1,resolutionSteps)
        let toolMode= (mainModuleData[i-1+statementModuleList.length].tool_type=="figed" && mainModuleData[i-1+statementModuleList.length].isStatic)?"display":"editor";
            resolutionVarTool+=`
                @`+mainModuleData[i-1+statementModuleList.length].tool_type+`_`+toolMode+`_`+resolutionSteps[i-1]+`;
            `;
        }
        else {
            resolutionModuleTool = ``;
            resolutionVarTool+=``;
        }
        resolutionVarTool += (mainModuleData[i-1+statementModuleList.length].tool_type=="figed")?`  @indent_end;
            `:``;
      
        let commentHeader = "<!-- *************************************** " + resolutionSteps[i - 1] + " *************************************** -->";
        let resolutionModuleTitle = "<function name=ResolutionModule_"+resolutionSteps[i-1]+" list={modeRequested}>";
        let resolutionModule = `
        ${commentHeader}
        ${resolutionModuleTitle}   ${resolutionModuleTool}
            <TEXT REF=SOLUTION>${resolutionVarTool}</TEXT>
            <return value="SOLUTION">
        </function>
        `;
        resolutionModuleArr.push(resolutionModule);
    }
    return resolutionModuleArr.join("");
}

function generateEvaluations() {
    let evaluationBlocks = [];
    let rule_type;
    for(let i=1; i<=main_editor_array.length; i++) {
        var num= countEditor[i-1]+countDDm[i-1];
        let commentHeader = "<!-- *************************************** Answer processing of " + editorModule[i - 1] + " *************************************** -->";
        let evaluationHead = "<function name=anspro_"+main_editor_array[i-1]+" list={studentAnswer,teacherAnswer}>";
        let evaluationLoopModel=``;
        let initDDM=1;
        let limit_DDM=countDDm[i-1];

        if(toolType[i-1]=="formed"){
            if(countEditor[i-1]>0){
                evaluationLoopModel+=`
      &(@multiFeedback.splitAnswerEditBox("student_answer","@studentAnswer;"));
      &(@multiFeedback.splitAnswerEditBox("teacher_answer","@teacherAnswer;"));`;
                for(let j=1;j<=countEditor[i-1];j++){
                    evaluationLoopModel+=`         
      <evaluation rule=arith2 student="@student_answer`+j+`" teacher="@teacher_answer`+j+`">
      <feedback>           
        &(@userFeedback.fracSimplifyDivByOne(););
      </feedback>`;
            if(!(countEditor[i-1]==1 && countDDm[i-1]==0)) {
                if(j<10){
            evaluationLoopModel+=`
      &(@itemAnspro.storeFeedback("`+editorModule[i-1]+`.0`+j+`"))
      &(@itemAnspro.registerFeedback("`+editorModule[i-1]+`.0`+j+`"))
            `;   
                }
                else{
                    evaluationLoopModel+=`
      &(@itemAnspro.storeFeedback("`+editorModule[i-1]+`.`+j+`"))
      &(@itemAnspro.registerFeedback("`+editorModule[i-1]+`.`+j+`"))
                          `;   
                }   
            }
        }
            initDDM = 1+ countEditor[i - 1] ;
            limit_DDM = limit_DDM + countEditor[i-1];
            }
            if(countDDm[i-1]>0){
            evaluationLoopModel+=`
      &(@userf.splitReturnValueByName("@studentAnswer;",".student_"));
      &(@userf.splitReturnValueByName("@teacherAnswer;",".teacher_"));`;
                if(countDDm[i-1]==1){                                    
            evaluationLoopModel+=`
        <evaluation rule=choice student="@('.student_ans_returned_`+editorModule[i-1]+`_`+initDDM+`')" teacher="@('.teacher_ans_returned_`+editorModule[i-1]+`_`+initDDM+`')">
        <feedback>
        </feedback>`;    
            if(countEditor[i-1]>0){               
            evaluationLoopModel+=`
        &(@itemAnspro.storeFeedback("` + editorModule[i - 1] + `.0`+initDDM+`"))
        &(@itemAnspro.registerFeedback("` + editorModule[i - 1] + `.0`+initDDM+`"))`;
            }
                }
                else{
            evaluationLoopModel+=`
      <for name=j value=`+initDDM+` cond=(@j;<=`+limit_DDM+`) next=(@j;+1)> 
        <evaluation rule=choice student="@('.student_ans_returned_`+editorModule[i-1]+`_@j;')" teacher="@('.teacher_ans_returned_`+editorModule[i-1]+`_@j;')">
        <feedback>
        </feedback>
        <if cond=(@j;<10)>
            &(@itemAnspro.storeFeedback("` + editorModule[i - 1] + `.0@j;"))
            &(@itemAnspro.registerFeedback("` + editorModule[i - 1] + `.0@j;"))
        <else>
            &(@itemAnspro.storeFeedback("` + editorModule[i - 1] + `.@j;"))
            &(@itemAnspro.registerFeedback("` + editorModule[i - 1] + `.@j;"))
        </if>
      </for>`
                }
            }
        }
        if(toolType[i-1]=="figed"){          
            evaluationLoopModel+=`
      <evaluation rule=figed  student="@studentAnswer;" teacher="@teacherAnswer;">
      <feedback>
        <catch name=value.*>
        <catch name=system.*>
      </feedback>`;
        }
        if(toolType[i-1]=="tabed"){          
            evaluationLoopModel+=`
      &(@multiFeedback.splitAnswer3("student_answer","@userf.removeSet1("@studentAnswer;");"));
      &(@multiFeedback.splitAnswer3("teacher_answer","@userf.removeSet1("@teacherAnswer;");"));`;
            if(countEditor[i-1]>0){
                evaluationLoopModel+=`
      &(@multiFeedback.splitAnswerEditBox("student_ans","@studentAnswer;"));
      &(@multiFeedback.splitAnswerEditBox("teacher_ans","@teacherAnswer;"));`;
            }
                evaluationLoopModel+=`
      <evaluation rule=rule_type  student="@student_answer1;" teacher="@teacher_answer1;">
      <feedback></feedback>`;
        }
        let evaluationModel = `
    ${commentHeader}
    ${evaluationHead}${evaluationLoopModel}    
    </function>
        `;
        evaluationBlocks.push(evaluationModel);
    }
    
    return evaluationBlocks.join("");
}

function generateTeacherModule() {
    let teacherModule = [];
    let singleTeacherModule;
     for(let i=1; i<=main_editor_array.length; i++) {
        let teacherAnswer=``;
        var num= countEditor[i-1]+countDDm[i-1];
        if(main_editor_array[i-1].split("_", 1)=="formed"){
            for(let j=1; j<=num; j++) {
                if(j<=countEditor[i-1]){
                    teacherAnswer+=`[ans_returned_`+editorModule[i-1]+`_`+j+`]=[\\\\editbox;[]];`;
                }
                else{
                    teacherAnswer+=`[ans_returned_`+editorModule[i-1]+`_`+j+`]=[];`;
                }
                
            }
        }
        if(main_editor_array[i-1].split("_", 1)=="tabed"){
            teacherAnswer+=`\\\\set1;[`;
          for(let j=1; j<=num; j++) {
                if(j<=countEditor[i-1]){
                    teacherAnswer+=`[\\\\editbox;[]];`;
                }
                else{
                    teacherAnswer+=`[];`;
                }                
            } 
            teacherAnswer+=`]`; 
        }
        singleTeacherModule = `
        <var name=teacherAnswerHash[\"${main_editor_array[i-1]}\"] cond=(\"@partRequested;\" == \"${editorModule[i-1]}\") value=\"`+teacherAnswer+`\">`
        
        teacherModule.push(singleTeacherModule);
    }
    return teacherModule.join("");
}

function generateHTMLTeacherModule() {
    let teacherHTMLModule = [];
    let singleTeacherHTMLModule;
    for(let i=1; i<=main_editor_array.length; i++) {
        singleTeacherHTMLModule = `
        <var name=teacherAnswerHTML cond=(\"@partRequested;\" == \"${editorModule[i-1]}\") value=\"&(text())\">`
        
        teacherHTMLModule.push(singleTeacherHTMLModule);
    }
    return teacherHTMLModule.join("");
}
function generateToolWithObjects(moduleNumber,toolNumber,toolStep, pdf="false"){
    let toolMode= (mainModuleData[moduleNumber].tool_type=="figed" && mainModuleData[moduleNumber].isStatic)?"display":"editor"; 
    let editorObject=``;
    let tool_object=``;
    let pdfObject=``;
    let paramsRecall= `recall:text()`;  
    let paramsName =mainModuleData[moduleNumber].tool_type+`Params`+toolStep[toolNumber]+``;
    var num= mainModuleData[moduleNumber].editor_count+mainModuleData[moduleNumber].ddm_count;
    
    if(!(mainModuleData[moduleNumber].tool_type=="figed" || mainModuleData[moduleNumber].isStatic)){
        for(j=1;j<=num;j++){
            if(j<=mainModuleData[moduleNumber].editor_count){
                tool_object =`
                    <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`></text>`;
                object_reference.push(tool_object);
                editorObject+=`
                    <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=ansed returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>\\\\editbox;[]</object></text>`;
                pdfObject+=`
                    <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`>@print_blank();</text>`;
            }         
            else{
                tool_object = `
                    <text ref=` + mainModuleData[moduleNumber].tool_type + `_source_` + toolStep[toolNumber] + `_` + j + `></text>`;
                object_reference.push(tool_object);
                editorObject+=`
                    <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=UIChoice returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>
                <option value="1"></option>
                <option value="2"></option></object></text>`;
                pdfObject+=`
                    <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`>( \/ )</text>`;
            }
        }
               
    }

    if((mainModuleData[moduleNumber].tool_type=="figed")){ 
            paramsRecall+= `,width:350,height:350`;
    }
    if(pdf==="false"){    
        statementModuleTool = ` ${editorObject} 
          <var name=`+mainModuleData[moduleNumber].tool_type+`_`+toolMode+`_`+toolStep[toolNumber]+` value=@.toolLayout.createTool('`+mainModuleData[moduleNumber].tool_type+`','`+mainModuleData[moduleNumber].tool_type+`_`+toolStep[toolNumber]+`','`+toolMode+`',#{`+paramsRecall+`});>`;
    }
    else{
        statementModuleTool = ` 
        <if cond=("@modeRequested;"=="pdf")>${pdfObject}
        <else>${editorObject}
        </if>
          <var name=`+mainModuleData[moduleNumber].tool_type+`_`+toolMode+`_`+toolStep[toolNumber]+` value=@.toolLayout.createTool('`+mainModuleData[moduleNumber].tool_type+`','`+mainModuleData[moduleNumber].tool_type+`_`+toolStep[toolNumber]+`','`+toolMode+`',#{`+paramsRecall+`});>`;
        }
          return statementModuleTool;
}