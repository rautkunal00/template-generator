const htmlTeacherModule = () => {
    let taArr = [];
    let i = 1, j = 1;
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let ta = `
            <var name=teacherAnswerHTML cond=("@partRequested;" == "${stepName}") value="&(text())">`;
        taArr.push(ta);
        i++;
    });
    gsQuestions.forEach((question) => {
        let stepName = "GS" + i;
        if (!question.static) {
            let ta = `
            <var name=teacherAnswerHTML cond=("@partRequested;" == "${stepName}") value="&(text())">`;
            taArr.push(ta);
        }
        j++;
    });
    return `${taArr.join("")}`;
}

const generateTeacherAnswer = (stepName, editorType, editbox, ddm) => {
    let teacherAnswer = ``;
    if (editorType == "ansed" || editorType == "formed") {
        let answerArr = [];
        for (i = 1; i <= editbox; i++) {
            let answer = `[ans_returned_${stepName}_${i}]=[\\\\editbox;[]];`;
            answerArr.push(answer);
        }
        for (j = (editbox + 1); j <= (editbox + ddm); j++) {
            let answer = `[ans_returned_${stepName}_${j}]=[];`;
            answerArr.push(answer);
        }
        teacherAnswer = `
            <var name=teacherAnswerHash["${editorType}_${stepName}"] cond=("@partRequested;" == "${stepName}") value="${answerArr.join("")}">`;
    }
    else if (editorType == "tabed") {
        teacherAnswer = `
            <var name=teacherAnswerHash["${editorType}_${stepName}"] cond=("@partRequested;" == "${stepName}") value="\\\\set1;[]">`;
    }
    else {
        teacherAnswer = `
            <var name=teacherAnswerHash["${editorType}_${stepName}"] value=("@mode" == "solve" ? "&(text())" : "&(text())")>`;
    }
    return teacherAnswer;
}

const teacherAnswerModule = () => {
    let teacherAnswerArr = [];
    let i = 1, j = 1;
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let editorType = question.type;
        let editbox = 0;
        let ddm = 0;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
        }
        let teacherAnswer = generateTeacherAnswer(stepName, editorType, editbox, ddm);
        teacherAnswerArr.push(teacherAnswer);
        i++;
    });
    gsQuestions.forEach((question) => {
        let stepName = "GS" + j;
        let editorType;
        if (!question.static) {
            editorType == question.type;
            let editbox = 0;
            let ddm = 0;
            if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
                editbox = question.editbox;
                ddm = question.ddm;
            }
            let teacherAnswer = generateTeacherAnswer(stepName, editorType, editbox, ddm);
            teacherAnswerArr.push(teacherAnswer);
        }
        j++;
    });
    return `${teacherAnswerArr.join("")}`;
}