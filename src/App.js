import React from 'react';
import './App.css';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';

function App() {
  return (
    <div className="App">
      <NoteEditor />
      <NotesList />
    </div>
  );
}

export default App;
