const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 5000
const cors = require('cors')


app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db_siswa'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack)
        return
    }
    console.log('Connected to MySQL')
})

app.get('/siswa', (req, res) => {
    connection.query('SELECT * FROM Siswa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

app.get('/siswa/:id', (req, res) => {
    connection.query(
        'SELECT * FROM Siswa WHERE kode = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ error: 'Not found' })
            res.json(results[0])
        }
    )
})

app.post('/siswa', (req, res) => {
    const { Kode_Siswa, Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa } = req.body
    connection.query(
        'INSERT INTO Siswa VALUES (?, ?, ?, ?, ?)',
        [Kode_Siswa, Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({ id: results.insertId, Kode_Siswa, Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa })
        }
    )
})



app.put('/siswa/:id', (req, res) => {
    const { Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa } = req.body
    connection.query(
        'UPDATE Siswa SET Nama_Siswa = ?, Alamat_Siswa = ?, Tgl_Siswa = ?, Jurusan_Siswa = ? WHERE kode = ?',
        [Nama_Siswa, Alamat_Siswa, Tgl_Siswa, Jurusan_Siswa, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Updated successfully' })
        }
    )
})

app.delete('/siswa/:id', (req, res) => {
    connection.query(
        'DELETE FROM Siswa WHERE kode = ?',
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Deleted successfully' })
        }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})