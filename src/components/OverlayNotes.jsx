import React from "react";
import OverlayNote from "./OverlayNote";

function OverlayNotes({todo}) {
    const notes = todo.notes

    return (
        <div className="overlay-text">
            {notes.map((note) => (
                <OverlayNote
                    key={note.id}
                    note={note}
                    todo={todo}
                />
            ))}
        </div>
    );
}

export default OverlayNotes;
