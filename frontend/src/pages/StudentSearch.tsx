import { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Mentor } from "../types"; 

export default function StudentSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Mentor[]>([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/mentors?subject=${searchTerm}`);
      setResults(res.data);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Recherche de Mentor</h2>
      <div className="space-y-4">
        <Input
          placeholder="Ex: math, physique, français"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} className="w-full mt-4">
          Rechercher
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {results.length > 0 ? (
          results.map((mentor) => (
            <div key={mentor.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.bio}</p>
              <p>📚 {mentor.subjects.join(", ")}</p>
              <p>⏰ {mentor.availability}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun mentor trouvé.</p>
        )}
      </div>
      <Link to="/student-register" className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg">
  Je veux m’inscrire comme étudiant ✍️
</Link>


      <Link to="/" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg inline-block">
        Retour à l'accueil 🏠
      </Link>
    </div>
  );
}
