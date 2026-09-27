function openWebsite(url) {
    window.open(url, "_blank");
}


function scrollToTools() {
    document.getElementById("tools").scrollIntoView({
        behavior: "smooth"
    });
}


function openCalculator() {

    const calculator = document.getElementById("calculator");

    calculator.style.display = "block";

    calculator.scrollIntoView({
        behavior: "smooth"
    });
}


function addValue(value) {

    document.getElementById("display").value += value;
}


function clearDisplay() {

    document.getElementById("display").value = "";
}


function deleteLast() {

    const display = document.getElementById("display");

    display.value = display.value.slice(0, -1);
}


function calculate() {

    const display = document.getElementById("display");

    try {

        display.value = eval(display.value);

    } catch {

        display.value = "Error";

    }
}


function openGames() {
    alert("Games will be added next.");
}


function openFiles() {
    alert("Files section will be added next.");
}


function openNotes() {
    alert("Notes section will be added next.");
}
function openFiles() {

    const filesSection =
        document.getElementById("files");

    filesSection.scrollIntoView({
        behavior: "smooth"
    });

}


let selectedFiles = [];

function showFiles() {

    const input = document.getElementById("fileInput");

    selectedFiles = Array.from(input.files);

    displayFiles(selectedFiles);
}


function displayFiles(files) {

    const fileList =
        document.getElementById("fileList");

    fileList.innerHTML = "";

    if (files.length === 0) {

        fileList.innerHTML =
            "<p>No files selected.</p>";

        return;
    }

    files.forEach((file, index) => {

        const fileItem =
            document.createElement("div");

        fileItem.className = "file-item";

        fileItem.innerHTML = `

            <div>
                <strong>📄 ${file.name}</strong>

                <small>
                    ${(file.size / 1024).toFixed(2)} KB
                </small>
            </div>

            <div>

                <button
                    onclick="downloadFile(${index})">
                    ⬇️
                </button>

                <button
                    onclick="deleteFile(${index})">
                    🗑️
                </button>

            </div>

        `;

        fileList.appendChild(fileItem);

    });
}


function deleteFile(index) {

    selectedFiles.splice(index, 1);

    displayFiles(selectedFiles);
}


function downloadFile(index) {

    const file = selectedFiles[index];

    const url =
        URL.createObjectURL(file);

    const link =
        document.createElement("a");

    link.href = url;

    link.download = file.name;

    link.click();

    URL.revokeObjectURL(url);
}


function filterFiles() {

    const search =
        document
        .getElementById("fileSearch")
        .value
        .toLowerCase();

    const filtered =
        selectedFiles.filter(file =>
            file.name.toLowerCase().includes(search)
        );

    displayFiles(filtered);
}
function openFiles() {

    const filesSection =
        document.getElementById("files");

    filesSection.scrollIntoView({
        behavior: "smooth"
    });

}


function showFiles() {

    const input =
        document.getElementById("fileInput");

    const fileList =
        document.getElementById("fileList");

    fileList.innerHTML = "";

    for (const file of input.files) {

        const fileItem =
            document.createElement("div");

        fileItem.className = "file-item";

        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <small>
                ${(file.size / 1024).toFixed(2)} KB
            </small>
        `;

        fileList.appendChild(fileItem);
    }

}
// ==========================================
// NOTES
// ==========================================

function saveNotes() {

    const notes = document.getElementById("notesArea");

    const status = document.getElementById("notesStatus");

    if (!notes) {
        return;
    }

    localStorage.setItem("nexaHubNotes", notes.value);

    if (status) {
        status.innerText = "✅ Notes saved successfully!";
    }
}


function clearNotes() {

    const notes = document.getElementById("notesArea");

    const status = document.getElementById("notesStatus");

    if (!notes) {
        return;
    }

    notes.value = "";

    localStorage.removeItem("nexaHubNotes");

    if (status) {
        status.innerText = "🗑️ Notes cleared!";
    }
}


window.addEventListener("DOMContentLoaded", function () {

    const notes = document.getElementById("notesArea");

    if (!notes) {
        return;
    }

    const savedNotes =
        localStorage.getItem("nexaHubNotes");

    if (savedNotes) {
        notes.value = savedNotes;
    }

});
// ==========================================
// NEXAHUB CALCULATOR
// ==========================================

function addValue(value) {

    const display = document.getElementById("display");

    if (!display) return;

    display.value += value;
}


// ==========================================
// CLEAR
// ==========================================

function clearDisplay() {

    const display = document.getElementById("display");

    if (!display) return;

    display.value = "";
}


// ==========================================
// DELETE LAST
// ==========================================

function deleteLast() {

    const display = document.getElementById("display");

    if (!display) return;

    display.value =
        display.value.slice(0, -1);
}


// ==========================================
// CALCULATE
// ==========================================

function calculate() {

    const display = document.getElementById("display");

    if (!display) return;

    const expression = display.value;

    if (expression.trim() === "") {
        return;
    }

    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {

            display.value = "Error";

            return;
        }

        const result = Function(
            "return " + expression
        )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            display.value = "Error";

            return;
        }

        display.value = result;

    }

    catch (error) {

        display.value = "Error";

    }
}
function openCalculator() {
    window.location.href = "calculator.html";
}

// ==========================================
// NEXAHUB CALCULATOR
// ==========================================

function addValue(value) {

    const display = document.getElementById("display");

    if (!display) return;

    display.value += value;
}


function clearDisplay() {

    const display = document.getElementById("display");

    if (!display) return;

    display.value = "";
}


function deleteLast() {

    const display = document.getElementById("display");

    if (!display) return;

    display.value =
        display.value.slice(0, -1);
}


function calculate() {

    const display = document.getElementById("display");

    if (!display) return;

    const expression = display.value;

    if (expression.trim() === "") {
        return;
    }

    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {

            display.value = "Error";

            return;
        }

        const result =
            Function("return " + expression)();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            display.value = "Error";

            return;
        }

        display.value = result;

    }
    catch (error) {

        display.value = "Error";

    }
}
// ===============================
// NEXAHUB CALCULATOR
// ===============================

function calculatorValue(value) {
    const display = document.getElementById("calculatorDisplay");

    display.value += value;
}

function clearCalculator() {
    document.getElementById("calculatorDisplay").value = "";
}

function deleteCalculator() {
    const display = document.getElementById("calculatorDisplay");

    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById("calculatorDisplay");

    try {
        let expression = display.value;

        expression = expression.replace(/%/g, "/100");

        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";
    }
}
