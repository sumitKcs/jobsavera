import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import JobDetail from "./component/JobDetail";
import Error from "./component/Error";
import Admin from "./component/Admin";
import ScrollToTop from "./utility/ScrollToTop";
import Stepper from "./component/Stepper";
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prepwo" element={<Admin />} />
        <Route path="/stepper" element={<Stepper />} />
        <Route path="/id/:id" element={<JobDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
