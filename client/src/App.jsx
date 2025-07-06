import Login from "./otherComponents/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RiderLogin from "./riderComponents/riderLoginPage";
import UserLogin from "./userComponents/userLoginPage";
import SignUp from "./otherComponents/SignUp";
import UserSignUp from "./userComponents/UserSignUp";
import RiderSignUp from "./riderComponents/RiderSignUp";
import UserHome from "./userComponents/UserHome";
import RideStatus from "./userComponents/RideStatus";
import RiderHome from "./riderComponents/RiderHome";
import RideHistory from "./userComponents/RideHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/riderLoginPage" element={<RiderLogin />} />
        <Route path="/userLoginPage" element={<UserLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userSignUp" element={<UserSignUp />} />
        <Route path="/RiderSignUp" element={<RiderSignUp />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/RiderHome" element={<RiderHome />} />
        <Route path="/RideStatus" element={<RideStatus />} />
        <Route path="/RideHistory" element={<RideHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
