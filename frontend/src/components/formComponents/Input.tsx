import React from "react";

interface inputProps {
  value: string;
  name: string;
  label: string;
  type: "input" | "textArea"
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<inputProps> = (props) => {

  const input = props.type === "input" ?
    <input
      className="py-2 px-4 outline-none border-2 border-blue-200 focus:border-purple-600 bg-[#f3f4f6] focus:bg-white"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder="Enter title..."
    />
    :
    <textarea
      className="py-2 px-4 outline-none border-2 border-blue-200 focus:border-purple-600 resize-none bg-[#f3f4f6] focus:bg-white"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      rows={5}
      placeholder="Enter description..."
    >
    </textarea>

  return (
    <div className="flex flex-col p-1">
      <label
        htmlFor={props.name}
        className="uppercase text-lg text-teal-600"
      >
        {props.label}
      </label>
      {input}
    </div>

  )
};

export default Input;