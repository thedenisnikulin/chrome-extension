import React, { useState, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

function NoteEditor(props) {
	return(
		<div>
			<Slate
				editor={props.editor}
				value={props.deserialize(props.value.text)}
				onChange={value => {
					props.setValue({...props.value, text: props.serialize(value)})
					localStorage.setItem(props.storageLocation, JSON.stringify(props.value))
				}}>
      			<Editable />
    		</Slate>
		</div>
	);
}

export default NoteEditor