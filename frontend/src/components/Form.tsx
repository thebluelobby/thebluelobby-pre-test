import { useState } from "react";
import Button from "./formComponents/Button";
import DatePicker from "./formComponents/DatePicker";
import Input from "./formComponents/Input";
import { iTask } from "../utils/models/Task";

interface formProps {
    onSubmit: (value: iTask) => void;
    initialValue: iTask;
    isEdit?: boolean
}

const Form: React.FC<formProps> = (props) => {

    const [formState, setFormState] = useState<iTask>(props.initialValue);
    const [formError, setFormError] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(false);
        if (formState.title.trim() !== '' && formState.description.trim() !== '' && formState.dueDate) {
            props.onSubmit(formState);
            setFormState({ ...formState, title: '', description: '', dueDate: null })
        }else{
            setFormError(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.type === 'date') {
            setFormState({ ...formState, [e.target.name]: new Date(e.target.value) });
        } else {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-5 max-w-3xl mx-auto">
            <Input
                type="input"
                label="Task Title*"
                name="title"
                value={formState.title}
                onChange={handleChange}
            />
            {/* Description */}
            <Input
                type="textArea"
                label="Task Description*"
                name="description"
                value={formState.description}
                onChange={handleChange}
            />
            {/* Date Picker */}
            <DatePicker
                label="Due Date*"
                name="dueDate"
                value={formState.dueDate}
                setDate={handleChange}
            />
            {/* Error */}
            {formError && <p className="text-red-600">All field are required!</p>}
            {/* Submit Button */}
            <Button
                type="submit"
            >
                {props.isEdit? "Update Task": "Add Task"}
            </Button>
        </form>
    )
};

export default Form;