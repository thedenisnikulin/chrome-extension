import React, { useCallback } from 'react'
import { Editor, Transforms } from 'slate'
import { Slate, Editable } from 'slate-react'

import TitleChanger from './TitleChanger'
import '../styles/index.css'

function NoteEditor(props) {

	return(
		<div className='editor-wrapper'>
			<TitleChanger titleHandlers={props.titleHandlers} note={props.value} parent={'NoteEditor'}/>
			<div className='editor-container'>
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
			
		</div>
	);
}

export default NoteEditor