import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/TodoList.scss";
import TodoItem from "./TodoItem";
import { todo_add, sort_todos } from "../store/reducers/todoReducer.js";
import { useState } from "react";
import { useMemo } from "react";
import MySelect from "./UI/select/MySelect";

function TodoList() {
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    function todoActive(e) {
        let todosHTML = e.target.closest(".todos");
        let todoItem = e.target.closest(".todo-item");

        if (!todosHTML) return;
        if (!todoItem) return;
        if (todosHTML.children.length) {
            for (const todoHTML of todosHTML.children) {
                todoHTML.classList.remove("active");
            }
            todoItem.classList.add("active");
        }
    }

    const sortTodos = (sort) => {
        setSelectedSort(sort);
        dispatch(sort_todos(sort));
    };

    const sortedAndSearchedTodo = useMemo(() => {
        return todos.filter((todo) =>
            todo.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [todos, query]);

    const localTodo = JSON.parse(localStorage.getItem("todoList"));

    function addLocalTodo() {
        localTodo.push({
            id: Date.now(),
            title: "Название",
            year: new Date().getFullYear(),
            mounth: new Date().getMonth(),
            date: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            notes: [],
        });

        localStorage.setItem("todoList", JSON.stringify(localTodo));
    }

    return (
        <div className="todo-list">
            <div className="search">
                <div className="search-top">
                    <input
                        type="text"
                        placeholder="Поиск заметки"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        className="btn-add"
                        onClick={() => {
                            dispatch(todo_add());
                            addLocalTodo();
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="search-sort">
                    <MySelect
                        value={selectedSort}
                        onChange={sortTodos}
                        defaultValue="Сортировка"
                        options={[
                            { value: "title", name: "По названию" },
                            { value: "id", name: "По дате" },
                        ]}
                    />
                </div>
            </div>
            <div className="todos" onClick={(e) => todoActive(e)}>
                {todos.length
                    ? sortedAndSearchedTodo.map((todo) => (
                          <TodoItem key={todo.id} todo={todo} />
                      ))
                    : ""}
            </div>
        </div>
    );
}

export default TodoList;
