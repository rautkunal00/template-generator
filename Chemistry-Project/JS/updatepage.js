const clearOldData = () => {
    $(".main-question-table tbody tr").remove();
    $(".gs-question-table tbody tr").remove();
}

const updateDataInTable = () => {
    let mainTableData = [];
    let gsTableData = [];
    let i = 0, j = 0;
    mainQuestions.forEach((question) => {
        const stepName = (i + 1);
        const editorType = question.type;
        let noOfTries, noOfEditbox, noOfddm;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            noOfTries = question.tries;
            noOfEditbox = question.editbox;
            noOfddm = question.ddm;
        }
        else {
            noOfTries = 3;
            noOfEditbox = 0;
            noOfddm = 0;
        }
        let row = `<tr>
                    <td>I${stepName}</td>
                    <td>${editorType}</td>
                    <td>${noOfTries}</td>
                    <td>${noOfEditbox}</td>
                    <td>${noOfddm}</td>
                </tr>`;
        mainTableData.push(row);
        i++;
    });
    gsQuestions.forEach((gs) => {
        const stepName = (j + 1);
        const isStatic = gs.static;
        let editorType, noOfEditbox, noOfddm;
        if (!isStatic) {
            editorType = gs.type;
            if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
                noOfEditbox = gs.editbox;
                noOfddm = gs.ddm;
            }
            else {
                noOfEditbox = 0;
                noOfddm = 0;
            }
        }
        else {
            editorType = "NA";
            noOfEditbox = 0;
            noOfddm = 0;
        }

        let row = `<tr>
                    <td>GS${stepName}</td>
                    <td>${isStatic}</td>
                    <td>${editorType}</td>
                    <td>${noOfEditbox}</td>
                    <td>${noOfddm}</td>
                </tr>`;
        gsTableData.push(row);
        j++;
    });
    $(".main-question-table tbody").append(mainTableData.join(" "));
    $(".gs-question-table tbody").append(gsTableData.join(" "));
}



const updateISL = () => {
    clearOldData();
    updateDataInTable();
    generateISLCode();
}