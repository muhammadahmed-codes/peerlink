// import { Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Configure from "./pages/dashboard/Configure";
// import Projects from "./pages/dashboard/Projects";

// export default function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/dashboard/home" element={<Dashboard />} />
//         <Route path="/dashboard/configure" element={<Configure />} />
//         <Route path="/dashboard/projects" element={<Projects/>} />
//       </Routes>
//     </>
//   );
// }

import React, { useState } from "react";

const CodeRunner = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const response = await fetch("http://localhost:5001/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setOutput(data.output || data.error);
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={runCode}>Run</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeRunner;
