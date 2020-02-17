import React, { useState, useMemo } from 'react'
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

var initItem = 'content-0';
localStorage.setItem(initItem, 'the first note');


const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [currentLocation, setCurrentLocation] = useState(initItem);
  const [notes, setNotes] = useState([
    {
      id: 0,
      title: 'note_0'
    }
  ]);
  const [value, setValue] = useState(deserialize(localStorage.getItem(currentLocation)) || '')

  const handleClick = (e, id) => {
    e.preventDefault();
    notes.map(note => {
      if (note.id === id) {
        setCurrentLocation('content-' + note.id.toString())
      }
    })
  }

  const addNote = (e) => {
    e.preventDefault();
    let newId;
    try {
      newId = notes[notes.length-1].id + 1;
    } catch (error) {
      newId = 0;
    }
    const newNote = {
      id: newId || 0,
      title: 'note_' + newId.toString(),
    }
    setNotes([...notes, newNote]);
    localStorage.setItem('content-'+ newNote.id.toString(), '')
  }

  return (
    <div>
      <NoteEditor 
        editor={editor}
        value={value}
        setValue={setValue}
        serialize={serialize}
        storageLocation={currentLocation}
      />
      <NotesList 
        notes={notes}
        handleClick={handleClick}
        addNote={addNote}
      />
    </div>
  )
}

export default App