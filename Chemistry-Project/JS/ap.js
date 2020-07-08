const ansproModuleList = () => {
    let i = 1, j = 1;
    let taArr = [];
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let editorType = question.type;
        let taVal = `${stepName}:{"${editorType}_${stepName}"}`;
        taArr.push(taVal);
        i++;
    });
    gsQuestions.forEach((question) => {
        let stepName = "GS" + j;
        let editorType;
        if (!question.static) {
            editorType = question.type;
            let taVal = `${stepName}:{"${editorType}_${stepName}"}`;
            taArr.push(taVal);
        }
        j++;
    });
    return `<return value=#{${taArr.join(",")}}>`
}