import React, { useState, useMemo } from 'react'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

function NoteEditor(props) {
	return(
		<div>
			<Slate
				editor={props.editor}
				value={props.value}
				onChange={value => {
					props.setValue(value)
					localStorage.setItem(props.storageLocation, props.serialize(value))
				}}>
      			<Editable />
    		</Slate>
		</div>
	);
}

export default NoteEditor