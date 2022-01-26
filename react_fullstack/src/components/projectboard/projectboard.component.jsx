import React, { useState, useEffect } from "react";
import withRouter from "../../utils/function.until";
import { Link } from "react-router-dom";
import Task from "../task/task,component";
import { useSelector, useDispatch } from "react-redux";
import { getBacklogStart } from "../../redux/task/task.action";
import {
  selectProjectTasksDone,
  selectProjectTasksToDo,
  selectProjectTasksInProcess,
  selectError,
  selectProjectTasks,
} from "../../redux/task/task.selector";

const ProjectBoard = ({ router }) => {
  const { projectId } = router.params;
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const tasks = useSelector(selectProjectTasks);
  const taskstodo = useSelector(selectProjectTasksToDo);
  const tasksinprocess = useSelector(selectProjectTasksInProcess);
  const taskdone = useSelector(selectProjectTasksDone);

  useEffect(() => {
    dispatch(getBacklogStart(projectId));
  }, []);

  return (
    <div className="container">
      {error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error.data.projectNotFound}
        </div>
      ) : (
        <div className="container">
          <Link to={`/addtask/${projectId}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-secondary text-white">
                    <h3>TO DO</h3>
                  </div>
                </div>
                {taskstodo.map((task) => (
                  <Task key={task.id} task={task} backlog_id={projectId}/>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-primary text-white">
                    <h3>In Progress</h3>
                  </div>
                </div>
                {tasksinprocess.map((task) => (
                  <Task key={task.id} task={task} backlog_id={projectId}/>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-success text-white">
                    <h3>Done</h3>
                  </div>
                </div>
                {taskdone.map((task) => (
                  <Task key={task.id} task={task} backlog_id={projectId}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ProjectBoard);
