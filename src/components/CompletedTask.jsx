import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../slice/taskSlice';
import EditTask from './EditTask';

const CompletedTask = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editBar, setEditBar] = useState(false);

    const dispatch = useDispatch();
    const completedtasklist = useSelector(state => state.task.completedTask);
    // console.log("completedtasklist");


    const showEditTaskBar = (task) => {
        setSelectedTask(task);
        setEditBar(true);
    };

    return (
        <>
            {editBar && <div className="overlay"></div>}
            <div className={editBar ? "disabled-container blur" : "blur"}>
                {completedtasklist.length === 0 && <h2 className='no-task'>No Completed Task</h2>}
                {completedtasklist.map((task) => (
                    <div key={task.id} className="about_task">
                        <div>
                            <div className={task.isCompleted ? "doneTask" : ""}>{task.title}</div>
                        </div>
                        <div className="date_task">{task.date}</div>
                        <div className="date_task" style={{
                            color: task.priority === "High" ? "#c10202" : task.priority === "Medium" ? "#ae8213" : "#255b25",
                            fontWeight: "bold"
                        }}>{task.priority}</div>
                        <div className="function_container">
                            <div className="edit" onClick={() => showEditTaskBar(task)}>Edit</div>
                            <div className="delete" onClick={() => dispatch(removeTask(task.id))}>Delete</div>
                            <button
                                className="done"
                                disabled>Done
                            </button>
                        </div>
                    </div>
                ))}
                {/* {editBar && <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />} */}
            </div>

            {/* Render EditTask only when editBar is true */}
            {editBar && selectedTask && (
                <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />
            )}
        </>
    );
};

export default CompletedTask;