import { useNavigate } from "react-router-dom";
import { iTask } from "../../utils/models/Task";
import { useState } from 'react';

interface iTaskItemProps extends iTask {
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<iTaskItemProps> = (props) => {

  const [isComplete, setIsComplete] = useState<boolean>(props.complete);
  const navigate = useNavigate();

  const handleDelete = () => {
    props.onDelete(props.id!);
  }

  const handleComplete = () => {
    fetch(`http://localhost:3000/api/tasks/${props.id}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isComplete: !isComplete }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update task completion status.');
        }
        return res;
      })
      .then(() => {
        setIsComplete(!isComplete);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={`${isComplete ? 'bg-green-200' : 'bg-red-200'} duration-300 rounded overflow-hidden shadow-lg border-[1px] border-black px-3 py-2 m-2`}>
      <div className="flex flex-col items-end md:flex-row md:justify-end gap-2">
        <div>
          <p className="inline mr-2">Due:</p>
          <p className="text-red-700 text-base inline">
            {new Date(props.dueDate!).toISOString().split('T')[0]}
          </p>
        </div>
        <div>
          <p className="inline mr-2">Created:</p>
          <p className="text-blue-700 text-base inline">
            {new Date(props.createdOn!).toISOString().split('T')[0]}
          </p>
        </div>
      </div>
      <header className="flex justify-between">
        <h1 className="font-bold mb-2">{props.title}</h1>
      </header>
      <div>
        <p className="text-gray-700 text-base italic">
          {props.description}
        </p>
      </div>
      <footer className="pt-4 text-end">
        {/* complete button */}
        <button
          className={`${isComplete ? 'bg-red-400 hover:bg-red-600' : 'bg-green-400 hover:bg-green-600'} inline-block rounded-full mx-[1px] px-[5px] py-[3px] text-sm font-semibold text-white mb-2`}
          onClick={handleComplete}
        >
          {isComplete ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa fa-check" aria-hidden="true"></i>}
        </button>
        {/* edit button */}
        <button
          className="inline-block bg-blue-400 hover:bg-blue-600 rounded-full mx-[1px] px-[5px] py-[3px] text-sm font-semibold text-white mb-2"
          onClick={() => { navigate(`/task/${props.id}`) }}
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        {/* delete button */}
        <button
          className="inline-block bg-red-400 hover:bg-red-600 rounded-full mx-[1px] px-[5px] py-[3px] text-sm font-semibold text-white mb-2"
          onClick={handleDelete}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </footer>
    </div>
  )
};

export default TaskItem;