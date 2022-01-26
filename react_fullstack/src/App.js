import logo from './logo.svg';
import './App.css';
import DashBoard from './components/dashboard/dashboard.component';
import Header from './components/header/header.component';
import {Routes, Route} from 'react-router-dom';
import AddProject from './components/Project/add-project.component';
import UpdateProject from './components/Project/update-project.component';
import ProjectBoard from './components/projectboard/projectboard.component';
import AddTask from './components/task/addtask.component';
import UpdateTask from './components/task/updatetask.component';
import Landing from './components/landing/landing.component';
import Signup from './components/signup/signup.component';
import Login from './components/login/login.component';
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/dashboard' element={<DashBoard/>}></Route>
        <Route exact path='/addProject' element={<AddProject/>}></Route>
        <Route exact path='/updateProject/:projectId' element={<UpdateProject/>}></Route>
        <Route exact path='/projectboard/:projectId/*' element={<ProjectBoard/>}></Route>
        <Route exact path='/addtask/:projectId' element={<AddTask/>}></Route>
        <Route exact path='/updatetask/:backlog_id/:tasksequence' element={<UpdateTask/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
