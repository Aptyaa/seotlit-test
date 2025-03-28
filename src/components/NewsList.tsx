import { useState } from "react";
import { NewsItem } from "../App";

type Props = {
  news: NewsItem[];
  onEdit: (id: number, updatedItem: NewsItem) => void;
  onDelete: (id: number) => void;
};

export default function NewsList({ news, onEdit, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const saveEdit = (id: number) => {
    onEdit(id, { id, title: editTitle, content: editContent });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {news.length === 0 && <p className="text-center text-gray-500">Нет новостей</p>}
      {news.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg shadow">
          {editingId === item.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <button onClick={() => saveEdit(item.id)} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Сохранить
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-gray-700">{item.content}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => startEditing(item)} className="text-blue-500">
                  ✏️ Редактировать
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-500">
                  🗑 Удалить
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
