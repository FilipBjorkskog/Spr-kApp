// Hämta elementen från HTML-dokumentet
const langSelect = document.getElementById("langSelect"); // Språkväljare
const noteInput = document.getElementById("noteInput"); // Textinmatningsruta för anteckningar
const addNoteBtn = document.getElementById("addNoteBtn"); // Knapp för att lägga till anteckningar
const noteList = document.getElementById("noteList"); // Lista där anteckningar visas

// Array som håller alla anteckningar
let notes = [];

// Funktion för att lägga till en anteckning i listan
function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText !== "") {
    const lang = langSelect.value;
    const note = { text: noteText, lang: lang };
    notes.push(note);
    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
}

// Funktion för att rendera alla anteckningar i listan
function renderNotes() {
  noteList.innerHTML = "";
  const lang = langSelect.value;
  const langNotes = notes.filter((note) => note.lang === lang);
  langNotes.forEach((note) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${lang === "sv" ? "Svenska" : "Finska"}: `;
    li.appendChild(span);
    li.appendChild(document.createTextNode(note.text));
    noteList.appendChild(li);
  });
}

// Funktion för att spara anteckningarna till local storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Funktion för att ladda anteckningarna från local storage
function loadNotes() {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    notes = JSON.parse(notesJSON);
    renderNotes();
  }
}

// Event-lyssnare för Lägg till-knappen
addNoteBtn.addEventListener("click", addNote);

// Event-lyssnare för språkväljaren
langSelect.addEventListener("change", renderNotes);

// Ladda anteckningarna från local storage vid sidstart
loadNotes();
