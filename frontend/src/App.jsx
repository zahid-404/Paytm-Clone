import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Landing from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </NextUIProvider>
    </>
  );
}

export default App;
