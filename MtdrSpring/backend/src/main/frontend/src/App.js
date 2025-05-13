import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Displays from "./components/Displays/Displays";
import Dashboard from "./components/Dashboard/Dashboard";
import Report from "./components/Report/Report";

export default function App() {
    return (
      <div className="app">
        <Routes>
          <Route path="/*" element={<Auth />} />
          <Route path="/displays" element={<Displays />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </div>
    );
}