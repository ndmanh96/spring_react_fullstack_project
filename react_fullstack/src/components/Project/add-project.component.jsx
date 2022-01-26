import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {addProjectStart} from '../../redux/project/project.action';
import {selectError} from '../../redux/project/project.selector';

import withRouter from '../../utils/function.until';
const AddProject = ({router}) => {

  const [projectDetail, setProjectDetail] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const dispatch = useDispatch();
  const addErrorStatus = useSelector(selectError);


  const {projectName, projectIdentifier, description, start_date, end_date} = projectDetail;
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(addProjectStart(projectDetail, router));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectDetail({ ...projectDetail, [name]: value });
  };
  return (
    <div>
    {
      addErrorStatus ? <h1 class='text-center text-danger'>{addErrorStatus.data.projectIdentifier}</h1> : null  
    }
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={start_date}
                  onChange={handleChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={handleChange}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default withRouter(AddProject);
