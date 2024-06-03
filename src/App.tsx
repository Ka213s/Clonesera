import "../src/styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import AdminHome from "./page/Admin/AdminHome";
import HomePage from "./page/HomePage";
import InstructorLayout from "./layouts/InstructorLayout";
import ListCourse from "./page/Instructor/ListCourse";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route
            path="/instructorhome"
            element={
              <InstructorLayout>
                <ListCourse />
              </InstructorLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
