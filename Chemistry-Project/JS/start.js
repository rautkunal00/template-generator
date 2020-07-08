const addStructure = () => {
    const buttons = `
        <div class="button-bar">
            <button id="add-main-part">Add Main Question</button>
            <button id="add-gs-part">Add Guided Solution</button>
        </div>`;
    const mainTable = `
        <table class="main-question-table" border=1 cellspacing=0>
            <caption><b>Main Question</b></caption>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;
    const gsTable = `
        <table class="gs-question-table" border=1 cellspacing=0>
            <caption><b>Guided Solution</b></caption>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;
    const isl = `
        <textarea id="isl-data" rows=100 cols=120>${islCode}</textarea>`;
    $("#main-body").append(buttons);
    $("#main-body").append(mainTable);
    $("#main-body").append(gsTable);
    $("#main-body").append(isl);
    console.log("Buttons Added");
};

const addFormButtonListener = () => {
    $("#submitMainForm").click(() => {
        let editorData = {};
        let type = $("#mainEditorSelector").val();
        let tries = Number($("#mainTriesCount").val());
        let editbox = Number($("#mainEditboxCount").val());
        let ddm = Number($("#mainDropdownCount").val());
        $("#add-main-part").removeClass("hide");
        $("#add-gs-part").removeClass("hide");
        $("#mainPopupForm").remove();
        editorData.type = type;
        if (type == "ansed" || type == "formed" || type == "tabed") {
            editorData.tries = tries;
            editorData.editbox = editbox;
            editorData.ddm = ddm;
        }
        mainQuestions.push(editorData);
        updateISL();
    });
    $("#cancelMainForm").click(() => {
        noMainQue = noMainQue - 1;
        $("#add-main-part").removeClass("hide");
        $("#add-gs-part").removeClass("hide");
        $("#mainPopupForm").remove();
    });
    $("#submitGsForm").click(() => {
        let editorData = {};
        let static = $("#isStaticGS").prop("checked");
        let type = $("#gsEditorSelector").val();
        let editbox = Number($("#gsEditboxCount").val());
        let ddm = Number($("#gsDropdownCount").val());
        $("#add-gs-part").removeClass("hide");
        $("#add-main-part").removeClass("hide");
        $("#gsPopupForm").remove();
        editorData.static = static;
        if (!static) {
            editorData.type = type;
            if (type == "ansed" || type == "formed" || type == "tabed") {
                editorData.editbox = editbox;
                editorData.ddm = ddm;
            }
        }
        gsQuestions.push(editorData);
        updateISL();
    });
    $("#cancelGsForm").click(() => {
        noGsQue = noGsQue - 1;
        $("#add-gs-part").removeClass("hide");
        $("#add-main-part").removeClass("hide");
        $("#gsPopupForm").remove();
    });
}

const addButtonsListener = () => {
    $("#add-main-part").click(() => {
        noMainQue = noMainQue + 1;
        let form1 = mainQueForm();
        $("#main-body").append(form1);
        $("#add-main-part").addClass("hide");
        $("#add-gs-part").addClass("hide");
        $("#mainPopupForm").removeClass("hide");
        addFormButtonListener();
        onSelectEditorMain();
    });
    $("#add-gs-part").click(() => {
        noGsQue = noGsQue + 1;
        let form2 = gsQueForm();
        $("#main-body").append(form2);
        $("#add-main-part").addClass("hide");
        $("#add-gs-part").addClass("hide");
        $("#gsPopupForm").removeClass("hide");
        addFormButtonListener();
        onSelectEditorGs();
    });
}

const addTableHeaders = () => {
    $.getJSON("../Data/table-data.json", (hdata) => {
        let mth = $(".main-question-table thead tr");
        let gth = $(".gs-question-table thead tr");
        let mthlist = hdata.mainPartHeaders;
        let gthlist = hdata.gsPartHeaders;
        mthlist.forEach((header) => {
            let thData = '<th class="header-data">' + header + '</th>';
            mth.append(thData);
        });
        gthlist.forEach((header) => {
            let thData = '<th class="header-data">' + header + '</th>';
            gth.append(thData);
        });
        console.log(hdata);
    });
}

const fetchEditors = () => {
    $.getJSON("../DATA/editor.json", (editors) => {
        let options = [];
        editors.types.forEach((editor) => {
            let option = `<option value='${editor}'>${editor}</option>`;
            options.push(option);
        });
        editorsList = options.join(" ");
    });
}

const disableAllFieldsMain = () => {
    $("#mainTriesCount").attr("disabled", "disabled");
    $("#mainEditboxCount").attr("disabled", "disabled");
    $("#mainDropdownCount").attr("disabled", "disabled");
    $("#submitMainForm").attr("disabled", "disabled");
}

const enableForAnsedFormedTabedMain = () => {
    $("#mainTriesCount").removeAttr("disabled");
    $("#mainEditboxCount").removeAttr("disabled");
    $("#mainDropdownCount").removeAttr("disabled");
    $("#submitMainForm").removeAttr("disabled");
}

const onSelectEditorMain = () => {
    $("#mainEditorSelector").change(() => {
        let editorVal = $("#mainEditorSelector").val();
        disableAllFieldsMain();
        switch (editorVal) {
            case "ansed":
            case "formed":
            case "tabed":
                enableForAnsedFormedTabedMain();
                break;
            case "moleced":
            case "eleced":
            case "lewised":
                $("#submitMainForm").removeAttr("disabled");
                break;
            default:

        }
    });
}

const disableAllFieldsGs = () => {
    $("#gsTriesCount").attr("disabled", "disabled");
    $("#gsEditboxCount").attr("disabled", "disabled");
    $("#gsDropdownCount").attr("disabled", "disabled");
    $("#submitGsForm").attr("disabled", "disabled");
}

const enableForAnsedFormedTabedGs = () => {
    $("#gsTriesCount").removeAttr("disabled");
    $("#gsEditboxCount").removeAttr("disabled");
    $("#gsDropdownCount").removeAttr("disabled");
    $("#submitGsForm").removeAttr("disabled");
}

const onSelectEditorGs = () => {

    $("#isStaticGS").change((ele) => {
        if (ele.target.checked) {
            $("#gsEditorSelector").attr("disabled", "disabled");
            disableAllFieldsGs();
            $("#submitGsForm").removeAttr("disabled");
        }
        else {
            $("#gsEditorSelector").removeAttr("disabled");
            $("#submitGsForm").attr("disabled", "disabled");
            $("#gsEditorSelector").trigger("change");
        }
    });
    $("#gsEditorSelector").change(() => {
        let editorVal = $("#gsEditorSelector").val();
        disableAllFieldsGs();
        switch (editorVal) {
            case "ansed":
            case "formed":
            case "tabed":
                enableForAnsedFormedTabedGs();
                break;
            case "moleced":
            case "eleced":
            case "lewised":
                $("#submitGsForm").removeAttr("disabled");
                break;
            default:

        }
    });
}