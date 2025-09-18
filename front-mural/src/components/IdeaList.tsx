import { useEffect, useState } from "react";
import api from "../services/api";

interface Idea {
  id: number;
  title: string;
  textarea: string;
}

export default function IdeaList({ refresh }: { refresh: boolean }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    api.get("/ideias").then((res) => setIdeas(res.data));
  }, [refresh]);

  return (
    <div className="grid gap-4">
      {ideas.map((idea) => (
        <div key={idea.id} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{idea.title}</h3>
          <p className="text-gray-700">{idea.textarea}</p>
        </div>
      ))}
    </div>
  );
}
