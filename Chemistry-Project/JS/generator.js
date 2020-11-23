const generateStatementSteps = () => {
    let steps = [];
    for (i = 0; i < mainQuestions.length; i++) {
        let stepName = "I" + (i + 1);
        steps.push(stepName);
    }
    return '<return value={"' + steps.join("\",\"") + '"}>';
}

const generateResolutionSteps = () => {
    let steps = [];
    for (i = 0; i < gsQuestions.length; i++) {
        let stepName = "GS" + (i + 1);
        steps.push(stepName);
    }
    return '<return value={"' + steps.join("\",\"") + '"}>';
}

const getStatementSteps = () => {
    let statementModuleArr = [];
    let i = 1;
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let editorType = question.type;
        let editbox = 0;
        let ddm = 0;
        let extraFeature = false;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
            if (editorType == "ansed" || editorType == "tabed") {
                extraFeature = question.extraFeature;
            }
        }
        const comment = `<!-- *************************************** I` + i + ` *************************************** --> `;
        let editor = ` `;
        switch (editorType) {
            case "ansed":
                editor = ansedGenerator(i, 1, editbox, ddm, extraFeature);
                break;
            case "formed":
                editor = formedGenerator(i, 1, editbox, ddm);
                break;
            case "tabed":
                editor = tabedGenerator(i, 1, editbox, ddm, extraFeature);
                break;
            case "moleced":
                editor = molecedGenerator(i, 1);
                break;
            case "eleced":
                editor = elecedGenerator(i, 1);
                break;
            case "lewised":
                editor = lewisedGenerator(i, 1);
                break;
        }
        let completeEditor = `
        ${comment}
        <function name=StatementModule_${stepName} list={modeRequested}>
        ${editor}
        </function>
                `;
        statementModuleArr.push(completeEditor);
        i++;
    });
    return statementModuleArr.join("");
}

const getResolutionSteps = () => {
    let resolutionModuleArr = [];
    let i = 1;
    gsQuestions.forEach((question) => {
        let stepName = "GS" + i;
        let editorType;
        if (!question.static) {
            editorType = question.type;
        } else {
            editorType = "NA";
        }
        let editbox = 0;
        let ddm = 0;
        let extraFeature = false;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
            if (editorType == "ansed" || editorType == "tabed") {
                extraFeature = question.extraFeature;
            }
        }
        const comment = `<!-- *************************************** GS` + i + ` *************************************** --> `;
        let editor = ` `;
        switch (editorType) {
            case "ansed":
                editor = ansedGenerator(i, 2, editbox, ddm, extraFeature);
                break;
            case "formed":
                editor = formedGenerator(i, 2, editbox, ddm);
                break;
            case "tabed":
                editor = tabedGenerator(i, 2, editbox, ddm, extraFeature);
                break;
            case "moleced":
                editor = molecedGenerator(i, 2);
                break;
            case "eleced":
                editor = elecedGenerator(i, 2);
                break;
            case "lewised":
                editor = lewisedGenerator(i, 2);
                break;
            default:
                editor = staticGS();
        }
        let completeEditor = `
        ${comment}
        <function name=ResolutionModule_${stepName} list={modeRequested}>
        ${editor}
        </function>
                `;
        resolutionModuleArr.push(completeEditor);
        i++;
    });
    return resolutionModuleArr.join("");
}

const calculateTries = () => {
    let triesArr = [];
    let isActive = false;
    let i = 1;
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let editorType = question.type;
        let tries = 3;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            tries = question.tries;
        }
        if (tries > 0 && tries < 3) {
            let triesStatement = `"${stepName}":${tries}`;
            triesArr.push(triesStatement);
            isActive = true;
        }
        i++;
    });
    if (isActive) {
        return `
    <function name=StatementStepsTries list={}>
        <return value=#{${triesArr.join(",")}}>
    </function>
    `;
    }
    else {
        return ``;
    }
}

