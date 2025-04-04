import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Mentor } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function MentorForm() {
  const [mentor, setMentor] = useState<Mentor>({
    name: "",
    bio: "",
    subjects: [],
    availability: "",
  });

  const [subjectsInput, setSubjectsInput] = useState("");
  const navigate = useNavigate();  // Utilisation de useNavigate pour la redirection

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...mentor,
        subjects: subjectsInput.split(",").map((s) => s.trim()),
      };

      await axios.post("http://localhost:3000/mentors", dataToSend);
      alert("Mentor enregistré avec succès !");
      
      // Redirection vers la page des étudiants après l'enregistrement
      navigate("/find-student");  // Redirige vers la page des étudiants
    } catch (error) {
      alert("Erreur lors de l'enregistrement.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 rounded-3xl shadow-xl">
      <Card className="shadow-2xl rounded-xl p-8 bg-white">
        <CardContent>
          <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-8">
            Inscription Mentor
          </h2>

          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute left-4 -top-3 text-lg font-medium text-gray-600 transition-all duration-200 ease-in-out"
              >
                Nom complet
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Nom complet"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="bio"
                className="absolute left-4 -top-3 text-lg font-medium text-gray-600 transition-all duration-200 ease-in-out"
              >
                Bio (parlez de vous)
              </label>
              <Input
                id="bio"
                name="bio"
                placeholder="Bio"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="subjects"
                className="absolute left-4 -top-3 text-lg font-medium text-gray-600 transition-all duration-200 ease-in-out"
              >
                Matières
              </label>
              <Input
                id="subjects"
                name="subjects"
                placeholder="Matières (ex: Math, Physique)"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300"
                onChange={(e) => setSubjectsInput(e.target.value)}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="availability"
                className="absolute left-4 -top-3 text-lg font-medium text-gray-600 transition-all duration-200 ease-in-out"
              >
                Disponibilité
              </label>
              <Input
                id="availability"
                name="availability"
                placeholder="Disponibilité (ex: Soirs, Week-ends)"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition duration-300"
                onChange={handleChange}
              />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-4 rounded-xl shadow-lg transition duration-300"
              onClick={handleSubmit}
            >
              Soumettre
            </Button>

            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-lg"
              >
                Retour à l'accueil 🏠
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
