import { useDispatch } from 'react-redux';
import '../styles/AddTask.css'
import { ImCross } from "react-icons/im";
import { useForm } from 'react-hook-form';
import { addTask } from '../slice/taskSlice';

const AddTask = ({ hideAddBar }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const delay = (d) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    dispatch(addTask(data));
    await delay(1);
    reset();
  }

  console.log("AddTask rendered");

  return (<>
    <div className='addTask'>
      <div className='top'>
        <h2 className='task_details'>Task Details</h2>
        <button onClick={hideAddBar}><ImCross /></button>
      </div>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='common_class_label'>
            <div style={{ display: 'flex' }}>
              Title
              <p className='red'>*</p>
            </div>
            <input placeholder='Enter the title of your task' type="text"
              {...register("title",
                {
                  required: { value: true, message: "title is required" },
                  minLength: { value: 5, message: "minimum length of title is 5" },
                  maxLength: { value: 30, message: "maximum length of title is 30" }
                }
              )}
            />
          </label>
          {errors.title && <div className='red' >{errors.title.message}</div>}
        </div>
        <div>
          <label className='common_class_label'>
            <div style={{ display: 'flex' }}>Priority
              <p className='red'>*</p>
            </div>
            <select {...register("priority",
              { required: { value: true, message: "priority is required" } }
            )} defaultValue=""
            >
              <option value="" disabled>Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && <div className='red' >{errors.priority.message}</div>}
          </label>
          <label className='common_class_label' htmlFor="" >
            <div style={{ display: 'flex' }}>Deadline
              <p className='red'>*</p>
            </div>
            <input placeholder='Enter Date' type="date" {...register("date",
              { required: { value: true, message: "deadline is required" } }
            )} />
            {errors.date && <div className='red' >{errors.date.message}</div>}
          </label>
        </div>
        <div>
          <label className='common_class_label' htmlFor="">Comments
            <textarea placeholder='Add comments for your task' style={{ height: "60px" }} {...register("comments")} />
          </label>
        </div>
        <div>
          <button id="reset-btn" disabled={isSubmitting} onClick={() => { reset() }}>reset</button>
          <input type="submit" id="submit-btn" value={isSubmitting ? "Adding" : "Add"} disabled={isSubmitting} />
        </div>
        {isSubmitting && <div className="adding-task">Task is Adding...</div>}
      </form>
    </div>
  </>
  );
}

export default AddTask;