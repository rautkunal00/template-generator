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
    let ans_teacher = generateTeacherSimple();
    let no_of_tries = generateTries();
    let has_step_label = generateStepLabel();
    let teacherHTMLModule = generateHTMLTeacherModule();
    var table_reset_btn = "<input type='reset' id='reset-table-btn' value='Reset'>";
    document.getElementById("finalCode").innerHTML = "<textarea id=\"finalCode\" rows=200 cols=\"200\">" + getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label) + "</textarea><br/><br/>" + table_reset_btn;
    console.log(getISLCode(statementModuleReturnValues, resolutionModuleReturnValues, statementSteps, resolutionSteps, ansproMapping, evaluationBlocks, teacherModule, teacherHTMLModule, ans_teacher, no_of_tries, has_step_label))
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
           statementModuleTool= generateToolWithObjects(i-1,i-1,statementSteps,1)           
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
           resolutionModuleTool = generateToolWithObjects(i-1+statementModuleList.length,i-1,resolutionSteps,2)
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


//Depending on the input type the split answer function will be choosen.
//Input: count of editbox,count of DDM 
//Output: string of splliting the student and teacher answer.
function splitStudentAnswer(count_editbox,count_ddm) {
    let splitAnswerModel=``;
    // Adds for editbox;
    if(count_editbox>0) {
        splitAnswerModel+=`
      &(@multiFeedback.splitAnswerEditBox("student_answer","@studentAnswer;"));
      &(@multiFeedback.splitAnswerEditBox("teacher_answer","@teacherAnswer;"));
        `;
    }
    //Adds for DDM/radiobuttons
    if(count_ddm>0) {
        splitAnswerModel+=`
      &(@userf.splitReturnValueByName("@studentAnswer;",".student_"));
      &(@userf.splitReturnValueByName("@teacherAnswer;",".teacher_"));
        `;
    }
    return splitAnswerModel;
}


//Adds AP for with same rule and catches to all editbox objects.
//Input:
//Output:
function addSingleEditbox(module_index,count_ddm) {
    var module_name= editorModule[module_index];
    let singleEditboxModel=``;
    singleEditboxModel+=`
      <evaluation rule=arith2 teacher="@teacher_answer1;" student="@student_answer1;">         
        <feedback>
          &(@userFeedback.fracSimplifyDivByOne(););
        </feedback>`;

        if(count_ddm>0){
            singleEditboxModel+=`
          &(@itemAnspro.storeFeedback("`+module_name+`.01"););
          &(@itemAnspro.registerFeedback("`+module_name+`.01"));
          `;
        }
      return singleEditboxModel;
}


function addSameApEditbox(module_index) {
    var module_name= editorModule[module_index];
    var number_editbox= countEditor[module_index];
    let sameAnswerModel=``;
    sameAnswerModel+=`
      <for name=i value=1 cond=(@i;<=`+number_editbox+`) next=(@i;+1)>
        <evaluation rule=arith2 teacher="@('teacher_answer@i;');" student="@('student_answer@i;');">         
        <feedback>
          &(@userFeedback.fracSimplifyDivByOne(););
        </feedback>
        <if cond=(@i;>9)>
          &(@itemAnspro.storeFeedback("`+module_name+`.@i;"););
          &(@itemAnspro.registerFeedback("`+module_name+`.@i;"));
        <else>
          &(@itemAnspro.storeFeedback("`+module_name+`.0@i;"););
          &(@itemAnspro.registerFeedback("`+module_name+`.0@i;"));
        </if>
      </for>`
      return sameAnswerModel;
}


