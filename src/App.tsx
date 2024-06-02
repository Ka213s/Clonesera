import '../src/styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import AdminHome from './page/Admin/AdminHome';
import StudentProfile from './page/Student/StudentProfile';
import InstructorProfile from './page/Instructor/InstructorProfile';
import StudentHome from './page/Student/StudentHome';
import HomePage from './page/HomePage';
import Header from './components/Header/Header';


function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
        <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminhome" element={<AdminHome />} />
          {/* <Route path="/profile-student" element={<StudentProfile />} />
          <Route path="/profile-instructor" element={<InstructorProfile/>} />
          <Route path="/studenthome" element={<StudentHome/>} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
