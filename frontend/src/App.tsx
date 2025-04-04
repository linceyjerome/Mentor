import { useState } from "react";

function App() {

  const [role, setRole] = useState<"student" | "mentor" | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">MENTOR</h1>
      {!role ? (
        <div className="space-x-4 mt-4">
          <button
            onClick={() => setRole("student")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Je suis étudiant
          </button>
          <button
            onClick={() => setRole("mentor")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Je suis mentor
          </button>
        </div>
      ) : (
        <p className="mt-4">Vous êtes un {role}.</p>
      )}
    </div>
  );
}

export default App;
