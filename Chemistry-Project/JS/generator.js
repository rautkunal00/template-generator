const generateStatementSteps = () => {
    let steps = [];
    for (i = 0; i < mainQuestions.length; i++) {
        let stepName = "I" + (i + 1);
        steps.append(stepName);
        return '<return value={"' + steps.join(",") + '"}>';
    }
}

const generateResolutionSteps = () => {
    let steps = [];
    for (i = 0; i < gsQuestions.length; i++) {
        let stepName = "GS" + (i + 1);
        steps.append(stepName);
        return '<return value={"' + steps.join(",") + '"}>';
    }
}

const generateISL = () => {
    const statementStepsList = generateStatementSteps();
    const resolutionStepsList = generateResolutionSteps();
}