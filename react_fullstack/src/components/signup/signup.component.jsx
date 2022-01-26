import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signupStart} from "../../redux/user/user.action";
import withRouter from "../../utils/function.until";
import { selectError } from "../../redux/user/user.selector";

const Signup = ({router}) => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const {fullName , username, password, confirmPassword} = user;
  const error = useSelector(selectError);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signupStart(user, router));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="register">
      <div className="container">
        {
      error ? <h1 class='text-center text-danger'>{error.data.password}</h1> : null  
        }
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form action="create-profile.html" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="fullName"
                  onChange={handleChange}
                  value={fullName}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="username"
                  onChange={handleChange}
                  value={username}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword}
                  required
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signup);
