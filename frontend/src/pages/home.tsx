import { Link } from "react-router-dom";

export default function Home() {
  const isStudent = localStorage.getItem("isStudent") === "true";
  const isMentor = localStorage.getItem("isMentor") === "true";
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold">Bienvenue sur MENTOR</h1>
      <Link to="/student" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Je suis étudiant 📖
      </Link>
      <Link to="/mentor" className="px-4 py-2 bg-green-500 text-white rounded-lg">
        Je suis mentor 🎓
      </Link>

      
      
    </div>
  );
}
