import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import JobDetail from "./component/JobDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/id/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
