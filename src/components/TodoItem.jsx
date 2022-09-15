import React from "react";
import { useNavigate } from "react-router-dom";

function TodoItem({ todo }) {
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

    const day = todo.date;
    const month = months[todo.mounth];
    const year = todo.year;

    const router = useNavigate();

    let countCompleted = 0;
    let completedMax = todo.notes.length;

    todo.notes.map((note) => (note.completed ? (countCompleted += 1) : 0));

    return (
        <div className="todo-item" onClick={() => router(`/${todo.id}`)}>
            <div className="todo-item__wrapper">
                <div className="todo-title">
                    <h2>{todo.title}</h2>
                </div>
                <div className="todo-text">
                    <span>
                        {day} {month} {year} г. | {" "}
                        {countCompleted === 0 ? (
                            <p style={{fontWeight: "bold", display: 'inline-block' }}>Ожидание</p>
                        ) : countCompleted === completedMax ? (
                            <p style={{ color: "#00ff00", fontWeight: "bold", display: 'inline-block' }}>
                                Выполнено
                            </p>
                        ) : (
                            <p style={{ color: "rgb(0, 136, 255)", fontWeight: "bold", display: 'inline-block' }}>
                                В процессе
                            </p>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
