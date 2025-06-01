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
        <div>
            <div className="text-2xl font-bold">
                <h1>Clicker</h1>
                <div>
                    <button className="p-5 bg-blue-500 hover:p-6" onClick={plus1}>
                        +1
                    </button>
                    <button className="p-5 bg-blue-500 hover:p-6" onClick={reset}>
                        reset
                    </button>
                    <button className="p-5 bg-blue-500 hover:p-6" onClick={minus1}>
                        -1
                    </button>
                </div>
            </div>
            <p className="text-2xl font-bold">Počet kliknutí: {count}</p>
        </div>
    );
}