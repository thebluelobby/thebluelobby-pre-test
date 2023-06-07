import React, { useState } from 'react'
import Form from "../components/Form";
import Loading from "../components/UI/Loading";
import { iTask } from "../utils/models/Task";
import { useNavigate } from 'react-router-dom';

const NewTask: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (value: iTask) => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: value.title,
                description: value.description,
                dueDate: value.dueDate,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create task.');
                }
                setIsLoading(false);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const initialFormValue: iTask = {
        title: '',
        description: '',
        dueDate: null,
        complete: false,
        createdOn: new Date
    }

    return (
        <div className="flex-1 md:relative">
            {isLoading && <Loading />}
            {/* Header */}
            <h1 className="text-2xl text-center mt-10 text-[#38AE99] font-bold">New Task</h1>

            {/* Add form */}
            <Form
                initialValue={initialFormValue}
                onSubmit={handleSubmit}
            />
        </div>
    )
};

export default NewTask;