import React, { useState } from "react";
import { trpc } from "../trpc";

const AddMatchForm: React.FC = () => {
  const utils = trpc.useUtils();
  const createMatch = trpc.matches.create.useMutation({
    onSuccess: () => {
      utils.matches.getAll.invalidate();
    },
  });

  const [form, setForm] = useState({
    teamAName: "",
    teamBName: "",
    runsA: 0,
    wicketsA: 0,
    oversA: 0,
    runsB: 0,
    wicketsB: 0,
    oversB: 0,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createMatch.mutate({
      ...form,
      runsA: Number(form.runsA),
      wicketsA: Number(form.wicketsA),
      oversA: Number(form.oversA),
      runsB: Number(form.runsB),
      wicketsB: Number(form.wicketsB),
      oversB: Number(form.oversB),
    });
  };

  return (
    <form className="p-4 bg-white rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Add New Match</h2>

      {Object.keys(form).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={(form as any)[field]}
          className="border p-2 mb-2 w-full"
          onChange={handleChange}
        />
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Add Match
      </button>
    </form>
  );
};

export default AddMatchForm;
