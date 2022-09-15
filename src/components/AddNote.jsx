import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_note } from "../store/reducers/todoReducer";

function AddNote({ todo }) {
    const [valueNote, setValueNote] = useState("");
    const dispatch = useDispatch();
    const localTodos = JSON.parse(localStorage.getItem("todoList"));

    function addNote() {
        dispatch(add_note([todo.id, valueNote]));
        let newArr = localTodos.map((localTodo) => {
            if (localTodo.id === todo.id) {
                localTodo.notes.push({
                    id: Date.now() + 5,
                    text: valueNote,
                    completed: false,
                });
            }
            return localTodo;
        });
        localStorage.setItem("todoList", JSON.stringify(newArr));
        setValueNote("");
    }

    function addNoteEnter(e) {
        if (e.keyCode === 13) {
            dispatch(add_note([todo.id, valueNote]));
            let newArr = localTodos.map((localTodo) => {
                if (localTodo.id === todo.id) {
                    localTodo.notes.push({
                        id: Date.now() + 5,
                        text: valueNote,
                        completed: false,
                    });
                }
                return localTodo;
            });
            localStorage.setItem("todoList", JSON.stringify(newArr));
            setValueNote("");
        }
    }

    return (
        <div className="add-text-container" onKeyDown={(e) => addNoteEnter(e)}>
            <input
                value={valueNote}
                onChange={(e) => setValueNote(e.target.value)}
                type="text"
                placeholder="Введите заметку"
            />
            <button className="btn-add-note" onClick={() => addNote()}>+</button>
        </div>
    );
}

export default AddNote;
