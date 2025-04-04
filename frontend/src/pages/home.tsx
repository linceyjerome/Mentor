import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100 px-4 w-full h-full">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="space-y-8 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            Bienvenue sur <span className="text-indigo-900">MENTOR</span>
          </h1>

          <div className="flex flex-col gap-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-2xl shadow-md">
              <Link to="/student">Je suis étudiant 📖</Link>
            </Button>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 rounded-2xl shadow-md">
              <Link to="/find-student">Je suis mentor 🎓</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


