// ================================
// NEXAHUB NOTES
// ================================

const notesArea = document.getElementById("notesArea");
const notesStatus = document.getElementById("notesStatus");

// Save Notes
function saveNotes() {
    const notes = notesArea.value;

    localStorage.setItem("nexaHubNotes", notes);

    notesStatus.innerText = "✅ Notes saved successfully!";
}

// Clear Notes
function clearNotes() {
    notesArea.value = "";

    localStorage.removeItem("nexaHubNotes");

    notesStatus.innerText = "🗑️ Notes cleared!";
}

// Load saved notes when page opens
document.addEventListener("DOMContentLoaded", function () {

    const savedNotes = localStorage.getItem("nexaHubNotes");

    if (savedNotes) {
        notesArea.value = savedNotes;
        notesStatus.innerText = "📂 Saved notes loaded!";
    }

});