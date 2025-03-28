import { useState } from "react";

type NewsFormProps = {
  onAdd: (item: { title: string; content: string }) => void;
};

export default function NewsForm({ onAdd }: NewsFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !content) return;
      onAdd({ title, content });
      setTitle("");
      setContent("");
    };
  
    return (
      <form className="mb-4 p-4 border rounded-lg shadow" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
             <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Добавить новость
      </button>

      </form>
    );
  }
  