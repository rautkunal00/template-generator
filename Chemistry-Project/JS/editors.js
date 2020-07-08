/*  
mode:
1 -> Statement Step (Main Question)
2 -> Guided step (GS)
*/

const sourceGenerator = (editor, stepName, editbox, ddm) => {
    let editboxSource = [];
    for (j = 1; j <= editbox; j++) {
        let source = `
        <text ref=${editor}_source_${stepName}_${j}><object name=ansed returnValue=ans_returned_${stepName}_${j}>\\\\editbox;[]</object></text>`;
        editboxSource.push(source);
    }
    let ddmSource = [];
    for (j = editbox + 1; j <= (editbox + ddm); j++) {
        let source = `
        <text ref=${editor}_source_${stepName}_${j}><object name=UIChoice returnValue=ans_returned_${stepName}_${j}>
            <option value="1"></option>
            <option value="2"></option></object></text>`;
        ddmSource.push(source);
    }
    return `${editboxSource.join("")}${ddmSource.join("")}`;
}

const referenceGenerator = (editor, stepName, mode) => {
    let refVal = ((mode == 1) ? "INTERACTION" : "SOLUTION");
    return `
        <TEXT REF=${refVal}>
            @${editor}_editor_${stepName};
        </TEXT>
        <return value="${refVal}">`;

}

const staticGS = () => {
    return `
        <TEXT REF=SOLUTION>
        </TEXT>
        <return value="SOLUTION">`;

}

const ansedGenerator = (i, mode, editbox, ddm) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let feedbacktext = ((mode == 1) ? `
            feedbacks:#{},` : ``);
    let source = sourceGenerator("ansed", stepName, editbox, ddm);
    let reference = referenceGenerator("ansed", stepName, mode);
    let newEditor = `${source}
        <var name=ansed_editor_${stepName} value=@.toolLayout.createTool('ansed','ansed_${stepName}','editor',#{
            recall:text(),${feedbacktext}
            features:#{
                input:#{
                    keyboard:{""}
                },
                syntax:#{
                    chemistryMode:""
                }
            }
        });>${reference}`;
    return newEditor;
}

const formedGenerator = (i, mode, editbox, ddm) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let feedbacktext = ((mode == 1) ? `
            feedbacks:#{}` : ``);
    let source = sourceGenerator("formed", stepName, editbox, ddm);
    let reference = referenceGenerator("formed", stepName, mode);
    let newEditor = `${source}
        <var name=formed_editor_${stepName} value=@.toolLayout.createTool('formed','formed_${stepName}','editor',#{
            recall:text(),${feedbacktext}
            }
        });>${reference}`;
    return newEditor;
}
const mediaListGenerator = (editbox, ddm) => {
    let mediaList = 'html';
    if (editbox != 0) {
        mediaList = mediaList.concat(",ansed");
    }
    if (ddm != 0) {
        mediaList = mediaList.concat(",UIChoice");
    }
    if (editbox == 0 && ddm == 0) {
        mediaList = mediaList.concat(",checkbox");
    }
    return mediaList;
}

const tabedGenerator = (i, mode, editbox, ddm) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let mediaList = mediaListGenerator(editbox, ddm);
    let feedbacktext = ((mode == 1 && editbox != 0) ? `
    mediaFeatures:#{ansed:#{feedbacks:#{}}},` : ``);
    let source = sourceGenerator("tabed", stepName, editbox, ddm);
    let reference = referenceGenerator("tabed", stepName, mode);
    let newEditor = `${source}
        <var name=tabed_editor_${stepName} value=@.toolLayout.createTool('tabed','tabed_${stepName}','editor',#{
            recall:text(),${feedbacktext}
            mediaList:{${mediaList}}
            }
        });>${reference}`;
    return newEditor;
}

const molecedGenerator = (i, mode) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let feedbacktext = ((mode == 1) ? `
            feedbacks:#{},` : ``);
    let reference = referenceGenerator("moleced", stepName, mode);
    let newEditor = `<var name=moleced_editor_${stepName} value=@.toolLayout.createTool('moleced','moleced_${stepName}','editor',#{
                recall:text(),${feedbacktext}
                width:600,
                height:400,
                menu: "",
                editorMode: "",
                features:#{
                    display:#{autoCenter:"true",autoResize:"true"},
                    input:#{
                        activeElements:{""}
                        }
                    }
            });>${reference}`;
    return newEditor;
}

const elecedGenerator = (i, mode) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let feedbacktext = ((mode == 1) ? `
            feedbacks:#{},` : ``);
    let reference = referenceGenerator("eleced", stepName, mode);
    let newEditor = `<var name=eleced_editor_${stepName} value=@.toolLayout.createTool('eleced','eleced_${stepName}','editor',#{
            recall: text(),${feedbacktext}
            features: #{
                display: #{
                    yLabel: "",
                    yLalels: "",
                    elecedAnsedFontFace: "",
                },
                style: #{
                    activeAndHighlightMode: "",
                    bottomLabels: "",
                    elecedType: "",
                    labelPrefixNum: "",
                    rowsShiftUp: "",
                    saveSpace: false,
                    showHorizontalLine: false,
                    showCFHorizontalLine: false,
                }
            }
        });>${reference}`;
    return newEditor;
}

const lewisedGenerator = (i, mode) => {
    let stepName = ((mode == 1) ? "I" : "GS") + i;
    let feedbacktext = ((mode == 1) ? `
            feedbacks:#{},` : ``);
    let reference = referenceGenerator("lewised", stepName, mode);
    let newEditor = `<var name=lewiced_editor_${stepName} value=@.toolLayout.createTool('lewised','lewised_${stepName}','editor',#{
            recall: text(),${feedbacktext}
            menu:"complex",
            height:250,
            width:200
        });>${reference}`;
    return newEditor;
}

const statObjectReference = () => {
    let i = 1, j = 1;
    let sourceArr = [];
    mainQuestions.forEach((question) => {
        let stepName = "I" + i;
        let editorType = question.type;
        let editbox = 0;
        let ddm = 0;
        if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
            editbox = question.editbox;
            ddm = question.ddm;
        }
        for (k = 1; k <= (editbox + ddm); k++) {
            let source = `
            <text ref=${editorType}_source_${stepName}_${k}></text>`;
            sourceArr.push(source);
        }
        i++;
    });
    gsQuestions.forEach((question) => {
        let stepName = "GS" + j;
        let editorType;
        if (!question.static) {
            editorType = question.type;
            let editbox = 0;
            let ddm = 0;
            if (editorType == "ansed" || editorType == "formed" || editorType == "tabed") {
                editbox = question.editbox;
                ddm = question.ddm;
            }
            for (k = 1; k <= (editbox + ddm); k++) {
                let source = `
            <text ref=${editorType}_source_${stepName}_${k}></text>`;
                sourceArr.push(source);
            }
        }
        j++;
    });
    return `${sourceArr.join("")}`;
}