import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import AdminHome from './page/Admin/AdminHome';
import StudentHome from './page/Student/StudentHome';
import InstructorHome from './page/Instructor/InstructorHome';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouters />
    </div>
  );
}

export default App;
