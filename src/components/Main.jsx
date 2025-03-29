import { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeTask, doneTask, overDueTask } from '../slice/taskSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import '../styles/Main.css';

import AddTask from './AddTask';
import EditTask from './EditTask';

import AllTask from './AllTask';
import PendingTask from './PendingTask';
import OverdueTask from './OverdueTask';
import CompletedTask from './CompletedTask';


const Main = () => {
    const [showOriginal, setShowOriginal] = useState(true);
    const [showAllTasklist, setShowAllTasklist] = useState(false);
    const [showpendingTasklist, setShowpendingTasklist] = useState(false);
    const [showoverdueTasklist, setShowoverdueTasklist] = useState(false);
    const [showcompletedTaskList, setShowcompletedTaskList] = useState(false);
    const [addBar, setAddBar] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editBar, setEditBar] = useState(false);

    const dispatch = useDispatch();

    const tasklist = useSelector(state => state.task.tasks);
    const completedTaskList = useSelector(state => state.task.completedTask);
    const pendingTasklist = useMemo(() => {
        return tasklist.filter(task => !completedTaskList.some(completed => completed.id === task.id));
    }, [tasklist, completedTaskList]);
    const dueTaskList = useSelector(state => state.task.dueTask)



    const showAllTask = useCallback(() => {
        setShowOriginal(false);
        setShowpendingTasklist(false);
        setShowoverdueTasklist(false);
        setShowcompletedTaskList(false);
        setShowAllTasklist(true);
    }, []);

    const showPendingTask = useCallback(() => {
        setShowOriginal(false);
        setShowAllTasklist(false);
        setShowoverdueTasklist(false);
        setShowcompletedTaskList(false);
        setShowpendingTasklist(true);
    }, []);

    const showOverdueTask = useCallback(() => {
        setShowOriginal(false);
        setShowAllTasklist(false);
        setShowpendingTasklist(false);
        setShowcompletedTaskList(false);
        setShowoverdueTasklist(true);

    }, []);

    const showCompletedTask = useCallback(() => {
        setShowOriginal(false);
        setShowAllTasklist(false);
        setShowpendingTasklist(false);
        setShowoverdueTasklist(false);
        setShowcompletedTaskList(true);
    }, []);

    const showedittaskBar = useCallback((task) => {
        setSelectedTask(task);
        setEditBar(true);
    });

    const location = useLocation();

    useEffect(() => {
        // Reset all states
        setShowOriginal(false);
        setShowAllTasklist(false);
        setShowpendingTasklist(false);
        setShowoverdueTasklist(false);
        setShowcompletedTaskList(false);

        // Set the correct state based on the URL
        switch (location.pathname) {
            case "/all_links":
                setShowAllTasklist(true);
                break;
            case "/pendingtask":
                setShowpendingTasklist(true);
                break;
            case "/overduetask":
                setShowoverdueTasklist(true);
                break;
            case "/completedtask":
                setShowcompletedTaskList(true);
                break;
            default:
                setShowOriginal(true); // Default to "All Task" view
        }
    }, [location.pathname]);  // Runs every time the URL changes

    // console.log("Main rendering");
    // console.log("alltask", tasklist)
    // console.log("pending Task list", pendingTasklist);
    // console.log("due Task list", dueTaskList);
    // console.log("completed Task List", completedTaskList);

    return (<>
        {(editBar || addBar) && <div className="overlay"></div>}
        <div className={`main-container ${editBar || addBar ? "disabled-container blur" : "blur"}`}>
            <div className='main'>
                <div className="container_heading">
                    <h1 className="heading">To Do App</h1>
                </div>

                <div className="task_category_container">
                    <NavLink className={(e) => { return e.isActive ? "btn left hover" : "btn left" }} to="/all_links" onClick={showAllTask}>All Task</NavLink>
                    <NavLink className={(e) => { return e.isActive ? "btn hover" : "btn" }} to="/pendingtask" onClick={showPendingTask}>Pending</NavLink>
                    <NavLink className={(e) => { return e.isActive ? "btn hover" : "btn" }} to="/overduetask" onClick={showOverdueTask}>Overdue</NavLink>
                    <NavLink className={(e) => { return e.isActive ? "btn right hover" : "btn right" }} to="/completedtask" onClick={showCompletedTask}>Completed</NavLink>
                </div>

                <div className="adding_task">
                    <div className="task_list" >
                        {showOriginal && `All Task - ${tasklist.length}`}
                        {showAllTasklist && `All Task - ${tasklist.length}`}
                        {showpendingTasklist && `Pending Task - ${pendingTasklist.length}`}
                        {showoverdueTasklist && `Due Task - ${dueTaskList.length}`}
                        {showcompletedTaskList && `Completed Task - ${completedTaskList.length}`}
                    </div >
                    <div className="add_task" onClick={() => setAddBar(true)}>Add Task</div>
                    {/* {addBar && <AddTask hideAddBar={() => setAddBar(false)} />} */}
                </div >

                <div className="show_task_container">
                    <div className="about_task1">
                        <div>Title</div>
                        <div>Due Date</div>
                        <div>Priority</div>
                        <div className='random'></div>
                    </div>
                    {showOriginal && (
                        <>
                            {tasklist.length == 0 && <h2 className='no-task'>No Todo Task</h2>}
                            {tasklist.map((task) => (
                                <div key={task.id} className="about_task">
                                    <div>
                                        <div className={task.isCompleted ? "doneTask" : ""}>{task.title}</div>
                                    </div>
                                    <div className="date_task">{task.date}</div>
                                    <div className="date_task" style={{
                                        color: task.priority === "High" ? "#c10202" : task.priority === "Medium" ? "#ae8213" : "#255b25",
                                        fontWeight: "bold"
                                    }}>{task.priority}
                                    </div>
                                    <div className="function_container">
                                        <div className="edit" onClick={() => showedittaskBar(task)}>Edit</div>

                                        <div className="delete" onClick={() => dispatch(removeTask(task.id))}>Delete</div>

                                        <button className="done" onClick={() => dispatch(doneTask(task.id))} disabled={task.isCompleted}>Done
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {showAllTasklist && <AllTask />}
                    {showpendingTasklist && <PendingTask />}
                    {showoverdueTasklist && <OverdueTask />}
                    {showcompletedTaskList && <CompletedTask />}
                </div>
            </div >
            {/* {editBar && <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />} */}
        </div>

        {/* Render EditTask only when editBar is true */}
        {addBar && <AddTask hideAddBar={() => setAddBar(false)} />}
        {editBar && selectedTask && <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />}
    </>
    );
};

export default Main;
