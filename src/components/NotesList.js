import React from 'react'

function NotesList(props) {
	return(
		<div>
            {props.notes.map(note =>
                <Note 
                    handleClick={props.handleClick}
                    note={note} 
                />
            )}
            <input value='add note' type='button' onClick={(e) => props.addNote(e)} />
		</div>
	);
}

function Note(props) {
    return(
        <div>
            {props.note.title}
            <input value='show' type='button' 
                onClick={(e) => props.handleClick(e, props.note.id)} />
        </div>
    );
}

export default NotesList