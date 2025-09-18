import { useState } from "react";
import api from "../services/api";

interface Idea {
  id?: number;
  title: string;
  textarea: string;
}

interface Props {
  onIdeaCreated: () => void;
}

export default function IdeaForm({ onIdeaCreated }: Props) {
  const [form, setForm] = useState<Idea>({ title: "", textarea: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.textarea) return;
    await api.post("/ideias", form);
    setForm({ title: "", textarea: "" });
    onIdeaCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Compartilhe sua ideia 🚀</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título da ideia"
        className="w-full border p-2 rounded mb-2"
      />
      <textarea
        name="textarea"
        value={form.textarea}
        onChange={handleChange}
        placeholder="Descreva sua ideia"
        className="w-full border p-2 rounded mb-2"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}
