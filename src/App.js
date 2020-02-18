import React, { useState, useEffect, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { withReact } from 'slate-react'
import NoteEditor from './components/NoteEditor'
import NotesList from './components/NotesList'

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
      children: [{ text: line }],
    }
  })
}

var initValue = {
  id: 0, 
  title: 'note_0', 
  content: 'content-0', 
  text: 'initial note!'
};
if (localStorage.getItem(initValue.content) === null) {
  localStorage.setItem(initValue.content, JSON.stringify(initValue));
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [currentValue, setCurrentValue] = useState(initValue);
  const [notes, setNotes] = useState(Object.keys(localStorage));

  const [value, setValue] = useState(JSON.parse(localStorage.getItem(currentValue.content)) || ''); // object
  const showNote = (e, id) => {
    e.preventDefault();
    notes.map(note => {
    let parsedValue = JSON.parse(localStorage.getItem(note));
    if (parsedValue.id === id) {
        setCurrentValue(parsedValue);
        setValue(currentValue)
      }
    })
  }
  // var arrayOfKeys = Object.keys(localStorage);
  console.log(notes)
  const addNote = (e) => {
    e.preventDefault();
    let newId;
    try {
      newId = notes.length;
    } catch (error) {
      newId = 0;
    }
    const newNote = {
      id: newId || 0,
      title: 'note_' + newId.toString(),
      content: 'content-' + newId.toString(),
      text: 'new note is created!',
    }
    if (localStorage.getItem('content-' + newId.toString()) === null) {
      localStorage.setItem('content-'+ newId.toString(), JSON.stringify(newNote))
    }
    setNotes([...notes, newNote.content]);
  }

  return (
    <div>
      <NoteEditor 
        editor={editor}
        value={value}
        setValue={setValue}
        serialize={serialize}
        deserialize={deserialize}
        storageLocation={currentValue.content}
      />
      <NotesList 
        notes={notes}
        showNote={showNote}
        addNote={addNote}
      />
    </div>
  )
}

export default App