function addSeparateApEditbox(module_index){
    var module_name= editorModule[module_index];
    var number_editbox= countEditor[module_index];
    var count_ddm= countDDm[module_index];
    let diffAnswerModel=``;

      for(let j=1;j<=number_editbox;j++){
        diffAnswerModel+=`         
        <evaluation rule=arith2 student="@student_answer`+j+`" teacher="@teacher_answer`+j+`">
        <feedback>           
            &(@userFeedback.fracSimplifyDivByOne(););
        </feedback>`;
    if(!(number_editbox==1 && countDDm==0)) {
        if(j<10){
            diffAnswerModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.0`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.0`+j+`"))
    `;   
    }
    else{
        diffAnswerModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.`+j+`"))
            `;   
            }   
        }
    }
    return diffAnswerModel;
}


function addSameApDdm(module_index,ddm_start_index){
    var module_name= editorModule[module_index];
    var count_ddm= countDDm[module_index];
    var number_editors= countEditor[module_index]+count_ddm;
    let sameDdmModel=``;
      
    sameDdmModel+=`               
    <for name=j value=`+ddm_start_index+` cond=(@j;<=`+number_editors+`) next=(@j;+1)> 
    <evaluation rule=choice student="@('.student_ans_returned_`+module_name+`_@j;')" teacher="@('.teacher_ans_returned_`+module_name+`_@j;')">
    <feedback>
    </feedback>
    <if cond=(@j;<10)>
        &(@itemAnspro.storeFeedback("` + module_name + `.0@j;"))
        &(@itemAnspro.registerFeedback("` + module_name + `.0@j;"))
    <else>
        &(@itemAnspro.storeFeedback("` + module_name + `.@j;"))
        &(@itemAnspro.registerFeedback("` + module_name + `.@j;"))
    </if>
    </for>`;   
    return sameDdmModel;
}

function addSeparateApDdm(module_index,ddm_start_index){
    var module_name= editorModule[module_index];
    var count_ddm= countDDm[module_index];
    var number_editors= countEditor[module_index]+count_ddm;
    let diffDdmModel=``;
      
    for (let j=ddm_start_index; j<=number_editors; j++){ 
        diffDdmModel+=`               
        <evaluation rule=choice student="@.student_ans_returned_`+module_name+`_`+j+`;" teacher="@.teacher_ans_returned_`+module_name+`_`+j+`;">
        <feedback>
        </feedback>`;
        if (j<10){
        diffDdmModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.0`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.0`+j+`"))
        `;
        }
        else{  
        diffDdmModel+=`
        &(@itemAnspro.storeFeedback("`+module_name+`.`+j+`"))
        &(@itemAnspro.registerFeedback("`+module_name+`.`+j+`"))
        `;
          }
    }
    return diffDdmModel;
}


function generateEvaluations() {
    let evaluationBlocks = [];
    let rule_type;
    for(let i=1; i<=main_editor_array.length; i++) {
        var num= countEditor[i-1]+countDDm[i-1];
        var count_editbox= countEditor[i-1];
        var count_ddm= countDDm[i-1];
        let commentHeader = "<!-- *************************************** Answer processing of " + editorModule[i - 1] + " *************************************** -->";
        let evaluationHead = "<function name=anspro_"+main_editor_array[i-1]+" list={studentAnswer,teacherAnswer}>";
        let evaluationLoopModel=``;
        let initDDM=1;
        let limit_DDM=countDDm[i-1];

        if(toolType[i-1]=="formed"){
            evaluationLoopModel+=splitStudentAnswer(count_editbox,count_ddm);
            if(countEditor[i-1]>0){
                if(count_editbox==1){
                    evaluationLoopModel+=addSingleEditbox(i-1,count_ddm);
                }
                else{
                    evaluationLoopModel+=addSeparateApEditbox(i-1);             
                }
            initDDM = 1+ countEditor[i - 1] ;
            limit_DDM = limit_DDM + countEditor[i-1];
            }
            if(countDDm[i-1]>0){
                if(countDDm[i-1]==1){                                    
            evaluationLoopModel+=`
        <evaluation rule=choice student="@('.student_ans_returned_`+editorModule[i-1]+`_`+initDDM+`')" teacher="@('.teacher_ans_returned_`+editorModule[i-1]+`_`+initDDM+`')">
        <feedback>
        </feedback>`;    
            if(countEditor[i-1]>0){ 
            if(initDDM>9){
                evaluationLoopModel+=`
        &(@itemAnspro.storeFeedback("` + editorModule[i - 1] + `.`+initDDM+`"))
        &(@itemAnspro.registerFeedback("` + editorModule[i - 1] + `.`+initDDM+`"))`;
            }   
            else{           
            evaluationLoopModel+=`
        &(@itemAnspro.storeFeedback("` + editorModule[i - 1] + `.0`+initDDM+`"))
        &(@itemAnspro.registerFeedback("` + editorModule[i - 1] + `.0`+initDDM+`"))`;
            }
            }
                }
                else if(!mainModuleData[i-1].isSeparateApNeeded){
                    evaluationLoopModel+=addSameApDdm(i-1,initDDM);
                }
                else{
                    evaluationLoopModel+=addSeparateApDdm(i-1,initDDM);             
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
                evaluationLoopModel+=splitStudentAnswer(count_editbox,count_ddm);
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
    teacherModule = [];
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
        ans_editor.push(teacherAnswer);
        singleTeacherModule = `
        <var name=teacherAnswerHash[\"${main_editor_array[i-1]}\"] cond=(\"@partRequested;\" == \"${editorModule[i-1]}\") value=\"@ans_`+editorModule[i-1]+`;\">`
        
        teacherModule.push(singleTeacherModule);
    }
    return teacherModule.join("");
}

function generateTeacherSimple(){
    let totalCount = editorModule.length;
    let simpleTeacher=``;
    let simpleTeacherArray=[];
    for(i=1;i<=totalCount;i++){
        simpleTeacher = `
        <var name=ans_${editorModule[i-1]} value=\"${ans_editor[i-1]}\">`
        simpleTeacherArray.push(simpleTeacher);
    }
    return simpleTeacherArray.join("");;
}

function generateHTMLTeacherModule() {
    let teacherHTMLModule = [];
    let toolMode="display";
    let singleTeacherHTMLModule;
    for(let i=1,j=1; i<=main_editor_array.length; i++,j++) {
        while(mainModuleData[j-1].tool_type == "none"){
            j++;
        }
        if(mainModuleData[j-1].tool_type =="tabed"){
            let mediaList=mediaListGenerator(j-1);
            singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${editorModule[i-1]}\")>
            <var name=`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+mainModuleData[j-1].tool_type+`','`+mainModuleData[j-1].tool_type+`_`+editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(),mediaList:{`+mediaList+`},fillAnswer:"@ans_`+editorModule[i-1]+`;"});>
            <var name=teacherAnswerHTML value=\"@`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA;\">
        </if>`
        }
        else if(mainModuleData[j-1].tool_type =="formed"){
        singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${editorModule[i-1]}\")>
            <var name=`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+mainModuleData[j-1].tool_type+`','`+mainModuleData[j-1].tool_type+`_`+editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(),fillAnswer:"@ans_`+editorModule[i-1]+`;"});>
            <var name=teacherAnswerHTML value=\"@`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA;\">
        </if>`
        }
        else{
            singleTeacherHTMLModule = `
        <if cond=(\"@partRequested;\" == \"${editorModule[i-1]}\")>
            <var name=`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA value=@.toolLayout.createTool('`+mainModuleData[j-1].tool_type+`','`+mainModuleData[j-1].tool_type+`_`+editorModule[i-1]+`_TA','`+toolMode+`',#{recall:text(),height:350,width:350});>
            <var name=teacherAnswerHTML value=\"@`+mainModuleData[j-1].tool_type+`_`+toolMode+`_`+editorModule[i-1]+`_TA;\">
        </if>`
        }
        teacherHTMLModule.push(singleTeacherHTMLModule);
    }
    return teacherHTMLModule.join("");
}

function mediaListGenerator(moduleNumber){
    let mediaList='html';
    if(mainModuleData[moduleNumber].editor_count != 0){
        mediaList=mediaList.concat(",ansed");
    }
    if(mainModuleData[moduleNumber].ddm_count != 0){
        mediaList=mediaList.concat(",UIChoice");
    }
    if(mainModuleData[moduleNumber].ddm_count == 0 && mainModuleData[moduleNumber].editor_count == 0){
        mediaList=mediaList.concat(",checkbox");
    }
    return mediaList;
}
function generateToolWithObjects(moduleNumber,toolNumber,toolStep,part){
    let toolMode= (mainModuleData[moduleNumber].tool_type=="figed" && mainModuleData[moduleNumber].isStatic)?"display":"editor"; 
    let editorObject=``;
    let tool_object=``;
    let paramsRecall=``;
    let mediaList=mediaListGenerator(moduleNumber);
    
    if(mainModuleData[moduleNumber].editor_count != 0 && part==1 && mainModuleData[moduleNumber].tool_type != "tabed"){
        paramsRecall= `
        \trecall:text(),
        \tfeedbacks:#{}
        \t`;
    }  
    else if(part==1 && mainModuleData[moduleNumber].tool_type == "tabed"){
        paramsRecall= `
        \trecall:text(),
        \tmediaList:{`+mediaList+`},
        \tmediaFeatures:#{ansed:#{feedbacks:#{}}}
        \t`;
    }  
    else if(part==2 && mainModuleData[moduleNumber].tool_type == "tabed"){
        paramsRecall= `
        \trecall:text(),
        \tmediaList:{`+mediaList+`}
        \t`;
    }  
    else{
        paramsRecall= `recall:text()`;
    }
    let paramsName =mainModuleData[moduleNumber].tool_type+`Params`+toolStep[toolNumber]+``;
    var num= mainModuleData[moduleNumber].editor_count+mainModuleData[moduleNumber].ddm_count;
    if(!(mainModuleData[moduleNumber].tool_type=="figed" || mainModuleData[moduleNumber].isStatic)){
        for(j=1;j<=num;j++){
            if(j<=mainModuleData[moduleNumber].editor_count){
                if(mainModuleData[moduleNumber].module_name.charAt(0)!="I"){
                    tool_object =`
            <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`></text>`;
                    object_reference.push(tool_object);
                }
                editorObject+=`
        <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=ansed returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>\\\\editbox;[]</object></text>`;
             }         
            else{
                tool_object = `
          <text ref=` + mainModuleData[moduleNumber].tool_type + `_source_` + toolStep[toolNumber] + `_` + j + `></text>`;
                object_reference.push(tool_object);
                editorObject+=`
        <text ref=`+mainModuleData[moduleNumber].tool_type+`_source_`+toolStep[toolNumber]+`_`+j+`><object name=UIChoice returnValue=ans_returned_`+toolStep[toolNumber]+`_`+j+`>
                <option value="1"></option>
                <option value="2"></option></object></text>`;
            }
        }
        object_reference_editor.push(editorObject);
    }

    if((mainModuleData[moduleNumber].tool_type=="figed")){ 
            paramsRecall+= `,width:350,height:350`;
    }
        
    statementModuleTool = `
            <var name=`+mainModuleData[moduleNumber].tool_type+`_`+toolMode+`_`+toolStep[toolNumber]+` value=@.toolLayout.createTool('`+mainModuleData[moduleNumber].tool_type+`','`+mainModuleData[moduleNumber].tool_type+`_`+toolStep[toolNumber]+`','`+toolMode+`',#{`+paramsRecall+`});>`;
    return statementModuleTool;
}

function generateTries(){
    let createData=false;
    let tries_info={};
    let tries_return=``;
   mainModuleData.forEach(function (data){
    if(data.module_name.charAt(0)=="I" && data.total_tries<3 && data.total_tries>0){
        let id=data.module_name;
        createData=true;
        tries_info[id]=data.total_tries;
    }
   });
   if(createData){
    tries_return=`
    <function name=StatementStepsTries list={}>
        <return value=#`+JSON.stringify(tries_info)+`>  
    </function>
    `;
   }
   return tries_return;
}
function generateStepLabel(){
    let createData=false;
    let step_info={};
    let step_return=``;
   mainModuleData.forEach(function (data){
    if(data.module_name.charAt(0)=="G" && data.hasLabel){
        let id=data.module_name;
        createData=true;
        step_info[id]="";
    }
   });
   if(createData){
    step_return=`
    <function name=ResolutionStepsTitles list={}>
        <return value=#`+JSON.stringify(step_info)+`>  
    </function>
    `;
   }
   return step_return;
}