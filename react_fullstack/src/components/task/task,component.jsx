import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getBacklogStart} from '../../redux/task/task.action';
import {Link} from 'react-router-dom';
import {deleteTaskStart} from '../../redux/task/task.action';
import withRouter from '../../utils/function.until';

const Task = ({task, backlog_id, router}) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(deleteTaskStart(backlog_id, task, router));
    };
    return (
        <div className="card mb-1 bg-light">

        <div className="card-header text-primary">
            ID: {task.projectSequence} -- Priority: {task.priority}
        </div>
        <div className="card-body bg-light">
            <h5 className="card-title">{task.summary}</h5>
            <p className="card-text text-truncate ">
                {task.acceptanceCriteria}
            </p>
            <Link to={`/updatetask/${backlog_id}/${task.projectSequence}`} className="btn btn-primary">
                View / Update
            </Link>

            <button className="btn btn-danger ml-4" onClick={handleClick}>
                Delete
            </button>
        </div>
    </div>
    );
};

export default withRouter(Task);