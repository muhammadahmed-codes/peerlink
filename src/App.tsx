import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Configure from "./pages/dashboard/Configure";
import Projects from "./pages/dashboard/Projects";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/configure" element={<Configure />} />
        <Route path="/dashboard/projects" element={<Projects/>} />
      </Routes>
    </>
  );
}
