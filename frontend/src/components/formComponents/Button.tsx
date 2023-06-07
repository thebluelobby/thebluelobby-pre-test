import React from "react";

interface buttonProps {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset'
}

const Button: React.FC<buttonProps> = (props) => {
    return (
        <button
            className="inline-block rounded bg-[#38AE99] m-1 px-4 pb-2 pt-2.5 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-teal-700 active:bg-teal-500"
            type={props.type}
        >
            {props.children}
        </button>
    )
};

export default Button;