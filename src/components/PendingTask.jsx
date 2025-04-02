import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, doneTask } from '../slice/taskSlice';
import EditTask from './EditTask';

const PendingTask = () => {

    const [selectedTask, setSelectedTask] = useState(null);
    const [editBar, setEditBar] = useState(false);

    const dispatch = useDispatch();
    const tasklist = useSelector(state => state.task.tasks);

    const completedTaskList = useSelector(state => state.task.completedTask);
    const pendingTasks = useMemo(() => {
        return tasklist.filter(task =>
            !completedTaskList.some(completed => completed.id === task.id))
    }, [tasklist, completedTaskList]);

    const showedittaskBar = useCallback((task) => {
        setSelectedTask(task);
        setEditBar(true);
    });

    console.log("Pending rendered");

    return (
        <>
            {editBar && <div className="overlay"></div>}
            <div className={editBar ? "disabled-container blur" : "blur"}>
                {pendingTasks.length == 0 && <h2 className='no-task'>No Pending Task</h2>}
                {pendingTasks.map(task => {
                    return (
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
                                <div className="edit" onClick={() => showedittaskBar(task)}>Edit</div>
                                <div className="delete" onClick={() => dispatch(removeTask(task.id))}>Delete</div>
                                <button className="done" onClick={() => dispatch(doneTask(task.id))} disabled={task.isCompleted}>Done</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {editBar && selectedTask && (
                <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />
            )}
        </>
    )
}

export default PendingTask;
