import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MentorForm from "../pages/MentorRegister";
import StudentForm from "../pages/StudentSearch";
import FindMentor from "../pages/FindMentor";
import StudentRegister from "../pages/StudentRegister";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<MentorForm />} />
        <Route path="/student" element={<StudentForm />} />
        <Route path="/find-mentor" element={<FindMentor />} />
        <Route path="/student-register" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
