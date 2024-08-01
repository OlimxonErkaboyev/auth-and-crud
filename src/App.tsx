import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/auth/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
