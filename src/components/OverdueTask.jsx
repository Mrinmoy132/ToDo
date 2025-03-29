import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, doneTask, overDueTask, updateTask } from '../slice/taskSlice';
import EditTask from './EditTask';

const OverDueTask = () => {

  const [selectedTask, setSelectedTask] = useState(null);
  const [editBar, setEditBar] = useState(false);

  const overdueTasks = useSelector(state => state.task.dueTask);
  const dispatch = useDispatch();

  const showedittaskBar = useCallback((id) => {
    setSelectedTask(id);
    setEditBar(true);
  });

  useEffect(() => {
    dispatch(overDueTask());
  }, []);

  return (<>
    {editBar && <div className="overlay"></div>}
    <div className={editBar ? "disabled-container blur" : "blur"}>
      {overdueTasks.length == 0 && <h2 className='no-task'>No Due Task</h2>}
      {overdueTasks.map(task => {
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
      {/* {editBar && <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />} */}
    </div>

    {/* Render EditTask only when editBar is true */}
    {editBar && selectedTask && (
      <EditTask task={selectedTask} hideEditBar={() => setEditBar(false)} />
    )}
  </>
  )
}

export default OverDueTask;
