import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister.js";

const Components = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
};

export default Components;
