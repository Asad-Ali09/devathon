import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import TwoStep from "./Pages/TwoStep";
import AddDoctor from "./admin/addDoctor";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>


          <Route path="/two-step" element={<TwoStep />}></Route>
          <Route path="/add/doctor" element={<AddDoctor />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
