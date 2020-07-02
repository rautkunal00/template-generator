const addButtons = () => {
    let buttons = `
        <div class="button-bar">
            <button id="add-main-part">Add Main Question</button>
            <button id="add-gs-part">Add Guided Solution</button>
        </div>`;
    let mainTable = `
        <table class="main-question-table" border=1 cellspacing=0>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;
    let gsTable = `
        <table class="gs-question-table" border=1 cellspacing=0>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`;
    let isl = `
        <textarea id="isl-data" rows=150 cols=120>ISL Code will be updated here...
        </textarea>`;
    $("#main-body").append(buttons);
    $("#main-body").append(mainTable);
    $("#main-body").append(gsTable);
    $("#main-body").append(isl);
    console.log("Buttons Added");
};

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