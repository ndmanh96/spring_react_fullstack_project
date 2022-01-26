import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import withRouter from '../../utils/function.until';
import {Link} from 'react-router-dom';
import {addTaskStart} from '../../redux/task/task.action';

const AddTask = ({router}) => {
    const {projectId} = router.params;

    const [task, setTask] = useState({
        "summary": "",
        "acceptanceCriteria": "",
        "status": "",
        "priority": 3,
        "dueDate": "",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addTaskStart(projectId, task, router));
    };
    return (
        <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectboard/${projectId}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" name="summary" placeholder="Project Task summary" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria" onChange={handleChange} required></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" className="form-control form-control-lg" name="dueDate" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="priority" onChange={handleChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status" onChange={handleChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default withRouter(AddTask);