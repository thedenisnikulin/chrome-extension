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

var initLocation = 'content-0';
localStorage.setItem(initLocation, 'initial');

let list = JSON.stringify([{id: 1}, {id: 1}, {id: 1}]);
localStorage.setItem('list1', list);
let recievedList = JSON.parse(localStorage.getItem('list1'));
recievedList = [...recievedList, {id: 999}];
console.log(recievedList)

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [currentLocation, setCurrentLocation] = useState(initLocation);
  const [notes, setNotes] = useState([
    {
      id: 0,
      title: 'note_0',
      content: 'content-0'
    },
  ]);
  if (localStorage.getItem('content-list') === null) {
    localStorage.setItem('content-list', JSON.stringify(notes));
  }
  const [value, setValue] = useState(deserialize(localStorage.getItem(currentLocation)) || '');

  const handleClick = (e, id) => {
    e.preventDefault();
    notes.map(note => {
      if (note.id === id) {
        setCurrentLocation(note.content);
        setValue(deserialize(localStorage.getItem(currentLocation)))
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
    if (localStorage.getItem('content-' + newId.toString()) === null) {
      localStorage.setItem('content-'+ newId.toString(), 'new note created')
    }
    
    const newNote = {
      id: newId || 0,
      title: 'note_' + newId.toString(),
      content: localStorage.getItem('content-'+ newId.toString())
    }
    setNotes([...notes, newNote]);
    localStorage.setItem('content-list', JSON.stringify(notes));
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