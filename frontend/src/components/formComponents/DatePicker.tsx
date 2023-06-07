import React, { useRef } from "react";

interface iProps {
    name: string;
    label: string;
    value: Date | null;
    setDate: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DatePicker: React.FC<iProps> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setDate(e);
    }

    const dateInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col p-1">
            <label
                htmlFor="dueDate"
                className="uppercase text-lg text-teal-600 block"
            >
                {props.label}
            </label>
            <input
                className="py-2 px-4 outline-none border-2 border-blue-200 focus:border-purple-600 bg-[#f3f4f6] focus:bg-white w-40 cursor-pointer"
                type="date"
                name={props.name}
                value={props.value?.toISOString().split('T')[0] || ''}
                onChange={handleChange}
                ref={dateInputRef}
                onClick={() => { dateInputRef.current?.showPicker() }}
            />
        </div>
    )
};

export default DatePicker;