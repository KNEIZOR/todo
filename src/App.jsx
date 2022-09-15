import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import "./App.scss";
import Overlay from "./components/Overlay";
import TodoList from "./components/TodoList";
import { get_todo } from "./store/reducers/todoReducer";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("todoList") === null) {
            localStorage.setItem("todoList", JSON.stringify([]));
            dispatch(get_todo())
        }
        dispatch(get_todo())
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <TodoList />
                <Routes>
                    <Route path="/" element={<Overlay/>} />
                    <Route
                        path="/:id"
                        element={
                            <Overlay/>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
