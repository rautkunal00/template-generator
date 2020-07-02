const addButtons = () => {
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
        <textarea id="isl-data" rows=150 cols=120>${islCode}</textarea>`;
    $("#main-body").append(buttons);
    $("#main-body").append(mainTable);
    $("#main-body").append(gsTable);
    $("#main-body").append(isl);
    console.log("Buttons Added");
};

const addFormButtonListener = () => {
    $("#submitMainForm").click(() => {
        $("#add-main-part").removeClass("hide");
        $("#add-gs-part").removeClass("hide");
        $("#mainPopupForm").addClass("hide");
    });
    $("#cancelMainForm").click(() => {
        noMainQue = noMainQue - 1;
        $("#add-main-part").removeClass("hide");
        $("#add-gs-part").removeClass("hide");
        $("#mainPopupForm").addClass("hide");
    });
    $("#submitGsForm").click(() => {
        $("#add-gs-part").removeClass("hide");
        $("#add-main-part").removeClass("hide");
        $("#gsPopupForm").addClass("hide");
    });
    $("#cancelGsForm").click(() => {
        noGsQue = noGsQue - 1;
        $("#add-gs-part").removeClass("hide");
        $("#add-main-part").removeClass("hide");
        $("#gsPopupForm").addClass("hide");
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
    });
    $("#add-gs-part").click(() => {
        noGsQue = noGsQue + 1;
        let form2 = gsQueForm();
        $("#main-body").append(form2);
        $("#add-main-part").addClass("hide");
        $("#add-gs-part").addClass("hide");
        $("#gsPopupForm").removeClass("hide");
        addFormButtonListener();
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
    $.getJSON("../DATA/editor.json", function (editors) {
        let options = [];
        for (editor in editors) {
            let option = `<option value='${editor}'>${editor}</option>`;
            options.push(option);
        }
        return options.join(" ");
    });

} 