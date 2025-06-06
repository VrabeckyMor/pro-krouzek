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
            <div className="text-2xl font-bold content-center flex flex-col items-center justify-center text-center h-full w-full">
                <h1>Clicker</h1>
                <div className="h-[150px] w-3/5 flex flex-row items-center justify-center gap-0.5">
                    <button className="w-1/3 p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:w-1/2 transition-all duration-500 ease-in-out active:translate-y-1 active:duration-50 active:ease-out" onClick={plus1}>
                        +1
                    </button>
                    <button className="w-1/3 p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:w-1/2 transition-all duration-500 ease-in-out active:translate-y-1 active:duration-50 active:ease-out" onClick={reset}>
                        reset
                    </button>
                    <button className="w-1/3 p-5 bg-blue-500 hover:p-10 hover:rounded-3xl hover:w-1/2 transition-all duration-500 ease-in-out active:translate-y-1 active:duration-50 active:ease-out" onClick={minus1}>
                        -1
                    </button>
                </div>
                <p className="text-2xl font-bold">Počet kliknutí: {count}</p>
            </div>
            
        </div>
    );
}