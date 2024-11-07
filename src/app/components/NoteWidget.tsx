import React, { useState } from 'react';
import { trpc } from '../trpc'
//import './NoteWidget.css'; // Optional for any extra styling.

type Note = {
    title: string;
    body: string;
};

type NoteWidgetProps = {
    onSaveNote: (note: Note) => void;
};


export function NoteWidget() {
    const [showWidget, setShowWidget] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const notesQuery = trpc.getNotes.useQuery()
    const noteCreator = trpc.addNote.useMutation()

    const handleKeyDown = (event) => {
        if (event.metaKey && event.key === 'l') {
            event.preventDefault();
            setShowWidget(!showWidget);
        }
    };

    const handleSave = () => {
        if (title || body) {
            noteCreator.mutate({ title, body })
        }
    };

    const getNotes = () => {
        notesQuery.refetch()
    };



    return (
        <div className="container">
            <div className="card-body">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="noteTitle"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <hr />
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        style={{ height: "200px" }}
                        id="noteBody"
                        placeholder="Note"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <text>{notesQuery.isLoading ? "...Loading" : JSON.stringify(notesQuery.data) || notesQuery.error?.message}</text>
                <button type="button" className="btn btn-primary" onClick={getNotes}>GET</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>SAVE</button>
            </div>
        </div>
    );
};
