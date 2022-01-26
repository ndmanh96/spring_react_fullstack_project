import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectItem from "../Project/project-item.component";
import CreateButton from "../Project/create-button";

import { getProjectStart } from "../../redux/project/project.action";
import {selectListProject} from "../../redux/project/project.selector";

const DashBoard = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectListProject);
  useEffect(() => {
    dispatch(getProjectStart());
  }, []);
  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateButton />
            <br />
            <hr />

            {
              projects.map(project=> (
                <ProjectItem key={project.id} project={project}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
