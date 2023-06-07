import React from 'react';

const Legend: React.FC = () => {
    return (
        <div className="flex items-center justify-end m-3 sticky top-0">
            <div className="w-4 h-4 mr-2 bg-red-300" ></div>
            <span>To Do</span>
            <div className="w-4 h-4 mr-2 ml-4 bg-green-300" ></div>
            <span>Completed</span>
        </div>
    );
};

export default Legend;
