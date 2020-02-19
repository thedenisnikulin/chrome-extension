import React, { useState, useEffect, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { withReact } from 'slate-react'
import NoteEditor from './components/NoteEditor'
import NotesList from './components/NotesList'
import TitleChanger from './components/TitleChanger'
import './styles/index.css'

const serialize = value => {
  return (
    value
      .map(n => Node.string(n))
      .join('\n')
  )
}

const deserialize = string => {
  return string.split('\n').map(line => {
    return {
      type: 'paragraph',
      children: [{ text: line }],
    }
  })
}

var initValue = {
  id: 0, 
  title: 'note_0', 
  content: 'content-0', 
  text: 'click "+" to create a note'
};

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [currentValue, setCurrentValue] = useState(initValue);
  const [notes, setNotes] = useState(Object.keys(localStorage));
  const [value, setValue] = useState(currentValue || ''); // object

  const showNote = (e, id) => {
    e.preventDefault();
    notes.map(note => {
      let parsedValue = JSON.parse(localStorage.getItem(note));
      if (parsedValue.id === id) {
        setCurrentValue(parsedValue);
        setValue(currentValue)
        console.log(note)
        console.log(notes)
      }
    })
  }

  const addNote = (e) => {
    e.preventDefault();
    let newId = new Date().getTime();
    const newNote = {
      id: newId,
      title: 'note_' + newId.toString(),
      content: 'content-' + newId.toString(),
      text: 'new note is created!',
    }
    if (localStorage.getItem('content-' + newId.toString()) === null) {
      localStorage.setItem('content-'+ newId.toString(), JSON.stringify(newNote))
    }
    setNotes([...notes, newNote.content]);
  }

  const deleteNote = (e, id) => {
    e.preventDefault();
    notes.map(note => {
      let parsedValue = JSON.parse(localStorage.getItem(note));
      if (parsedValue.id === id) {
        localStorage.removeItem(note)
        setNotes(Object.keys(localStorage))
      }
    })
  }

  const changeTitle = (e, id) => {
    e.preventDefault();
    notes.map(note => {
      let parsedValue = JSON.parse(localStorage.getItem(note));
      if (parsedValue.id === id) {
        parsedValue.title = e.target.value;
        localStorage.setItem(note, JSON.stringify(parsedValue))
      }
    })
  }
  const submitTitle = (e, id) => {
    e.preventDefault();
    const form = document.getElementById('form');
    form.reset();
    setNotes(Object.keys(localStorage))
    notes.map(note => {
      if(note.id === id) {
        setCurrentValue(JSON.parse(localStorage.getItem(note)))
        setNotes(Object.keys(localStorage))
      }
    });
  }

  return (
    <div className='main-container'>
      <NoteEditor 
        editor={editor}
        value={value}
        setValue={setValue}
        serialize={serialize}
        deserialize={deserialize}
        storageLocation={currentValue.content}
        titleHandlers={[changeTitle, submitTitle]}
      />
      <NotesList 
        notes={notes}
        showNote={showNote}
        addNote={addNote}
        deleteNote={deleteNote}
        titleHandlers={[changeTitle, submitTitle]}
      />
    </div>
  )
}

export default App