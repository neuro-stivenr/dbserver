const express = require('express');
const cors = require('cors');
const sql = require('mysql');

const app = express();

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
app.use(express.json())
app.use(cors())

function insert(payload) {
    let conn = sql.createConnection({
        host: process.env.SQLIP,
        user: process.env.SQLUSER,
        password: process.env.SQLPWD
    })
    let newdata = [
        payload.ss,
        payload.firstname,
        payload.lastname,
        payload.birthdate,
        payload.phone,
        payload.email
    ]
    let query = "INSERT INTO business.owners VALUES (NULL, ?)"
    conn.query(query, [newdata], (err,res) => {
        if (err) {throw err}
        console.log(res)
    })
}

app.post('/api/test', (req,res) => {
    console.log(req.body)
    insert(req.body)
});

app.listen(5000, err => console.log(err))