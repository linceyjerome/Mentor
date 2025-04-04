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

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/mentors?subject=${subject}`);
      setMentors(res.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1>Bienvenue dans la page Etudiant</h1>

      <h2 className="text-3xl font-semibold text-center text-indigo-700">Trouver un mentor</h2>
      
      <div className="flex gap-4">
        <Input
          placeholder="Ex: Math, Science, Français"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-md border-2 border-indigo-500 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <Button 
          onClick={handleSearch}
          className="w-32 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-md"
        >
          Rechercher
        </Button>
      </div>

      <div className="space-y-4 mt-8">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <Card key={mentor.id} className="shadow-lg rounded-lg border border-gray-200">
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
          <p className="text-center text-gray-500">Aucun mentor trouvé pour cette matière.</p>
        )}
      </div>
     

      <Link to="/student-register" className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg">
        inscription Étudiant ✍️
      </Link>

      <Link to="/" className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        Retour à l'accueil 🏠
      </Link>
    </div>
  );
}
