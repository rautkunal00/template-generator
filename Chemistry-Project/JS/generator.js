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
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
        }
        const comment = `<!-- *************************************** I` + i + ` *************************************** --> `;
        let editor = ` `;
        switch (editorType) {
            case "ansed":
                editor = ansedGenerator(i, 1, editbox, ddm);
                break;
            case "formed":
                editor = formedGenerator(i, 1, editbox, ddm);
                break;
            case "tabed":
                editor = tabedGenerator(i, 1, editbox, ddm);
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
        let completeEditor = `${comment}
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
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
        }
        const comment = `<!-- *************************************** GS` + i + ` *************************************** --> `;
        let editor = ` `;
        switch (editorType) {
            case "ansed":
                editor = ansedGenerator(i, 2, editbox, ddm);
                break;
            case "formed":
                editor = formedGenerator(i, 2, editbox, ddm);
                break;
            case "tabed":
                editor = tabedGenerator(i, 2, editbox, ddm);
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
        let completeEditor = `${comment}
        <function name=ResolutionModule_${stepName} list={modeRequested}>
            ${editor}
        </function>
                `;
        resolutionModuleArr.push(completeEditor);
        i++;
    });
    return resolutionModuleArr.join("");
}

const HtmlTeacherModule = () => {

}

const generateISL = () => {
    const statementStepsList = generateStatementSteps();
    const resolutionStepsList = generateResolutionSteps();
    const statementSteps = getStatementSteps();
    const resolutionSteps = getResolutionSteps();
    const staticSourceList = statObjectReference();
    const islCode = getISLCode(statementStepsList, resolutionStepsList, statementSteps, resolutionSteps,staticSourceList);
    $("#isl-data").val(islCode);
}