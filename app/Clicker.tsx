import { useState } from "react";

export default function Clicker() {

    const [count, setCount] = useState(0);

    const plus1 = () => {
        setCount(count + 1);
    };
    const minus1 = () => {
        setCount(count - 1);
    };
    const reset = () => {
        setCount(0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-2xl font-bold content-center text-center">
                <h1>Clicker</h1>
                <div>
                    <button className="mt-10 rounded-sm p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:mt-0 transition-all duration-500 ease-in-out" onClick={plus1}>
                        +1
                    </button>
                    <button className="mt-10 rounded-sm p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:mt-0 transition-all duration-500 ease-in-out" onClick={reset}>
                        reset
                    </button>
                    <button className="mt-10 rounded-sm p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:mt-0 transition-all duration-500 ease-in-out" onClick={minus1}>
                        -1
                    </button>
                </div>
            </div>
            <p className="text-2xl font-bold">Počet kliknutí: {count}</p>
        </div>
    );
}