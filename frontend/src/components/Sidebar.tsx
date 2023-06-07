import { Link, useLocation } from "react-router-dom";
import React, { useState } from 'react';

const Sidebar: React.FC = () => {

    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const location = useLocation();

    return (
        <React.Fragment>
            <i
                className="fa-solid fa-bars absolute top-5 left-5 text-2xl cursor-pointer md:hidden"
                onClick={() => setOpenSidebar(true)}
            ></i>
            <div className={`${!openSidebar && '-translate-x-full'} bg-white min-h-screen fixed flex-shrink-0 md:static md:translate-x-0 w-64 p-5 shadow-xl duration-300 z-20`}>
                <i
                    className="fa-solid fa-x absolute right-3 text-2xl cursor-pointer md:hidden"
                    onClick={() => { setOpenSidebar(false) }}
                ></i>
                <h1 className="font-black text-3xl text-[#38AE99] font-logo">LOGO</h1>
                <ul className="my-8">
                    <Link
                        to='/'
                        onClick={() => setOpenSidebar(false)}
                    >
                        <li className={`p-3 my-3 ${location.pathname === '/' ? 'bg-teal-200 border-teal-400 border-[1px]' : 'bg-[#38AE991A]'} rounded-lg text-[#38AE99] pl-10 hover:bg-teal-200`}>
                            <i className="fas fa-tasks"></i><span className="mx-3">Tasks List</span>
                        </li>
                    </Link>
                    <Link
                        to='/new-task'
                        onClick={() => setOpenSidebar(false)}
                    >
                        <li className={`p-3 my-3 ${location.pathname === '/new-task' ? 'bg-teal-200 border-teal-400 border-[1px]' : 'bg-[#38AE991A]'} rounded-lg text-[#38AE99] pl-10 hover:bg-teal-200`}>
                            <i className="fa-solid fa-plus"></i><span className="mx-3">New Task</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </React.Fragment>
    )
};

export default Sidebar;