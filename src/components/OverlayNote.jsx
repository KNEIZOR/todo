import React from "react";
import { useDispatch } from "react-redux";
import { delete_note, toggle_note } from "../store/reducers/todoReducer";

function OverlayNote({ note, todo }) {
    const classes = [];
    const dispatch = useDispatch();
    const localTodos = JSON.parse(localStorage.getItem("todoList"));

    if (note.completed) {
        classes.push("done");
    }

    function deleteLocalNote() {
        let newArr = localTodos.map((localTodo) => {
            if (localTodo.id === todo.id) {
                localTodo.notes = localTodo.notes.filter(
                    (localNote) => localNote.id !== note.id
                );
            }
            return localTodo;
        });
        localStorage.setItem("todoList", JSON.stringify(newArr));
    }

    function toggleLocalNote() {
        let newArr = localTodos.map((localTodo) => {
            if (localTodo.id === todo.id) {
                localTodo.notes.map((localNote) => {
                    if (localNote.id === note.id) {
                        localNote.completed = !localNote.completed;
                    }
                });
            }
            return localTodo;
        });
        localStorage.setItem("todoList", JSON.stringify(newArr));
    }

    return (
        <div className="note" style={{background: note.completed ? "#3e667e" : "#2A3942"}}>
            <div
                className="note-left"
                onClick={() => {
                    dispatch(toggle_note([todo.id, note.id]));
                    toggleLocalNote();
                }}
            >
                <input type="checkbox" checked={note.completed} readOnly />
                <p className={`note-text ${classes.join(" ")}`}>{note.text}</p>
            </div>
                <i onClick={() => {
                    dispatch(delete_note([todo.id, note.id]));
                    deleteLocalNote();
                }} className="note-btn-delete fa-regular fa-circle-xmark"></i>
        </div>
    );
}

export default OverlayNote;
