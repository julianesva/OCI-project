import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </div>
    );
}