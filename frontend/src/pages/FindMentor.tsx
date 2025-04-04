import { useState } from "react";
import axios from "axios";
import { Mentor } from "../types";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function FindMentor() {
  const [subject, setSubject] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [matches, setMatches] = useState<Mentor[]>([]);  // Pour gérer les mentors matchés

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/mentors?subject=${subject}`);
      setMentors(res.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const handleMatch = (mentor: Mentor) => {
    if (!matches.some((m) => m.id === mentor.id)) {
      setMatches((prevMatches) => [...prevMatches, mentor]);
      alert(`Vous avez été mis en relation avec ${mentor.name}`);
    } else {
      alert("Vous avez déjà été mis en relation avec ce mentor.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-8 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-700">Bienvenue dans la page Étudiant 💡</h1>

      <h2 className="text-3xl font-semibold text-center text-purple-700">Trouver un mentor</h2>
      
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Ex: Math, Science, Français"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-lg border-2 border-indigo-300 p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <Button 
          onClick={handleSearch}
          className="w-32 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-xl"
        >
          Rechercher
        </Button>
      </div>

      <div className="space-y-4 mt-8">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <Card key={mentor.id} className="shadow-lg rounded-xl border border-gray-300 hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-indigo-700">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{mentor.bio}</p>
                <p className="text-sm text-indigo-600 mt-2">
                  📚 Matières : {mentor.subjects.join(", ")}
                </p>
                <p className="text-sm text-indigo-600">⏰ Disponibilité : {mentor.availability}</p>

                <Button
                  onClick={() => handleMatch(mentor)}
                  className="mt-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
                >
                  Match
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun mentor trouvé pour cette matière.</p>
        )}
      </div>

      <h3 className="text-2xl font-semibold text-center text-indigo-700 mt-8">Mentors Matchés</h3>
      <div className="space-y-4 mt-4">
        {matches.length > 0 ? (
          matches.map((mentor, index) => (
            <Card key={index} className="shadow-lg rounded-xl border border-gray-300 hover:shadow-2xl transition-transform transform hover:scale-105">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-indigo-700">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{mentor.bio}</p>
                <p className="text-sm text-indigo-600 mt-2">
                  📚 Matières : {mentor.subjects.join(", ")}
                </p>
                <p className="text-sm text-indigo-600">⏰ Disponibilité : {mentor.availability}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun mentor matché.</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Link to="/student-register" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
          Inscription Étudiant ✍️
        </Link>

        <Link to="/" className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300">
          Retour à l'accueil 🏠
        </Link>
      </div>
    </div>
  );
}
