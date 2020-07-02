$(document).ready(() => {
    addButtons();
    editorsList = fetchEditors();
    addTableHeaders();
    addButtonsListener();
});