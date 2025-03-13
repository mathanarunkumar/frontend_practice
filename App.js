import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PracticeForm from "./components/practice-crud"; 
import PracticeGetForm from "./components/practice-get";
import PracticeUpdateForm from "./components/practice-update";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/practice" element={<PracticeForm />} />
         <Route path="/practiceget" element={<PracticeGetForm />} />
         <Route path="/practiceupdate" element={<PracticeUpdateForm />} />

      </Routes>
    </Router>
  );
}

export default App;
