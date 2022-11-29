const noteContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

const getNotes=()=>{
    return JSON.parse(localStorage.getItem('notes') || '[]')
}

const saveNotes=(notes)=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}