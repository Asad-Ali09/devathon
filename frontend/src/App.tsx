import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import TwoStep from "./Pages/TwoStep";
import AddDoctor from "./admin/addDoctor";
import { DoctorList } from "./Pages/DoctorsList";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/two-step" element={<TwoStep />}></Route>
          <Route path="/add/doctor" element={<AddDoctor />}></Route>
          <Route path="/doctors/list" element={<DoctorList />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
