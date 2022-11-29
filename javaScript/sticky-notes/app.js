const noteContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

const getNotes=()=>{
    return JSON.parse(localStorage.getItem('notes') || '[]')
}

const saveNotes=(notes)=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

const createNoteElement=(id,content)=>{
    const noteElement=document.createElement('textarea')

    noteElement.classList.add('note')

    noteElement.value=content

    return noteElement
}