import '../src/styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import AdminHome from './page/Admin/AdminHome';
import StudentHome from './page/Student/StudentHome';
import InstructorHome from './page/Instructor/InstructorHome';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/profile-student" element={<StudentHome />} />
          <Route path="/profile-instructor" element={<InstructorHome />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
