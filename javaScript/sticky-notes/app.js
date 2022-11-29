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

    noteElement.addEventListener('change',()=>{
        updateNote(id,noteElement.value)
    })

    noteElement.addEventListener('dbclick',()=>{
        deleteNote(id,noteElement)
    })

    return noteElement
}
const addNote=()=>{
    const notes=getNotes()
    const noteItem={
        id: Math.floor(math.random*100000),
        content:''
    }
    createNoteElement(noteItem.id,noteItem.content)
    noteContainer.insertBefore(noteElement,addNoteBtn)

    saveNotes([...notes,noteItem])

}

const updateNote=(id,newContent)=>{

}

const deleteNote=(id,element)=>{

}

getNotes().forEach((item) => {
    const noteElement=createNoteElement(item.id,item.content) 
    noteContainer.insertBefore(noteElement,addNoteBtn)
});
