"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { action } from "../../../actions/actions";

export default function InputForm() {
    const focusRef = useRef<HTMLInputElement>(null!);
    const [data, setData] = useState<string | undefined>("");

    useEffect(() => {
        focusRef.current?.focus();
    }, []);

    async function clientAction(formData: FormData) {
        const res = await action(formData); // Call server action
        setData(res); // Update state with response
    }

    return (
        <form action={clientAction}>
            <InputField focusRef={focusRef} />
            <div className=" p-6 mx-auto">
                <p className="">{data}</p>
            </div>
        </form>
    );
}

function InputField({ focusRef }: { focusRef: React.RefObject<HTMLInputElement> }) {
    const { pending } = useFormStatus(); // Tracks form submission state

    return (
        <div className="flex justify-center items-center gap-4 w-full">
            <input
                ref={focusRef}
                className="p-3 w-96 bg-gray-200 rounded-md"
                type="text"
                name="prompt"
                placeholder="Enter the Prompt"
            />
            <button
                type="submit"
                className="bg-gray-300 w-24 h-10 flex justify-center items-center rounded-md"
                disabled={pending} // `pending` works now
            >
                {pending ? "Sending..." : "Send"}
            </button>
        </div>
    );
}
