import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Mentor } from "@/types";
import { Link } from "react-router-dom";

export default function MentorForm() {
  const [mentor, setMentor] = useState<Mentor>({
    name: "",
    bio: "",
    subjects: [],
    availability: "",
  });

  const [subjectsInput, setSubjectsInput] = useState("");

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
    } catch (error) {
      alert("Erreur lors de l'enregistrement.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Inscription Mentor</h2>
      <Input name="name" placeholder="Nom" onChange={handleChange} />
      <Input name="bio" placeholder="Bio" onChange={handleChange} />
      <Input
        name="subjects"
        placeholder="Matières (ex: Math, Physique)"
        onChange={(e) => setSubjectsInput(e.target.value)}
      />
      <Input
        name="availability"
        placeholder="Disponibilité (ex: Soirs, Week-ends)"
        onChange={handleChange}
      />
      <Button className="w-full" onClick={handleSubmit}>
        Soumettre
      </Button>
      {/* Bouton Retour à l'Accueil */}
      <Link to="/" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">
        Retour à l'accueil 🏠
      </Link>
    </div>
  );
}
