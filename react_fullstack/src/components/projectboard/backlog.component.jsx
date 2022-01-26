import React, { useState, useEffect} from react;

const Backlog = () => {
    return (
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
                    {
                         taskstodo.map(task=> (
                            <Task key={task.id} task={task}/>
                          ))
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {
                         tasksinprocess.map(task=> (
                            <Task key={task.id} task={task}/>
                          ))
                    }
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {
                         taskdone.map(task=> (
                            <Task key={task.id} task={task}/>
                          ))
                    }
                </div>
            </div>
        </div>
        </div>
    );
}