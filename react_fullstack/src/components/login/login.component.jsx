import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectError } from "../../redux/user/user.selector";
import { loginStart } from "../../redux/user/user.action";
import withRouter from "../../utils/function.until";
const Login = ({router}) => {
  const [user, setUser] = useState({
    username: "manh.nd7@samsung.com",
    password: "123456"
  });
  const dispatch = useDispatch();
  const { username, password } = user;
  const error = useSelector(selectError);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart(user, router));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form action="dashboard.html" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="username"
                  required
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={handleChange}
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

export default withRouter(Login);
