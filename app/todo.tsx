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
        <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 font-sans">
            <h1 className="text-5xl font-bold m-8 text-purple-700 drop-shadow">Todo List</h1>
            <div className="flex flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
                />
                <button
                    onClick={postNew}
                    className="px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition duration-400"
                >
                    Add Todo
                </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full max-w-5xl">
                {todos.map((todo: any) => (
                    <li
                        key={todo.id}
                        className={`w-full p-6 rounded-3xl shadow-lg border-2 transition duration-400
                        ${todo.completed ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"}
                        hover:scale-105 hover:shadow-2xl`}
                    >
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">{todo.title}</h3>
                        <p className="mb-2 text-lg text-gray-700">{todo.description}</p>
                        <p className="mb-1 text-sm text-gray-500 italic">Created: {new Date(todo.createdAt).toLocaleString()}</p>
                        <p className={`mb-3 text-base font-semibold ${todo.completed ? "text-green-700" : "text-red-700"}`}>
                            {todo.completed ? "Done" : "Not completed"}
                        </p>
                        <div className="flex flex-row gap-4">
                            <button
                                className={`px-4 py-1 rounded-lg font-semibold border-2 transition duration-400
                                ${todo.completed
                                        ? "bg-white border-green-400 text-green-700 hover:bg-green-200"
                                        : "bg-green-500 border-green-600 text-white hover:bg-green-600"}`}
                                onClick={() => completeTodo(todo.id)}
                            >
                                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                            </button>
                            <button
                                className="px-4 py-1 rounded-lg font-semibold border-2 border-red-400 text-red-700 bg-white hover:bg-red-200 transition duration-400"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                className="mt-10 px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500 transition duration-400"
                onClick={fetchTodos}
            >
                Refresh Todos
            </button>
        </div>
    );
}