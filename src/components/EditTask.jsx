import { useDispatch, useSelector } from 'react-redux';
import '../styles/AddTask.css'
import { ImCross } from "react-icons/im";
import { useForm } from 'react-hook-form';
import { updateTask } from '../slice/taskSlice';
import { useEffect } from 'react';

const EditTask = ({ task, hideEditBar }) => {
  const { register, handleSubmit, setError, reset, setValue ,formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();

  const delay = (d) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, d * 1000);
    })
  }

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("priority", task.priority);
      setValue("date", task.date);
      setValue("comments", task.comments);
    }
  }, [task, setValue]);


  const onSubmit = async (data) => {
    dispatch(updateTask({ id: task.id, ...data })); // Pass ID along with new data
    // await delay(1);
    hideEditBar(); // Close the edit task bar after submitting
  };

  return (
    <div className='addTask'>
      <div className='top'>
        <h2 className='task_details'>Task Details</h2>
        <button onClick={hideEditBar}><ImCross /></button>
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
                // {
                //   required: { value: true, message: "title is required" },
                //   minLength: { value: 5, message: "minimum length of title is 5" },
                //   maxLength: { value: 30, message: "maximum length of title is 30" }
                // }
              )}
            />
          </label>
          {/* {errors.title && <div className='red' style={{ fontSize: 'small' }}>{errors.title.message}</div>} */}
        </div>
        <div>
          <label className='common_class_label'>
            <div style={{ display: 'flex' }}>Priority
              <p className='red'>*</p>
            </div>
            <select {...register("priority", 
              // { required: { value: true, message: "priority is required" } }
            )} defaultValue=""
              >
              <option value="" disabled>Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {/* {errors.priority && <div className='red' style={{ fontSize: 'small' }}>{errors.priority.message}</div>} */}
          </label>
          <label className='common_class_label' htmlFor="" >
            <div style={{ display: 'flex' }}>Deadline
              <p className='red'>*</p>
            </div>
            <input placeholder='Enter date' type="date" {...register("date", 
              // { required: { value: true, message: "deadline is required" } }
              )} />
            {/* {errors.date && <div className='red' style={{ fontSize: 'small' }}>{errors.date.message}</div>} */}
          </label>
        </div>
        <div>
          <label className='common_class_label' htmlFor="">Comments
            <textarea placeholder='Add comments for your task' style={{ height: "60px" }} {...register("comments")} />
          </label>
        </div>
        <div>
          <button type='button' id="reset-btn" disabled={isSubmitting} onClick={() => { reset() }}>reset</button>
          <input type="submit" id="submit-btn" value={isSubmitting ? "Saving" : "Save"} disabled={isSubmitting} />
        </div>
        {isSubmitting && <div className="adding-task">Task is Saving...</div>}
      </form>
    </div>
  )
}

export default EditTask;
