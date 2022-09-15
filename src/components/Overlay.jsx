import React from "react";
import "../styles/Overlay.scss";
import { useParams } from "react-router-dom";
import OverlayContent from "./OverlayContent";
import { useSelector} from "react-redux";

function Overlay() {
    const params = useParams();
    const todos = useSelector((state) => state.todo.todos);
    const todo = todos.filter((todo) => todo.id === +params.id)[0];

    return (
        <div className="overlay">
            {todo ? (
                todos.map((todo) =>
                    todo.id === Number(params.id) ? (
                        <OverlayContent
                            key={todo.id}
                            todo={todo}
                        />
                    ) : (
                        ""
                    )
                )
            ) : (
                <div className="not-found">
                    <h2>Заметок не найдено</h2>
                </div>
            )}
        </div>
    );
}

export default Overlay;
