import { stringify } from "querystring";
import { useState, useEffect } from "react";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Načti todos při načtení stránky
    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const response = await fetch('/api/getAll', { method: 'GET' });
        const json = await response.json();
        setTodos(json);
    }

    async function postNew() {
        await fetch('/api/getAll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        setTitle("");
        setDescription("");
        fetchTodos(); // znovu načti todos po přidání
    }

    async function deleteTodo(id: number) {
        if (!id) return;
        await fetch('/api/getAll', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        fetchTodos(); // znovu načti todos po smazání
    }

    async function completeTodo(id: number) {
        if (!id) return;
        await fetch('/api/getAll', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        fetchTodos(); // znovu načti todos po dokončení
    }

    return (
        <div>
            <p>Welcome!</p>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={postNew}>Post New Todo</button>
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id}>
                        <h3 className="p-3 text-4xl">{todo.title}</h3>
                        <p className="p-3 text-2xl">{todo.description}</p>
                        <p className="p-1 text-1xl">Created at: {new Date(todo.createdAt).toLocaleString()}</p>
                        <p className="p-1 text-1xl">Completed: {todo.completed ? "ANO" : "NE"}</p>
                        <button className="border-2" onClick={() => { completeTodo(todo.id) }}>Complete</button><br />
                        <button className="border-2" onClick={() => { deleteTodo(todo.id) }} >Delete</button>
                        <p>------------------------------------</p>
                    </li>
                ))}
            </ul>
            <button className="border-2" onClick={fetchTodos}>Get Todos</button>
        </div>
    );
}