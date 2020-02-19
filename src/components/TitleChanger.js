import React, { useState } from 'react'

function TitleChanger(props) {
    const [formState, setFormState] = useState(false);
    const [changeTitle, submitTitle] = props.titleHandlers;

    const renderInput = () => {
        return (
        <form id='form' onSubmit={(event) => submitTitle(event, props.note.id)}>
            <input type='text' className='title-form' onChange={(event) => changeTitle(event, props.note.id)} autoFocus onBlur={() => setFormState(false)}/>
        </form>
        );
    }
    const renderButton = () =>  {
        return (
            <button className='change-title-button' onClick={() => setFormState(true)}>{props.parent === 'NoteEditor' ? <h1>{props.note.title}</h1> : props.note.title}</button>
        );
    }

    return(
        formState ? renderInput() : renderButton()
    );
}

export default TitleChanger;