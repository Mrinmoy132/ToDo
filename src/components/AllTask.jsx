import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeTask, doneTask } from '../slice/taskSlice';
import EditTask from './EditTask';

const AllTask = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editBar, setEditBar] = useState(false);

    const tasklist = useSelector(state => state.task.tasks);
    const dispatch = useDispatch();

    const showedittaskBar = useCallback((task) => {
        setSelectedTask(task);
        setEditBar(true);
    });

    // console.log("all task list");

    return (
        <>
            {editBar && <div className="overlay"></div>}
            <div className={editBar ? "disabled-container blur" : "blur"}>
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
                {/* {editBar && <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />} */}
            </div>

            {/* Render EditTask only when editBar is true */}
            {editBar && selectedTask && (
                <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />
            )}
        </>
    )
}

export default AllTask
