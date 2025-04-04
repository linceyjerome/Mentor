import { useState } from "react";
import axios from "axios";
import { Student } from "../types";  // Assure-toi de bien avoir un type Student
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function FindStudent() {
  const [searchTerm, setSearchTerm] = useState("");  // Termes de recherche pour nom, matière ou disponibilité
  const [students, setStudents] = useState<Student[]>([]);  // Liste des étudiants

  // Fonction de recherche
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/students?search=${searchTerm}`);
      setStudents(res.data);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1>Bienvenue dans la page Mentor</h1>
      <h2 className="text-3xl font-semibold text-center text-indigo-700">Trouver un étudiant</h2>

      {/* Champ de recherche */}
      <div className="flex gap-4">
        <Input
          placeholder="Nom, Matière ou Disponibilité"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border-2 border-indigo-500 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <Button 
          onClick={handleSearch}
          className="w-32 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md shadow-md"
        >
          Rechercher
        </Button>
      </div>

      {/* Affichage des résultats de la recherche */}
      <div className="space-y-4 mt-8">
        {students.length > 0 ? (
          students.map((student) => (
            <Card key={student.id} className="shadow-lg rounded-lg border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-indigo-700">{student.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{student.bio}</p>
                {/* Vérification de la présence des matières avant de les afficher */}
                <p className="text-sm text-indigo-600 mt-2">
                  📚 Matières : {student.subjects && student.subjects.length > 0 ? student.subjects.join(", ") : "Aucune matière spécifiée"}
                </p>
                <p className="text-sm text-indigo-600">⏰ Disponibilité : {student.availability}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Aucun étudiant trouvé avec ce critère.</p>
        )}
      </div>

      <Link to="/mentor" className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg">
        inscription Mentor ✍️
      </Link>

      {/* Retour à l'accueil */}
      <Link to="/" className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        Retour à l'accueil 🏠
      </Link>
    </div>
  );
}
