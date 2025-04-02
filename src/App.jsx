import { useState, useMemo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import AddTask from './components/AddTask';

function App() {
  const [addBar, setAddBar] = useState(false);

  const tasklist = useSelector(state => state.task.tasks);
  const completedTaskList = useSelector(state => state.task.completedTask);
  const pendingTasklist = useMemo(() => {
    return tasklist.filter(task => !completedTaskList.some(completed => completed.id === task.id));
  }, [tasklist, completedTaskList]);
  const dueTaskList = useSelector(state => state.task.dueTask)

  const location = useLocation(); // Get current route

  // Map route to the respective count
  const taskCount = {
    "/": tasklist.length,
    "/pendingtask": pendingTasklist.length,
    "/overduetask": dueTaskList.length,
    "/completedtask": completedTaskList.length,
  };
  const taskName = {
    "/": "All Task",
    "/pendingtask": "Pending Task",
    "/overduetask": "Overdue Task",
    "/completedtask": "Completed Task"
  };

  return (
    <>
      {addBar && <div className="overlay"></div>}
      <div className={`main-container ${addBar ? "disabled-container blur" : "blur"}`}>
        <div className='main'>
          <div className="container_heading">
            <h1 className="heading">To Do App</h1>
          </div>

          <div className="task_category_container">
            <NavLink className={(e) => { return e.isActive ? "btn left hover" : "btn left" }} to="/">All Task</NavLink>
            <NavLink className={(e) => { return e.isActive ? "btn hover" : "btn" }} to="/pendingtask">Pending</NavLink>
            <NavLink className={(e) => { return e.isActive ? "btn hover" : "btn" }} to="/overduetask">Overdue</NavLink>
            <NavLink className={(e) => { return e.isActive ? "btn right hover" : "btn right" }} to="/completedtask">Completed</NavLink>
          </div>

          <div className="adding_task">
            <div className="task_list">
              {`${taskName[location.pathname]} - ${taskCount[location.pathname] || 0}`}
            </div>
            <div className="add_task" onClick={() => setAddBar(true)}>Add Task</div>
          </div>

          <div className="show_task_container">
            <div className="about_task1">
              <div>Title</div>
              <div>Due Date</div>
              <div>Priority</div>
              <div className='random'></div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      {addBar && <AddTask hideAddBar={() => setAddBar(false)} />}
    </>
  );
}

export default App;