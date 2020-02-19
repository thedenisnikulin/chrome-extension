import React, { useCallback } from 'react'
import { Editor, Transforms } from 'slate'
import { Slate, Editable } from 'slate-react'

import TitleChanger from './TitleChanger'
import '../styles/index.css'

function NoteEditor(props) {

	return(
		<div className='editor-container'>
			<TitleChanger titleHandlers={props.titleHandlers} note={props.value} parent={'NoteEditor'}/>
			<Slate
				editor={props.editor}
				value={props.deserialize(props.value.text.concat(' '))}
				onChange={value => {
					props.setValue({...props.value, text: props.serialize(value)})
					localStorage.setItem(props.storageLocation, JSON.stringify(props.value))
				}}
				className='editor'
			>
				  <Editable/>
    		</Slate>
		</div>
	);
}

export default NoteEditor