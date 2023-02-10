const note = document.getElementById("note");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");

// Load any saved note from local storage
window.addEventListener("load", function () {
    note.value = localStorage.getItem("note") || "";
});

clearButton.addEventListener("click", function () {
    note.value = "";
    localStorage.removeItem("note");
});

saveButton.addEventListener("click", function () {
    localStorage.setItem("note", note.value);
});
