import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [siswa, setSiswa] = useState([]);
  const [form, setForm] = useState({
    Nama_Siswa: "",
    Alamat_Siswa: "",
    Tgl_Siswa: "",
    Jurusan: ""
  });
  const [editing, setEditing] = useState(null);

  // Fetch data
  useEffect(() => {
    fetch("/api/siswa")
      .then(res => res.json())
      .then(setSiswa);
  }, []);

  // Handle input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create / Update
  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      fetch(`/api/siswa/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(updated => {
          setSiswa(siswa.map(s => (s.Kode_Siswa === updated.Kode_Siswa ? updated : s)));
          setEditing(null);
          setForm({ Nama_Siswa: "", Alamat_Siswa: "", Tgl_Siswa: "", Jurusan: "" });
        });
    } else {
      fetch("/api/siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(newSiswa => {
          setSiswa([...siswa, newSiswa]);
          setForm({ Nama_Siswa: "", Alamat_Siswa: "", Tgl_Siswa: "", Jurusan: "" });
        });
    }
  };

  // Delete
  const handleDelete = id => {
    fetch(`/api/siswa/${id}`, { method: "DELETE" })
      .then(() => setSiswa(siswa.filter(s => s.Kode_Siswa !== id)));
  };

  // Edit
  const handleEdit = s => {
    setForm({
      Nama_Siswa: s.Nama_Siswa,
      Alamat_Siswa: s.Alamat_Siswa,
      Tgl_Siswa: s.Tgl_Siswa?.split("T")[0] || "",
      Jurusan: s.Jurusan
    });
    setEditing(s.Kode_Siswa);
  };

  return (
    <div className="set">
      <h1>CRUD Data Siswa</h1>

      <form onSubmit={handleSubmit} className="set">
        <input
          name="Nama_Siswa"
          placeholder="Nama Siswa"
          value={form.Nama_Siswa} 
          onChange={handleChange}
        />
        <input
          name="Alamat_Siswa"
          placeholder="Alamat Siswa"
          value={form.Alamat_Siswa}
          onChange={handleChange}
        />
        <input
          type="date"
          name="Tgl_Siswa"
          value={form.Tgl_Siswa}
          onChange={handleChange}
        />
        <input
          name="Jurusan"
          placeholder="Jurusan"
          value={form.Jurusan}
          onChange={handleChange}
        />
        <button type="submit">
          {editing ? "Update" : "Tambah"}
        </button>
      </form>

      <div class="set"> 
      <ul>
        {siswa.map(s => (
          <li key={s.Kode_Siswa}>
            {s.Nama_Siswa} | {s.Alamat_Siswa} | {s.Tgl_Siswa?.split("T")[0]} | {s.Jurusan}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.Kode_Siswa)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;