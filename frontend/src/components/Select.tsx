import React from 'react';

export interface Option {
    text: string;
    value: string;
}

interface iSelectProps {
    name: "filter" | "sort";
    label: string;
    options: Option[];
    onChange: (name: string, value: string | undefined) => void;
}

const Select: React.FC<iSelectProps> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e.target.name, e.target.value)
    }

    const icon = props.name === 'filter' ? <i className="fa-solid fa-filter text-sm"></i> : <i className="fa-solid fa-sort text-sm"></i>
    return (
        <div className='py-1 px-3 inline-block text-teal-600'>
            {icon}
            <label htmlFor={props.name}>{props.label}:</label>
            <select
                name={props.name}
                className='border-[1px] border-teal-300 rounded-sm ml-2'
                onChange={handleChange}
            >
                {props.options.map((option, index) => {
                    return <option
                        key={index}
                        value={option.value}
                        className='m-2'
                    >
                        {option.text}
                    </option>
                })}
            </select>
        </div>
    )
};

export default Select;