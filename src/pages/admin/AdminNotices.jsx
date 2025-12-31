import { useState } from "react";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");

  const date = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md px-4 pt-6">

        <h1 className="text-lg font-semibold mb-4">
          Add Notice
        </h1>

        <input
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <textarea
          placeholder="Notice description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          onClick={() =>
            console.log("NOTICE:", title, desc, priority, date)
          }
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Publish Notice
        </button>

      </div>
    </div>
  );
}