const generateIntermidiateAp = () => {
    if (intermediateAp) {
        return `
  <function name=arith2_sci_catches list={}>
    <catch name=value.*>
    <catch name=type.*>
    <catch name=reduce.*>
    <catch name=convention.*>
    <if cond=(("@itemAnspro.getCurrentFeedbackField("type");" == "ScientificNotation" || "@itemAnspro.getCurrentFeedbackField("type");" == "ProdPol") && "@itemAnspro.getCurrentFeedbackField("value");" == "Correct")>
      &(@userFeedback.removeAndReplaceFeedback("reduce","RegroupNumber"))
      <catch cond=("@itemAnspro.getCurrentFeedbackField("convention");" == "ToPowerOne") redirect={convention._}>
    </if>
    &(@userFeedback.arithGen());
    <catch redirect={type._}>
    <catch cond=(@itemAnspro.checkCatch(reduce,PlusZero);==1 && "@itemAnspro.getCurrentFeedbackField("value");" == "Correct") redirect={reduce.RegroupNumber,value.Correct}>
    <catch cond=("@itemAnspro.getCurrentFeedbackField("reduce");" == "CoefNotReduced" && "@itemAnspro.getCurrentFeedbackField("value");" == "Correct") redirect={reduce._,value.Correct}> 
  </function>
        `;
    } 
    else {
        return ``;
    }
}

const generateIntermidiateValue = () => {
    if (intermediateValue) {
        return `
  <function name=extraDigitIntermediate list={num,sigfig}>
    <var name=num_sigfig value=@userfChemistry.toSigFig(@num;,@sigfig;)>
    <var name=num_val value=@num_sigfig[2];>
    <if cond=(@num_val;==@num;)>
    	<var name=num_val_local value=@userf.replace_comma_num("@num_val;");>
    	<return value={@num_val;,0}>
    <else>
    	<var name=num_sigfig value=@userfChemistry.toSigFig(@num;,(@sigfig;+1))>
      <var name=num_val value=@num_sigfig[2];>
      <if cond=(@num_val;==@num;)>
        <var name=num_val_local value=@userf.replace_comma_num("@num_val;");>
        <return value={@num_val;,0}>
      <else>
    		<var name=num_sigfig value=@userfChemistry.toSigFig(@num;,(@sigfig;+2))>
      	<var name=num_val value=@num_sigfig[2];>
        <if cond=(@num_val;==@num;)>
          <var name=num_val_local value=@userf.replace_comma_num("@num_val;");>
          <return value={@num_val;,0}>
    		<else>
        	<return value={@num_val;,1}>
        </if>
      </if>
    </if>
  </function>
        `;
    } 
    else {
        return ``;
    }
}

const generateNumListDef = () => {
    if (generateNumList) {
        return `
  <function name=generate_num_list list={start_num, end_num, step, exclude_lst}>
    <var name=num_list value={}>
    <for name=start value=@start_num cond=(@start;<=@end_num;) next=(@start;+@step;)>
      <if cond=(hasElem(@exclude_lst;,@start;)==0)>
      &(addElem(num_list,@start;));
      </if>
    </for>
    <return value=@num_list;>
  </function>
        `;
    } 
    else {
        return ``;
    }
}

const stikeMathDef = () => {
    if (stikeMath) {
        return `
  <function name=strike_math list={val1,mode}>
    <if cond=("@mode;"=="editor")>
      <return value="@val1;">  	
    <else>
      <return value="<font color=@userf.red;><strike><font color=@userf.black;>@val1;</font></strike></font>">  	
    </if>
  </function>
        `;
    } 
    else {
        return ``;
    }
}

const generateISL = () => {
    const statementStepsList = generateStatementSteps();
    const resolutionStepsList = generateResolutionSteps();
    const statementSteps = getStatementSteps();
    const resolutionSteps = getResolutionSteps();
    const staticSourceList = statObjectReference();
    const triesModule = calculateTries();
    const apModuleList = ansproModuleList();
    const extraTeacher = extraTA();
    const teacherAnswer = teacherAnswerModule();
    const teacherHTML = htmlTeacherModule();
    const finalAP = generateAnswerProcessing();
    const intermidiateFunction = generateIntermidiateAp();
    const intermidiateValueFunction = generateIntermidiateValue();
    const generateNumListFunction = generateNumListDef();
    const stikeMathFunction = stikeMathDef();
    const islCode = getISLCode(statementStepsList, resolutionStepsList, statementSteps, resolutionSteps, staticSourceList, triesModule, apModuleList, extraTeacher, teacherAnswer, teacherHTML, finalAP, intermidiateFunction, intermidiateValueFunction, generateNumListFunction, stikeMathFunction);
    $("#isl-data").val(islCode);
}