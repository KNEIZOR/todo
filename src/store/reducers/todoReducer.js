import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoReducer = createSlice({
    name: "todoReducer",
    initialState,
    reducers: {
        get_todo(state) {
            state.todos.push(...JSON.parse(localStorage.getItem("todoList")));
        },

        todo_add(state) {
            state.todos.push({
                id: Date.now(),
                title: "Название",
                year: new Date().getFullYear(),
                mounth: new Date().getMonth(),
                date: new Date().getDate(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                notes: [],
            });
        },

        todo_edit(state, action) {
            state.todos
                .filter((todo) => todo.id === action.payload[0])
                .map((todo) => (todo.title = action.payload[1]));
        },

        delete_todo(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },

        add_note(state, action) {
            state.todos
                .filter((todo) => todo.id === action.payload[0])
                .map((todo) =>
                    todo.notes.push({
                        id: Date.now() + 5,
                        text: action.payload[1],
                        completed: false,
                    })
                );
        },

        toggle_note(state, action) {
            state.todos
                .filter((todo) => todo.id === action.payload[0])
                .map((todo) =>
                    todo.notes.map((note) => {
                        if (note.id === action.payload[1]) {
                            note.completed = !note.completed;
                        }
                        return note;
                    })
                );
        },

        delete_note(state, action) {
            state.todos
                .filter((todo) => todo.id === action.payload[0])
                .map(
                    (todo) =>
                        (todo.notes = todo.notes.filter(
                            (note) => note.id !== action.payload[1]
                        ))
                );
        },

        sort_todos(state, action) {
            if (action.payload === "id") {
                state.todos.sort((a, b) => a[action.payload] - b[action.payload]);
            } else {
                state.todos.sort((a, b) =>
                    a[action.payload].localeCompare(b[action.payload])
                );
            }
        },
    },
});

export default todoReducer.reducer;
export const {
    todo_add,
    delete_todo,
    todo_edit,
    add_note,
    toggle_note,
    delete_note,
    get_todo,
    sort_todos,
} = todoReducer.actions;
