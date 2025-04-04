import { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !subject) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/students", {
        name,
        subject,
      });
      localStorage.setItem("isStudent", "true");

      console.log("Étudiant enregistré :", res.data);
      // Rediriger vers la recherche de mentor
      navigate("/find-mentor");
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Inscription Étudiant 🎓</h2>

      {error && <p className="text-red-500">{error}</p>}

      <Input
        placeholder="Votre nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Matière recherchée (ex: Math)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <Button onClick={handleSubmit} className="w-full">
        S’inscrire
      </Button>

      <Link to="/" className="block text-center text-blue-600 mt-4">
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
