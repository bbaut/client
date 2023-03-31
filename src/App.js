import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import {AuthProvider} from "./context/AuthProvider"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
              <Route index element ={<Login/>} />
              <Route path="register" element={<Register/>}/>
          </Route>
          <Route path="/dashboard" element={ <ProtectedRoute/>}>
            <Route index element={<Dashboard/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
