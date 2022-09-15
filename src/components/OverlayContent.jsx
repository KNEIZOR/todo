import React from "react";
import { useState } from "react";
import { useRef } from "react";
import OverlayNotes from "./OverlayNotes";
import { useDispatch } from "react-redux";
import { delete_todo, todo_edit } from "../store/reducers/todoReducer";
import AddNote from "./AddNote";

function OverlayContent({ todo }) {
    const [title, setTitle] = useState(todo.title);
    const inputTitleRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const localTodos = JSON.parse(localStorage.getItem("todoList"));

    function edit() {
        setIsEdit(!isEdit);
        dispatch(todo_edit([todo.id, title]));
        let newArr = localTodos.map((localTodo) => {
            if (localTodo.id === todo.id) {
                localTodo.title = title;
            }
            return localTodo;
        });
        localStorage.setItem("todoList", JSON.stringify(newArr));
        if (!isEdit) {
            inputTitleRef.current.focus();
        }
    }

    let countCompleted = 0;
    let completedMax = todo.notes.length;

    todo.notes.map((note) => (note.completed ? (countCompleted += 1) : 0));

    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "майя",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];

    const minute = todo.minute;
    const hour = todo.hour;
    const day = todo.date;
    const month = months[todo.mounth];
    const year = todo.year;

    function deleteLocalTodo(id) {
        let newArr = localTodos.filter((todo) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(newArr));
    }

    return (
        <div className="overlay__wrapper">
                <div className="overlay-title">
                    <div className="top-title">
                        <h2 style={{ display: isEdit ? "none" : "inline" }}>
                            {todo.title}
                        </h2>
                        <input
                            ref={inputTitleRef}
                            type="text"
                            value={title}
                            style={{ opacity: isEdit ? "1" : "0" }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="btns-title">
                            {isEdit ? (
                                <button
                                    className="btn-edit-success"
                                    onClick={() => edit(todo.id)}
                                >
                                    <i className="fa-regular fa-circle-check"></i>
                                </button>
                            ) : (
                                <button
                                    className="btn-edit"
                                    onClick={() => edit(todo.id)}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                            )}
                            <button
                                className="btn-todo-delete"
                                onClick={() => {
                                    dispatch(delete_todo(todo.id));
                                    deleteLocalTodo(todo.id);
                                }}
                            >
                                Удалить заметку
                            </button>
                        </div>
                    </div>
                    <div className="bottom-title">
                        <progress
                            style={{
                                marginRight: "10px",
                            }}
                            value={countCompleted}
                            max={completedMax}
                        ></progress>
                        {completedMax ? (
                            <p
                                style={{
                                    fontWeight: "bold",
                                    display: "inline-block",
                                    marginRight: "20px",
                                }}
                            >
                                {Math.floor(
                                    (countCompleted / completedMax) * 100
                                )}
                                %
                            </p>
                        ) : (
                            <p
                                style={{
                                    fontWeight: "bold",
                                    display: "inline-block",
                                    marginRight: "20px",
                                }}
                            >
                                0%
                            </p>
                        )}
                        {countCompleted === 0 ? (
                            <p
                                style={{
                                    fontWeight: "bold",
                                    display: "inline-block",
                                }}
                            >
                                Ожидание
                            </p>
                        ) : countCompleted === completedMax ? (
                            <p
                                style={{
                                    color: "#00ff00",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                }}
                            >
                                Выполнено
                            </p>
                        ) : (
                            <p
                                style={{
                                    color: "rgb(0, 136, 255)",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                }}
                            >
                                В процессе
                            </p>
                        )}
                        <h2
                            style={{
                                fontSize: "20pt",
                                color: "rgb(177, 177, 177)",
                            }}
                        >
                            {day} {month} {year} г., {hour}:{minute}
                        </h2>
                    </div>
                </div>
                <OverlayNotes todo={todo} />
                <AddNote todo={todo} />
            </div>
    );
}

export default OverlayContent;
