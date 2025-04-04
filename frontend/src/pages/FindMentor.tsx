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
      <h2 className="text-2xl font-bold text-center">Trouver un mentor</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Ex: Math, Science, Français"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button onClick={handleSearch}>Rechercher</Button>
      </div>

      <div className="space-y-4">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <Card key={mentor.id}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.bio}</p>
                <p className="mt-1 text-sm">
                  📚 Matières : {mentor.subjects.join(", ")}
                </p>
                <p className="text-sm">⏰ Disponibilité : {mentor.availability}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun mentor trouvé pour cette matière.</p>
        )}
      </div>
       {/* Affichage des mentors ici */}
       <Link to="/" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">
        Retour à l'accueil 🏠
      </Link>
    </div>
  );
}
