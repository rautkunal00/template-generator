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
            if (editorType == "ansed" || editorType == "tabed" || editorType == "formed") {
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
                editor = formedGenerator(i, 1, editbox, ddm, extraFeature);
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
        let stepType = "NA";
        let TypeStatement=' ';
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
            if (editorType == "ansed" || editorType == "tabed" || editorType == "formed") {
                extraFeature = question.extraFeature;
            }
        }
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            stepType = question.stepType;
                    
            let PESTStatment = `<p>@userfChemistry.show_int_calc_instructions("@modeRequested;");</p>
            `;
            let RIStatement = `<p>@userfChemistry.sigDigInstruction();</p>
            `

           
            if (stepType == "Final Calculation") {
                TypeStatement = RIStatement
            }else if(stepType == "Intermediate Calculation"){
                TypeStatement = PESTStatment
            }

        }
        const comment = `<!-- *************************************** GS` + i + ` *************************************** --> `;
        let editor = ` `;
        switch (editorType) {
            case "ansed":
                editor = ansedGenerator(i, 2, editbox, ddm, extraFeature,TypeStatement);
                break;
            case "formed":
                editor = formedGenerator(i, 2, editbox, ddm, extraFeature,TypeStatement);
                break;
            case "tabed":
                editor = tabedGenerator(i, 2, editbox, ddm, extraFeature,TypeStatement);
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
  <function name=arith2_sci_catches list={long_decimal_flag}>
    <catch name=value.*>
    <catch name=type.*>
    <catch name=reduce.*>
    <catch name=convention.*>
    <if cond=(("@itemAnspro.getCurrentFeedbackField("type");" == "ScientificNotation" || "@itemAnspro.getCurrentFeedbackField("type");" == "ProdPol") && "@itemAnspro.getCurrentFeedbackField("value");" == "Correct")>
      &(@userFeedback.removeAndReplaceFeedback("reduce","RegroupNumber"))
      <catch cond=("@itemAnspro.getCurrentFeedbackField("convention");" == "ToPowerOne") redirect={convention._}>
    </if>
    <if cond=(!(@long_decimal_flag;))>
      &(@userFeedback.arithGen(););
      <catch redirect={type._}>
    <else>
    	&(@userFeedback.fracSimplifyDivByOne(););
    </if>
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
  <function name=extra_digit_intermediate list={num,sigfig,max_extra_digit}>
    <var name=max_extra_digit value=((@max_extra_digit;)?@max_extra_digit;:2)>
    
    <var name=count value=0>
    <var name=hdot_flag value=0>
    <for name=i value=0 cond=(@i;<=@max_extra_digit;) next=(@i; + 1)>
  		<var name=num_val value=@userf.ansSigFig(@num;,(@sigfig;+@i;))>
      <if cond=(@num_val;==@num;)>
      	<var name=i value=(@max_extra_digit;+1)>
      <else>
    		<var name=count value=@count;+1>
      </if>
		</for>
    
    <var name=hdot_flag cond=(@count;>@max_extra_digit;) value=1>
    <var name=sigfig value=(@sigfig;+@count;-@hdot_flag;)>
    <return value={@num_val;,@sigfig;,@hdot_flag;}>
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
    <!-- strike function -->
    <!-- val1: Number or unit -->
    <!-- mt_ap: 0 or "" for math font, other number for Anspro -->
    <!-- mode: create variable in trunck module with any value and in TA/SM with 0 -->
    <function name=strike_function list={val1,mt_ap,mode,sp}>
      <var name=space_val value=(@sp;==1?"&sp;":"")>
      <if cond=(!@mt_ap; && !@mode;)>
        <return value="@space_val;<font color=@userf.red;><strike><font color=@userf.black;>@val1;</font></strike></font>">  	
      <else cond=(@mt_ap; && !@mode;)>
        <return value="\\\\style<'color:@userf.red;;'>;[\\\\enclose<'notation:updiagonalstrike;'>;[\\\\style<'color:@userf.black;;'>;[@val1;]]]">  
      <else>
        <return value="@val1;">
      </if>
    </function>
    `;
    } 
    else {
        return ``;
    }
}

const getMantissaExponentDef = () => {
    if (getMantissaExponent) {
        return `
  <function name=get_mantissa_exponent list={scientific_notation,mode}>
    <if cond=(!(@mode;))>
      <var name=split1 value=split("@scientific_notation;",'\\\\times;[',word);>
      <var name=mantissa_value value=split(@split1[1],'[]');>
      <var name=exponent_init value=split(@split1[2],'10^',word);>
      <var name=exponent_value value=split(@exponent_init[1],'[]]');>
      <var name=return_list value={@mantissa_value[1];,@exponent_value[1];}>
    <else>
    	<var name=split1 value=split("@scientific_notation;",'&times',word);>
      <var name=mantissa_value value=@split1[1];>
      <var name=exponent_value value=split(@split1[2],'<sup></sup>');>
      <var name=return_list value={@mantissa_value;,@exponent_value[2];}>
    </if>
    <return value=@return_list;>
  </function>
        `;
    } 
    else {
        return ``;
    }
}

const getConstantTableDef = () => {
    if (getConstantTable) {
        return `
        <var name=border value="style='text-align:left;; border:1px solid @userf.black;; padding:5px 7px'">
        <text ref=constant_data_table>
          <table style="border-collapse: collapse;" @userf.caption("@Table_Cap;");>
            <tr>
              <th @valign_base; scope=col @border;>@Constant;</th>
              <th @valign_base; scope=col @border;>@Value;</th>
            </tr>
            <tr>
              <td @valign_base; @border;>%Gas_constant;</td>
              <td @valign_base; @border;>%r_const_math;</td>
            </tr>     
            <tr>
              <td @valign_base; @border;>%Fdp_const;</td>
              <td @valign_base; @border;><math></math></td>
            </tr>  
          </table>
        </text>
        `;
    } 
    else {
        return ``;
    }
}
const getFillAnsObjects = (fillAnsobjects) =>{

    let str1="";
    for(i=0; i<fillAnsobjects.length; i++){
        str1=str1.concat(fillAnsobjects[i]);
    }
    

    return str1;
    
    
}

const getfillTeacherAnswers = (teacherAnswers) =>{

    let str2="";
    for(i=0; i<teacherAnswers.length; i++){
        str2=str2.concat(teacherAnswers[i]);
    }
    
    return str2;
    
    
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
    const getMantissaExponentFunction = getMantissaExponentDef();
    const getConstantTableFunction = getConstantTableDef();
    let fillAnswerObjects = getFillAnsObjects(fillAnsobjects);
    let fillTeacherAnswers = getfillTeacherAnswers(teacherAnswers);
    const islCode = getISLCode(fillAnswerObjects, fillTeacherAnswers, statementStepsList, resolutionStepsList, statementSteps, resolutionSteps, staticSourceList, triesModule, apModuleList, extraTeacher, teacherAnswer, teacherHTML, finalAP, intermidiateFunction, intermidiateValueFunction, generateNumListFunction, stikeMathFunction, getMantissaExponentFunction, getConstantTableFunction);
    $("#isl-data").val(islCode);
}