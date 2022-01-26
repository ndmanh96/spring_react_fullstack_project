import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../utils/function.until";
import { Link } from "react-router-dom";
import { addTaskStart, updateTaskStart } from "../../redux/task/task.action";
import { selectTaskUpdate } from "../../redux/task/task.selector";

const UpdateTask = ({ router }) => {
  const projectId = router.params.backlog_id;
  const { tasksequence } = router.params;

  const [task, setTask] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 3,
    dueDate: "",
  });
  const selectTask = useSelector(selectTaskUpdate(tasksequence));
  useEffect(() => {
    setTask(selectTask);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateTaskStart(projectId, task, router));
  };
  const { summary, acceptanceCriteria, status, priority, dueDate } = task;
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectboard/${projectId}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">Project Identifier: {projectId} ------------ Project Sequence: {selectTask.projectSequence}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="summary"
                  placeholder="Project Task summary"
                  onChange={handleChange}
                  value={summary}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  onChange={handleChange}
                  required
                  value={acceptanceCriteria}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  onChange={handleChange}
                  value={priority}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  onChange={handleChange}
                  value={status}
                >
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
};

export default withRouter(UpdateTask);
